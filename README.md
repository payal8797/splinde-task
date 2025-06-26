# 📊 Splinde Task – Interactive Section Tree App

This project is a full-stack React + TypeScript application that displays and manages a nested financial section tree. Users can dynamically edit entries, view computed totals, and interact with the UI to restructure data.

---

## ✅ Must-Have Features

### 🛠 Backend (Express.js)

- Serves `demoData` via API endpoint:  
  `GET /api/data`

### 💻 Frontend (React + TypeScript + Ant Design)

- Fetches data from the backend and renders it in a collapsible tree format.
- Recursively computes `computedSum` for each section and total amount.
- Displays currency values formatted in **EUR** (`de-DE` locale).
- Allows user to:
  - Edit individual entry sums (`onBlur`)
  - Edit notes for entries
- Auto-updates computed sums on changes.

---

## ✨ Optional Features Implemented

- ✅ Stylish and clean UI using **Ant Design**
- ✅ Docker Compose setup for full local dev environment
- ✅ Expand/Collapse sections via Ant Design `Collapse`
- ✅ Add/Remove entries or nested sections dynamically

---

## 🚀 Quick Start

### 🐳 Run with Docker

```bash
docker-compose up --build
```

### Run Locally (Without Docker)

# Start backend

cd backend
npm install
npx tsx index.ts

# In another terminal, start frontend

cd frontend
npm install
npm run dev
