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

Apply migrations (creates the `products` table), then optionally seed:

```powershell
alembic upgrade head
python seed.py
```

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

## 3. Deploy the backend to Railway

The backend ships with [`backend/railway.json`](backend/railway.json), which tells
Railway how to build (Nixpacks) and start the app (`uvicorn ... --port $PORT`).

1. **New service** → "Deploy from GitHub repo" (or `railway up` via the CLI).
2. In the service **Settings → Root Directory**, set it to `backend` (the repo is a
   monorepo; this points Railway at the FastAPI app, not the React app).
3. In the service **Variables**, add:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` — references your Postgres service.
     Because the backend now runs *inside* Railway, this uses the private network
     (faster, no egress cost) — you no longer need the public `.proxy.rlwy.net` URL.
   - `FRONTEND_ORIGIN` = the URL where your frontend is hosted, e.g.
     `https://shopeasy.up.railway.app` (used for CORS). Update this once the
     frontend is deployed.
4. Deploy. Railway builds from `requirements.txt` and runs the start command.
   The healthcheck hits `/api/health`.
5. **Seed once** against the deployed DB: run `python seed.py` either from the
   Railway shell (`railway run python seed.py`) or locally with `DATABASE_URL`
   pointed at the public proxy URL.

> The start command runs `alembic upgrade head` to create/update tables before
> the app boots; seeding only inserts the sample products.

## Notes

- The app runs even without a database connection — the homepage never depends
  on the DB. `/api/db-check` verifies the Railway connection when you're ready.
- **Schema is managed by Alembic**, not `create_all`. The `products` table is
  created by running `alembic upgrade head`. On Railway this runs automatically
  before the app starts (see [`backend/railway.json`](backend/railway.json)).
- To change the schema later: edit the models, then
  `alembic revision --autogenerate -m "describe change"` and `alembic upgrade head`.
- `FRONTEND_ORIGIN` controls CORS. Locally it defaults to `http://localhost:5173`;
  in production set it to your deployed frontend URL.
```
