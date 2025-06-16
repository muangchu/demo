❌ ตัวอย่างโค้ดที่ log PII โดยไม่ตั้งใจ (Bad Practice)

const express = require('express');
const app = express();

app.use(express.json());

app.post('/register', (req, res) => {
  const { name, email, phone, ssn } = req.body;

  // ❌ ไม่ควร log ข้อมูลที่เป็น PII เช่น email, phone, ssn
  console.log(`User registration: name=${name}, email=${email}, phone=${phone}, ssn=${ssn}`);

  // จำลองการบันทึกลง DB
  res.send('User registered successfully');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


❌ Bad Example: ใช้ winston logger แล้ว log ข้อมูล PII โดยตรง
const express = require('express');
const winston = require('winston');
const app = express();

app.use(express.json());

// ❌ Logger ที่ไม่มี filter หรือ masking
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console()
  ]
});

app.post('/signup', (req, res) => {
  const { fullName, email, phone, password } = req.body;

  // ❌ Bad: log ข้อมูลส่วนบุคคล (PII) และข้อมูลลับ
  logger.info(`New user signup: fullName=${fullName}, email=${email}, phone=${phone}, password=${password}`);

  res.send('Signup successful');
});

app.listen(3000, () => {
  logger.info('Server is running on port 3000');
});


❌ 1. Logging ทั้ง request body โดยไม่ filter
app.post('/payment', (req, res) => {
  // ❌ request body อาจมีข้อมูลบัตรเครดิต
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  res.send('Payment processed');
});


❌ 2. Logging header ที่มี Authorization หรือ Cookie
app.use((req, res, next) => {
  // ❌ Authorization header มักมี JWT, API key, Basic auth
  logger.debug(`Incoming headers: ${JSON.stringify(req.headers)}`);
  next();
});


❌ 3. Logging error object ที่มี sensitive data
try {
  // code that fails
  throw new Error('Database connection failed: password=123456');
} catch (err) {
  // ❌ log ทั้งข้อความที่มีรหัสผ่าน
  logger.error(err.message);
}


❌ 4. Logging database result ที่ยังไม่ sanitize
const user = await db.findUserByEmail(email);
// ❌ log ทั้ง user object ซึ่งอาจมี password hash หรือ token
logger.info(`User found: ${JSON.stringify(user)}`);


const express = require('express');
const router = express.Router();
const logger = require('winston');

router.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];

  // ❌ BAD PRACTICE: Log Authorization header ที่มี token จริง
  logger.info(`Auth header: ${authHeader}`);

  // สมมติว่า auth สำเร็จ
  res.json({ username: 'john.doe' });
});

module.exports = router;





❌ 5. Logging environment variables
// ❌ log config อาจรวมข้อมูลลับ เช่น database password, API key
logger.info(`App config: ${JSON.stringify(process.env)}`);



const express = require('express');
const router = express.Router();
const logger = require('winston');

// สมมติว่ามี DB mock
const fakeDB = {
  findUserByEmail: async (email) => {
    return {
      id: 1,
      fullName: 'Somchai Jaidee',
      email: email,
      passwordHash: '$2b$10$abc123...',
      ssn: '123-45-6789',
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      createdAt: new Date()
    };
  }
};

router.get('/profile', async (req, res) => {
  const email = req.query.email;

  const user = await fakeDB.findUserByEmail(email);

  // ❌ BAD PRACTICE: log ทั้ง object จาก DB โดยไม่ filter
  logger.info(`Fetched user: ${JSON.stringify(user)}`);

  res.json({ fullName: user.fullName, email: user.email });
});

module.exports = router;





const express = require('express');
const router = express.Router();
const logger = require('winston');

router.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];

  // ❌ BAD PRACTICE: Log Authorization header ที่มี token จริง
  logger.info(`Auth header: ${authHeader}`);

  // สมมติว่า auth สำเร็จ
  res.json({ username: 'john.doe' });
});

module.exports = router;



const express = require('express');
const router = express.Router();
const logger = require('winston');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // จำลอง error ที่เกิดขึ้นจากระบบ auth ภายนอก
    throw {
      message: 'Authentication failed',
      code: 'AUTH_ERROR',
      status: 401,
      debug: {
        username,
        password, // ❌ password หลุดมาพร้อม error
        ip: req.ip,
        headers: req.headers // ❌ บางทีมี Authorization, Cookie
      }
    };
  } catch (err) {
    // ❌ BAD PRACTICE: log error object ทั้งก้อนแบบ raw
    logger.error(`Login error: ${JSON.stringify(err)}`);

    res.status(401).send('Login failed');
  }
});




