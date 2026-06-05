import os

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from models import Product

load_dotenv()

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app = FastAPI(title="ShopEasy API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Schema is managed by Alembic migrations (run `alembic upgrade head`),
# not by create_all at startup. See alembic/ and README section 3.


@app.get("/")
def root():
    return {"message": "Welcome to the ShopEasy API"}


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "ShopEasy API"}


@app.get("/api/db-check")
def db_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"database": "connected"}


@app.get("/api/categories")
def list_categories(db: Session = Depends(get_db)):
    rows = db.query(Product.category).distinct().order_by(Product.category).all()
    return {"categories": [r[0] for r in rows]}


@app.get("/api/products")
def list_products(
    search: str | None = Query(None, description="Filter by product name"),
    category: str | None = Query(None, description="Filter by category"),
    db: Session = Depends(get_db),
):
    query = db.query(Product)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if category and category.lower() != "all":
        query = query.filter(Product.category == category)
    products = query.order_by(Product.id).all()
    return {"products": [p.to_dict() for p in products]}


@app.get("/api/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product.to_dict()
