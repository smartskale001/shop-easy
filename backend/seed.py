"""Seed the database with 10 sample products.

Run from the backend/ directory (with your venv active):

    python seed.py

Re-running clears the products table and re-inserts the sample data.
Images use https://picsum.photos with a stable per-product seed.
"""

from database import Base, SessionLocal, engine
from models import Product

SAMPLE_PRODUCTS = [
    {
        "name": "Wireless Headphones",
        "description": "Over-ear Bluetooth headphones with active noise cancellation and 30-hour battery life.",
        "price": 79.99,
        "category": "Electronics",
    },
    {
        "name": "Smart Watch",
        "description": "Fitness tracking smartwatch with heart-rate monitor, GPS, and a bright AMOLED display.",
        "price": 129.99,
        "category": "Electronics",
    },
    {
        "name": "Bluetooth Speaker",
        "description": "Portable waterproof speaker with deep bass and 12 hours of playback.",
        "price": 49.99,
        "category": "Electronics",
    },
    {
        "name": "Cotton T-Shirt",
        "description": "Soft 100% organic cotton crew-neck tee, available in classic fits.",
        "price": 19.99,
        "category": "Clothing",
    },
    {
        "name": "Denim Jacket",
        "description": "Timeless mid-wash denim jacket with a relaxed, durable cut.",
        "price": 59.99,
        "category": "Clothing",
    },
    {
        "name": "Running Shoes",
        "description": "Lightweight breathable running shoes with responsive cushioning.",
        "price": 89.99,
        "category": "Sports",
    },
    {
        "name": "Yoga Mat",
        "description": "Non-slip eco-friendly yoga mat with extra cushioning for joints.",
        "price": 24.99,
        "category": "Sports",
    },
    {
        "name": "Ceramic Coffee Mug",
        "description": "Handcrafted 12oz ceramic mug, microwave and dishwasher safe.",
        "price": 14.99,
        "category": "Home",
    },
    {
        "name": "Desk Lamp",
        "description": "Adjustable LED desk lamp with touch dimming and USB charging port.",
        "price": 34.99,
        "category": "Home",
    },
    {
        "name": "Hardcover Notebook",
        "description": "A5 dotted hardcover notebook with 240 thick, bleed-resistant pages.",
        "price": 12.99,
        "category": "Books",
    },
]


def seed():
    if engine is None or SessionLocal is None:
        raise RuntimeError("DATABASE_URL is not configured. Set it in backend/.env.")

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        db.query(Product).delete()
        for index, item in enumerate(SAMPLE_PRODUCTS, start=1):
            db.add(
                Product(
                    name=item["name"],
                    description=item["description"],
                    price=item["price"],
                    category=item["category"],
                    image_url=f"https://picsum.photos/seed/shopeasy{index}/600/400",
                )
            )
        db.commit()
        print(f"Seeded {len(SAMPLE_PRODUCTS)} products.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
