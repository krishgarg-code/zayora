# E-Commerce Authentication & Database Setup Guide

## 🚀 Complete Setup Instructions

### Prerequisites
1. Node.js installed (v18 or higher)
2. A Clerk account (https://clerk.com - free tier available)
3. A Neon account (https://neon.tech - free tier available)

---

## Step 1: Install Required Packages

Run this command in your terminal:

```bash
npm install @clerk/nextjs @prisma/client
npm install -D prisma
```

---

## Step 2: Setup Clerk Authentication

### 2.1 Create Clerk Application
1. Go to https://dashboard.clerk.com
2. Click "Add application"
3. Name it "Zayora E-commerce" (or your preferred name)
4. Choose authentication methods (Email, Google, etc.)
5. Click "Create application"

### 2.2 Get Clerk API Keys
1. In your Clerk dashboard, go to "API Keys"
2. Copy the **Publishable key** and **Secret key**
3. Update `.env.local` file with your keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

---

## Step 3: Setup Neon Database

### 3.1 Create Neon Project
1. Go to https://console.neon.tech
2. Click "Create a project"
3. Name it "zayora-db"
4. Select region closest to you
5. Click "Create project"

### 3.2 Get Database Connection String
1. In your Neon dashboard, click on your project
2. Click "Connection Details"
3. Copy the **Connection string** (it looks like: postgresql://...)
4. You'll see two options:
   - **Pooled connection** - Use this for DATABASE_URL
   - **Direct connection** - Use this for DIRECT_URL

### 3.3 Update Environment Variables
Update `.env.local`:

```env
# Pooled connection (for app queries)
DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# Direct connection (for migrations)
DIRECT_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

---

## Step 4: Initialize Prisma

Run these commands:

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

---

## Step 5: Update Next.js Layout

The layout file needs to wrap your app with ClerkProvider.

I'll update this automatically - just confirm you want me to proceed.

---

## Step 6: Create Sign-In/Sign-Up Pages

I'll create these pages for you:
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page
- `/profile` - User profile page

---

## Step 7: Setup Clerk Webhook (User Sync)

This syncs Clerk users to your Neon database.

I'll create:
- API route for webhook
- User sync functionality

---

## Features Included:

✅ **Authentication**
- Email/password sign up
- Social login (Google, etc.)
- User sessions
- Protected routes

✅ **Database Models**
- User profiles
- Products
- Shopping cart
- Wishlist
- Orders
- Addresses

✅ **Type Safety**
- Prisma generates TypeScript types
- Autocomplete for database queries
- Compile-time error checking

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create a migration
npx prisma migrate dev --name init

# Open database viewer
npx prisma studio

# Run development server
npm run dev
```

---

## Next Steps

1. **Install packages** (run the npm install command above)
2. **Get your Clerk keys** (from dashboard.clerk.com)
3. **Get your Neon database URL** (from console.neon.tech)
4. **Update .env.local** with your keys
5. **Run prisma commands** to set up database

Let me know when you're ready and I'll:
- Update the Next.js layout with ClerkProvider
- Create sign-in/sign-up pages
- Set up the webhook for user synchronization
- Create helper functions for database operations

---

## Need Help?

If you encounter any issues:
1. Check that all environment variables are set correctly
2. Ensure database connection strings are valid
3. Make sure you ran `npx prisma generate`
4. Restart your dev server after changing .env.local

Ready to continue? Let me know! 🚀
