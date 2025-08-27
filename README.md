# 🛒 E-commerce API

## 📌 Overview

A simple **E-commerce REST API** built with **Node.js, Express, and MongoDB**.
The project includes CRUD operations for managing categories and can be extended to handle products, users, and orders.

---

## 🚀 Features

* 📂 **Category Management** (Create, Read, Update, Delete)
* 🔗 RESTful API structure
* 🛡️ Validation & error handling
* ⚡ Fast & lightweight with Express
* 🌱 MongoDB with Mongoose ODM
* 🔑 Unique slug generation for categories
* 🔄 Auto slug update on category name change

---

## 📂 Project Structure

```
ecommerce-api/
│── config/
│   └── db.js                # Database connection
│
│── models/
│   └── categoryModel.js     # Category schema & model
│
│── routes/
│   └── categoryRoute.js     # Routes for category APIs
│
│── services/
│   └── categoryService.js   # Business logic for categories
│
│── server.js                # App entry point
│── package.json
│── config.env               # Environment variables (PORT, MONGO_URI)
```

---

## ⚙️ Installation & Setup

1️⃣ Clone the repository:

```bash
git clone https://github.com/SamaNawar964/ecommerce-api.git
cd ecommerce-api
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Create a `.env` file:

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/ecommerce
```

4️⃣ Run the server:

```bash
npm run dev
```

*Server will run at:* `http://localhost:8000`

---

## 📡 API Endpoints

### 📂 Categories

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/api/v1/categories`     | Get all categories    |
| GET    | `/api/v1/categories/:id` | Get single category   |
| POST   | `/api/v1/categories`     | Create a new category |
| PUT    | `/api/v1/categories/:id` | Update a category     |
| DELETE | `/api/v1/categories/:id` | Delete a category     |

---

## 📸 Example Request

### ➕ Create Category

```http
POST /api/v1/categories
Content-Type: application/json

{
  "name": "Electronics",
  "image": "electronics.png"
}
```

✅ Response:

```json
{
  "status": "success",
  "data": {
    "id": "67c8a819f19fcd756d33ceb7",
    "name": "Electronics",
    "slug": "electronics",
    "image": "electronics.png"
  }
}
```

---

## 🛠️ Tech Stack

* **Node.js** + **Express.js**
* **MongoDB** + **Mongoose**
* **Slugify**
* **dotenv**
* **Nodemon**

---

## 👩‍💻 Author

**Sama Nawar**
🔗 [GitHub](https://github.com/SamaNawar964)
