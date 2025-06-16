const express = require('express');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ❌ Logging sensitive information (password) — อันตรายมาก!
  console.log(`Login attempt: username=${username}, password=${password}`);

  // จำลองการ login
  if (username === 'admin' && password === 'supersecret') {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
