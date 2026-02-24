# JSON Placeholder API Automation 🧪

Automated API testing project using **Playwright** and **TypeScript**.

This project demonstrates REST API automation against the public JSON Placeholder service and showcases real-world QA automation practices including request validation, response verification, and CRUD operation testing.

---

## 👩‍💻 Author

**Karine Gasesyan**  
QA Automation Engineer | Playwright | API Testing | 10+ Years Frontend Development  
GitHub: https://github.com/karinegasesyan  

---

## 📌 Project Overview

The purpose of this project is to automate API testing for:

https://jsonplaceholder.typicode.com

The test suite validates:

- ✔ HTTP status codes
- ✔ Response body structure
- ✔ Data consistency
- ✔ CRUD operations (Create, Read, Update, Delete)
- ✔ API behavior validation

The project is built using **Playwright API testing capabilities**, written in **TypeScript** for scalability and maintainability.

---

## 🛠 Tech Stack

- Playwright
- TypeScript
- Node.js
- REST API Testing
- npm

---

## 📂 Project Structure

```
json-placeholder/
│
├── tests/
│   ├── posts.spec.ts
│   ├── users.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🔧 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/karinegasesyan/json-placeholder.git
```

### 2️⃣ Navigate to project folder

```bash
cd json-placeholder
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Install Playwright browsers (if needed)

```bash
npx playwright install
```

---

## 🚀 Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### Run with detailed reporter

```bash
npx playwright test --reporter=list
```

---

## 🧪 Test Coverage

### ✅ GET Requests
- Retrieve all posts
- Retrieve single post by ID
- Validate response structure
- Validate expected fields

### ✅ POST Requests
- Create new post
- Validate response payload
- Verify returned ID

### ✅ PUT / PATCH Requests
- Update existing resource
- Validate modified fields

### ✅ DELETE Requests
- Delete resource
- Verify successful status code

---

## 🔍 Example Validation

Tests include assertions such as:

- `expect(response.status()).toBe(200)`
- Validation of JSON properties
- Matching request and response values
- Verifying correct content type

---

## 📈 Key Skills Demonstrated

- API automation with Playwright
- REST endpoint validation
- TypeScript-based test structure
- Clean test organization
- Maintainable automation code
- Real-world QA automation practices

---

## 🎯 Why This Project Matters

This project reflects real QA Automation Engineer responsibilities:

- Designing API test coverage
- Validating backend services
- Automating repetitive test scenarios
- Ensuring API reliability
- Writing scalable and readable automation code

---

## 🌍 Professional Goal

This project is part of my continuous development as a QA Automation Engineer, focusing on:

- Advanced Playwright patterns
- Backend automation
- Test architecture
- CI/CD integration

---

## 📫 Contact

Karine Gasesyan  
GitHub: https://github.com/karinegasesyan  
LinkedIn: (Add your LinkedIn URL here)

---

⭐ If you find this project useful, feel free to explore and connect!
