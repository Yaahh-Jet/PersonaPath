# PersonaPath backend

This small Express + MongoDB backend provides basic authentication and a demo "reading" endpoint that stores simple reading results for users.

How to run

1. Copy `.env.example` to `.env` and fill in `MONGO_URI` and `JWT_SECRET`.
2. From this `backend/` folder run:

   npm install
   npm run dev   # or npm start

If you don't set `MONGO_URI`, the server will start but DB operations will fail. This is intentional for quick local testing without a DB.

Available endpoints (JSON)

- POST /api/auth/signup { username, email?, password }
- POST /api/auth/login { username, password }
- GET /api/auth/me  (requires Authorization header)
- POST /api/reading/submit { answers: [] } (optional Authorization; saves to user if authenticated)
- GET /api/reading/:id (requires authentication to fetch saved reading)
