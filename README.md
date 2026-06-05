# ShopEasy

Full-stack e-commerce starter.

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL (hosted on Railway)

```
Ecommerce-app/
├── backend/     # FastAPI app
└── frontend/    # React + Vite app
```

## 1. Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Set your Railway connection string in `backend/.env`:

```
DATABASE_URL=postgresql://postgres:PASSWORD@HOST.proxy.rlwy.net:PORT/railway
```

> Grab this from Railway → your Postgres service → **Connect** tab. For local
> development use the **public** proxy URL (the one ending in `.proxy.rlwy.net`).

Run the API:

```powershell
uvicorn main:app --reload --port 8000
```

- API root: http://localhost:8000
- Health: http://localhost:8000/api/health
- DB check: http://localhost:8000/api/db-check
- Interactive docs: http://localhost:8000/docs

## 2. Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — you'll see the ShopEasy homepage with the navbar,
hero section, and footer.

The backend URL is read from `frontend/.env` (`VITE_API_URL`).

## Notes

- The app runs even without a database connection — the homepage never depends
  on the DB. `/api/db-check` verifies the Railway connection when you're ready.
- Tables (`products`) are auto-created on backend startup if `DATABASE_URL` is set.
```
