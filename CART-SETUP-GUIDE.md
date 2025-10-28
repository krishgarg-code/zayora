# 🛒 E-Commerce Cart & Checkout Setup Guide

This guide explains the complete cart and checkout system implementation for your Zayora e-commerce website.

## 📋 Features Implemented

### ✅ Completed Features

1. **Authentication Required Modal** - Prompts users to sign in for protected actions
2. **Cart Icon in Navbar** - Shows item count, visible only when signed in
3. **Add to Wardrobe** - Save products to cart with size selection
4. **Cart Page** - View, update quantities, remove items
5. **Checkout Page** - Complete order with shipping information
6. **Database Integration** - All data persisted to Neon PostgreSQL
7. **API Routes** - RESTful endpoints for cart and order management

---

## 🗄️ Database Schema

The following tables are created in your Neon database:

- **User** - Synced with Clerk authentication
- **Product** - Product catalog (to be populated)
- **CartItem** - User shopping cart items
- **Order** - Customer orders
- **OrderItem** - Individual items in orders
- **WishlistItem** - Saved items for later
- **Address** - Saved shipping addresses

---

## 🔑 Environment Variables Setup

Your `.env.local` file needs these variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Webhook (Optional - for user sync)
WEBHOOK_SECRET=whsec_...

# Neon Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

### How to Get Webhook Secret (Optional but Recommended)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Webhooks** section
3. Click **Add Endpoint**
4. Set URL to: `https://your-domain.com/api/webhooks/clerk`
5. Select events: `user.created`, `user.updated`, `user.deleted`
6. Copy the **Signing Secret** and add as `WEBHOOK_SECRET` in `.env.local`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── cart/
│   │   │   └── route.ts          # Cart CRUD operations
│   │   ├── orders/
│   │   │   └── route.ts          # Order creation
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts      # Clerk user sync
│   ├── cart/
│   │   └── page.tsx              # Shopping cart page
│   ├── checkout/
│   │   └── page.tsx              # Checkout & order page
│   └── product/[id]/
│       └── page.tsx              # Product detail (updated)
├── _components/
│   ├── AuthModal.tsx             # Sign-in prompt modal
│   └── Navbar.tsx                # Updated with cart icon
├── data/
│   └── products.js               # Product data
└── lib/
    └── prisma.ts                 # Prisma client
```

---

## 🔄 User Flow

### For Non-Authenticated Users:

1. Browse products freely
2. Click "Add to Wardrobe" → **Auth Modal appears**
3. Click "Indulge Now" → **Auth Modal appears**
4. Click "Virtual Try On" → **Auth Modal appears**
5. Sign up/Sign in to continue

### For Authenticated Users:

1. Browse products
2. Select size and click **"Add to Wardrobe"** → Item saved to cart
3. See cart icon with item count in navbar
4. Click cart icon to view **Cart Page**
5. Update quantities or remove items
6. Click **"Indulge Now"** → Redirected to checkout
7. Fill shipping information
8. Click **"Place Order"** → Order created in database
9. Cart cleared automatically
10. Success message with order number

---

## 🔌 API Endpoints

### Cart Management

**GET /api/cart**
- Fetch user's cart items
- Returns: `{ cartItems: [...] }`

**POST /api/cart**
- Add item to cart
- Body: `{ productId, quantity, size }`
- Returns: `{ cartItem: {...} }`

**PATCH /api/cart**
- Update item quantity
- Body: `{ cartItemId, quantity }`
- Returns: `{ cartItem: {...} }`

**DELETE /api/cart?cartItemId=xxx**
- Remove item from cart
- Returns: `{ message: 'Item removed' }`

### Order Management

**POST /api/orders**
- Create order from cart
- Body: `{ shippingAddress }`
- Returns: `{ order: {...} }`
- Note: Clears cart after order creation

**GET /api/orders**
- Fetch user's order history
- Returns: `{ orders: [...] }`

---

## 🎨 UI Components

### AuthModal (`src/_components/AuthModal.tsx`)

Modal that prompts users to sign in or sign up.

**Props:**
- `isOpen: boolean` - Show/hide modal
- `onClose: () => void` - Close handler
- `message?: string` - Custom message

**Usage:**
```tsx
const [showAuthModal, setShowAuthModal] = useState(false);

