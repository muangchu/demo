

## Create Richmenu

### Step
- Validate request for create Richmenu
- Create Richmenu
- Upload Richmenu image
- Set default Richmenu
- Test


### 1.Validate request for create
**Request:**
```http
POST https://api.line.me/v2/bot/richmenu/validate
```
**Body:**
```json
{
    "name": "Richmenu_20250305",
    "size": {
        "width": 2500,
        "height": 1686
    },
    "chatBarText": "เมนู",
    "selected": true,
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": 828,
                "height": 831
            },
            "action": {
                "type": "message",
                "text": "สนใจลงทุน"
            }
        },
        {
            "bounds": {
                "x": 828,
                "y": 0,
                "width": 832,
                "height": 836
            },
            "action": {
                "type": "message",
                "text": "ประกัน"
            }
        },
        {
            "bounds": {
                "x": 1664,
                "y": 0,
                "width": 836,
                "height": 836
            },
            "action": {
                "type": "message",
                "text": "รถผ่อนอยู่ ก็ขอกู้ได้"
            }
        },
        {
            "bounds": {
                "x": 42,
                "y": 878,
                "width": 545,
                "height": 782
            },
            "action": {
                "type": "message",
                "text": "ข้อมูลบัญชีสินเชื่อรถยนต์"
            }
        },
        {
            "bounds": {
                "x": 671,
                "y": 874,
                "width": 558,
                "height": 790
            },
            "action": {
                "type": "message",
                "text": "ผลิตภัณฑ์ทั้งหมด"
            }
        },
        {
            "bounds": {
                "x": 1275,
                "y": 887,
                "width": 562,
                "height": 764
            },
            "action": {
                "type": "message",
                "text": "สิทธิพิเศษและโปรโมชั่น"
            }
        },
        {
            "bounds": {
                "x": 1921,
                "y": 887,
                "width": 541,
                "height": 752
            },
            "action": {
                "type": "message",
                "text": "บริการอื่นๆ"
            }
        }
    ]
}
```

### 2.Create richmenu
**Request:**
```http
POST https://api.line.me/v2/bot/richmenu
```
**Body:**
```json
ใช้ request จาก 1.Validate request for create
```

### 3.Upload richmenu image
**Request:**
```http
POST https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content
```
**Body:**
```
Upload file รูป
```

### 4.Set default richmenu
**Request:**
```http
POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId}
```

## อื่นๆ
### ดึงรูปเก่า
**Request:**
```http
GET https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content
```
