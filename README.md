# MERN Amazon-like Frontend (with Zustand)

This package contains:
- frontend/ : Vite + React + TypeScript + Tailwind frontend using Zustand for state (cart + auth)
- backend/ : (optional) Express backend scaffold if present (from earlier scaffold)

How to run:

1. Backend (if you want full API):
   - cd backend
   - copy .env.example to .env and set MONGO_URI and JWT_SECRET
   - npm install
   - npm run seed   # optional
   - npm run dev

2. Frontend:
   - cd frontend
   - npm install
   - npm run dev

Notes:
- The frontend expects the backend API at the same origin (relative `/api/*`). If frontend dev server is on a different port,
  either configure a Vite proxy in `vite.config` or change axios base URLs to `http://localhost:5000/api/...`.
- Zustand stores are in src/stores (cartStore.ts, authStore.ts)
- Auth pages call /api/auth endpoints; Products pages call /api/products.
