export const initialOrders = [
  {
    "id": "AS-2026-10482",
    "date": "2026-08-26",
    "status": "Delivered",
    "statusStep": 4,
    "trackingNumber": "TRK-AUR-9842109X",
    "carrier": "Aura Express Priority",
    "items": [
      {
        "id": 1,
        "name": "Aura Studio Master ANC Headphones",
        "color": "Midnight Black",
        "price": 349,
        "quantity": 1,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
      },
      {
        "id": 6,
        "name": "Nomad Minimalist Full-Grain Leather Backpack",
        "color": "Charcoal Black",
        "price": 240,
        "quantity": 1,
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
      }
    ],
    "subtotal": 589,
    "discount": 0,
    "shipping": 0,
    "tax": 47.12,
    "total": 636.12,
    "shippingAddress": {
      "name": "Jane Anderson",
      "address": "742 Evergreen Terrace, Suite 400",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94107",
      "country": "United States"
    }
  },
  {
    "id": "AS-2026-09140",
    "date": "2026-08-14",
    "status": "Delivered",
    "statusStep": 4,
    "trackingNumber": "TRK-AUR-7731201A",
    "carrier": "Aura Express Priority",
    "items": [
      {
        "id": 2,
        "name": "Chronos Horizon Obsidian Titanium Watch",
        "color": "Obsidian Black",
        "price": 499,
        "quantity": 1,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
      }
    ],
    "subtotal": 499,
    "discount": 50,
    "shipping": 0,
    "tax": 35.92,
    "total": 484.92,
    "shippingAddress": {
      "name": "Jane Anderson",
      "address": "742 Evergreen Terrace, Suite 400",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94107",
      "country": "United States"
    }
  }
];

export const mockOrders = initialOrders;