<AuthModal
  isOpen={showAuthModal}
  onClose={() => setShowAuthModal(false)}
  message="Please sign in to add items to your cart"
/>
```

### Cart Icon (Navbar)

- Shows shopping bag icon
- Badge with item count
- Only visible when user is signed in
- Automatically updates when cart changes

---

## 🛠️ Product Page Updates

The product detail page (`/product/[id]`) now includes:

1. **Size Selection** - Buttons to select S, M, L, XL, XXL
2. **Authentication Checks** - All buttons check if user is signed in
3. **Add to Wardrobe** - Functional button that saves to database
4. **Indulge Now** - Adds to cart and redirects to checkout
5. **Virtual Try On** - Shows auth modal (feature coming soon)

---

## 📊 Database Population

### Option 1: Seed Products Manually

You need to populate the Product table with your existing products. Create a seed script:

```typescript
// scripts/seed-products.ts
import { PrismaClient } from '@prisma/client';
import { products } from '../src/data/products';

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: {
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.priceValue,
        priceValue: product.priceValue,
        rating: product.rating,
        category: product.category,
        range: product.range,
        image: product.image,
        stock: 100, // Set initial stock
      },
    });
  }
  console.log('Products seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run with: `npx tsx scripts/seed-products.ts`

### Option 2: Import via API

Create an admin endpoint to bulk import products.

---

## 🧪 Testing the System

### Step 1: Sign Up
1. Click "Join Us" in navbar
2. Create account with Clerk

### Step 2: Add to Cart
1. Go to any product page
2. Select a size
3. Click "Add to Wardrobe"
4. Check navbar - cart icon should show "1"

### Step 3: View Cart
1. Click cart icon
2. Verify product appears
3. Try updating quantity
4. Try removing item

### Step 4: Checkout
1. Add items to cart
2. Click "Indulge Now"
3. Fill shipping form
4. Click "Place Order"
5. Verify success message with order number

### Step 5: Verify Database
1. Open Neon Dashboard
2. Check `CartItem` table (should be empty after checkout)
3. Check `Order` and `OrderItem` tables (should have new order)

---

## 🐛 Troubleshooting

### Cart Count Not Updating
- The navbar fetches cart count on mount and route changes
- After adding items, the page dispatches `cartUpdated` event
- If count doesn't update, refresh the page

### "Unauthorized" Error
- Ensure you're signed in
- Check Clerk keys in `.env.local`
- Verify middleware is not blocking API routes

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check Neon database is running
- Ensure IP is whitelisted in Neon settings

### Products Not Found
- Products need to be added to database
- Run seed script to populate Product table
- Or create products via admin interface

---

## 🚀 Next Steps

### Recommended Enhancements

1. **Payment Integration**
   - Add Stripe/Razorpay for actual payments
   - Update order status after payment

2. **Order Tracking**
   - Create `/orders` page to view order history
   - Add order status updates (Processing, Shipped, Delivered)

3. **Product Management**
   - Create admin dashboard
   - Add/edit/delete products via UI

4. **Wishlist Feature**
   - Implement "Save for Later" functionality
   - Use existing `WishlistItem` table

5. **Email Notifications**
   - Send order confirmation emails
   - Shipping updates via email

6. **Product Search**
   - Implement search functionality
   - Filter by category, price, size

---

## 📝 Important Notes

1. **User Sync**: The webhook endpoint syncs Clerk users to your database. Set this up for production!

2. **Stock Management**: Currently, stock is not checked. Add validation before allowing purchases.

3. **Product IDs**: Products use string IDs from your existing data. Ensure consistency.

4. **Size Validation**: Sizes are stored as strings. Consider enum for type safety.

5. **Cart Persistence**: Cart items persist across sessions until checkout or manual deletion.

---

## 🎉 Summary

You now have a fully functional e-commerce cart and checkout system with:

✅ User authentication via Clerk
✅ Database persistence with Prisma + Neon
✅ RESTful API for cart operations
✅ Beautiful UI matching your design
✅ Complete checkout flow
✅ Order management

**Ready to test!** Sign in, add items, and place your first order! 🛍️
