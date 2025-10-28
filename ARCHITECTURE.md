# 🗺️ E-Commerce System Architecture

## System Overview

```mermaid
graph TB
    subgraph "Frontend - Next.js App Router"
        A[Product Page] -->|Add to Cart| B[Cart API]
        A -->|Buy Now| C[Checkout Page]
        D[Navbar] -->|View Cart| E[Cart Page]
        E -->|Checkout| C
        C -->|Place Order| F[Orders API]
        G[Auth Modal] -.->|Sign In/Up| H[Clerk Auth]
    end
    
    subgraph "Backend - API Routes"
        B[Cart API<br/>GET/POST/PATCH/DELETE]
        F[Orders API<br/>GET/POST]
        I[Webhook API<br/>User Sync]
    end
    
    subgraph "Database - Neon PostgreSQL"
        J[(Users)]
        K[(Products)]
        L[(CartItems)]
        M[(Orders)]
        N[(OrderItems)]
    end
    
    subgraph "Authentication - Clerk"
        H[Clerk Auth Service]
        O[User Sessions]
    end
    
    B --> L
    B --> K
    F --> M
    F --> N
    F --> L
    I --> J
    H --> O
    H -.->|Webhook| I
    
    style A fill:#dab187
    style E fill:#dab187
    style C fill:#dab187
    style B fill:#c19d6f
    style F fill:#c19d6f
    style I fill:#c19d6f
```

## Data Flow

### Adding to Cart
```mermaid
sequenceDiagram
    participant U as User
    participant P as Product Page
    participant C as Clerk Auth
    participant A as Cart API
    participant D as Database
    
    U->>P: Click "Add to Wardrobe"
    P->>C: Check if signed in
    alt Not Signed In
        C-->>P: Unauthorized
        P->>U: Show Auth Modal
    else Signed In
        P->>A: POST /api/cart {productId, size, quantity}
        A->>C: Verify user token
        A->>D: Insert/Update CartItem
        D-->>A: Success
        A-->>P: Cart item added
        P->>U: Show success message
        P->>P: Update cart count
    end
```

### Checkout Process
```mermaid
sequenceDiagram
    participant U as User
    participant CP as Cart Page
    participant CKP as Checkout Page
    participant OA as Orders API
    participant D as Database
    
    U->>CP: Click "Indulge Now"
    CP->>CKP: Navigate to checkout
    CKP->>D: Fetch cart items
    D-->>CKP: Return items
    U->>CKP: Fill shipping form
    U->>CKP: Click "Place Order"
    CKP->>OA: POST /api/orders {shippingAddress}
    OA->>D: Create Order + OrderItems
    OA->>D: Clear CartItems
    D-->>OA: Success
    OA-->>CKP: Order created {orderNumber}
    CKP->>U: Show success message
    CKP->>CP: Redirect to home
```

## Database Schema

```mermaid
erDiagram
    User ||--o{ CartItem : has
    User ||--o{ Order : places
    User ||--o{ WishlistItem : saves
    User ||--o{ Address : has
    
    Product ||--o{ CartItem : contains
    Product ||--o{ OrderItem : in
    Product ||--o{ WishlistItem : in
    
    Order ||--|{ OrderItem : contains
    
    User {
        string id PK
        string clerkId UK
        string email UK
        string firstName
        string lastName
        string imageUrl
        datetime createdAt
        datetime updatedAt
    }
    
    Product {
        string id PK
        string name
        text description
        decimal price
        int priceValue
        float rating
        string category
        string range
        string image
        int stock
        datetime createdAt
        datetime updatedAt
    }
    
    CartItem {
        string id PK
        string userId FK
        string productId FK
        int quantity
        string size
        datetime createdAt
        datetime updatedAt
    }
    
    Order {
        string id PK
        string userId FK
        string orderNumber UK
        enum status
        decimal total
        text shippingAddress
        string paymentStatus
        datetime createdAt
        datetime updatedAt
    }
    
    OrderItem {
        string id PK
        string orderId FK
        string productId FK
        int quantity
        decimal price
        string size
    }
    
    WishlistItem {
        string id PK
        string userId FK
        string productId FK
        datetime createdAt
    }
    
    Address {
        string id PK
        string userId FK
        string fullName
        string street
        string city
        string state
        string postalCode
        string country
        string phone
        boolean isDefault
        datetime createdAt
        datetime updatedAt
    }
```

## Component Hierarchy

```mermaid
graph TD
    A[Layout + ClerkProvider] --> B[Navbar]
    A --> C[Page Content]
    A --> D[Footer]
    
    B --> B1[Cart Icon + Count]
    B --> B2[User Button / Join Us]
    
    C --> C1[Product Page]
    C --> C2[Cart Page]
    C --> C3[Checkout Page]
    
    C1 --> C1A[OvalImageFrame]
    C1 --> C1B[PriceTag]
    C1 --> C1C[Size Selector]
    C1 --> C1D[Action Buttons]
    C1 --> C1E[AuthModal]
    
    C2 --> C2A[Cart Items List]
    C2 --> C2B[Quantity Controls]
    C2 --> C2C[Order Summary]
    
    C3 --> C3A[Shipping Form]
    C3 --> C3B[Order Summary]
    
    style A fill:#322e2c,color:#fff
    style B fill:#dab187
    style C fill:#dab187
    style D fill:#322e2c,color:#fff
```

## Authentication Flow

```mermaid
graph LR
    A[User Action] --> B{Signed In?}
    B -->|No| C[Auth Modal]
    C --> D[Clerk Sign In/Up]
    D --> E[User Session Created]
    E --> F[Webhook Triggers]
    F --> G[User Synced to DB]
    G --> H[Action Proceeds]
    
    B -->|Yes| I[Check Auth Token]
    I --> J[Verify with Clerk]
    J --> H
    
    style C fill:#dab187
    style D fill:#c19d6f
    style G fill:#a0866f
```

## Cart State Management

```mermaid
stateDiagram-v2
    [*] --> Empty
    Empty --> HasItems : Add Product
    HasItems --> HasItems : Update Quantity
    HasItems --> HasItems : Remove Item
    HasItems --> Empty : Clear All
    HasItems --> Checkout : Proceed to Checkout
    Checkout --> OrderPlaced : Submit Order
    OrderPlaced --> Empty : Cart Cleared
    OrderPlaced --> [*]
    
    note right of HasItems
        Cart persisted in database
        Survives page refresh
        Synced across devices
    end note
    
    note right of OrderPlaced
        Order saved to database
        Cart items moved to order
        Cart automatically cleared
    end note
```

## API Request/Response Flow

```mermaid
graph TB
    subgraph "Client Side"
        A[User Action] --> B[fetch API call]
        B --> C{Response OK?}
        C -->|Yes| D[Update UI]
        C -->|No| E[Show Error]
    end
    
    subgraph "Server Side - Middleware"
        F[Request] --> G[Clerk Middleware]
        G --> H{Protected Route?}
        H -->|Yes| I{Valid Token?}
        H -->|No| J[Continue]
        I -->|Yes| J
        I -->|No| K[Return 401]
    end
    
    subgraph "Server Side - API Route"
        J --> L[API Handler]
        L --> M[Validate Input]
        M --> N[Prisma Query]
        N --> O[Database]
        O --> P[Response]
    end
    
    B --> F
    P --> C
    K --> C
    
    style G fill:#c19d6f
    style L fill:#dab187
    style O fill:#a0866f
```

## File Structure

```
my-app/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Product seeding script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── cart/
│   │   │   │   └── route.ts   # Cart CRUD
│   │   │   ├── orders/
│   │   │   │   └── route.ts   # Order management
│   │   │   └── webhooks/
│   │   │       └── clerk/
│   │   │           └── route.ts # User sync
│   │   ├── cart/
│   │   │   └── page.tsx       # Cart page
│   │   ├── checkout/
│   │   │   └── page.tsx       # Checkout page
│   │   ├── product/[id]/
│   │   │   └── page.tsx       # Product detail
│   │   └── layout.tsx         # Root layout
│   ├── _components/
│   │   ├── AuthModal.tsx      # Auth prompt
│   │   ├── Navbar.tsx         # Navigation + cart
│   │   └── ...
│   ├── data/
│   │   └── products.js        # Product data
│   ├── lib/
│   │   └── prisma.ts          # Prisma client
│   └── middleware.ts          # Auth middleware
├── .env.local                 # Environment variables
├── CART-SETUP-GUIDE.md        # Setup guide
└── README-CART-SUMMARY.md     # This summary
```

## Technology Stack

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js 15.5.6]
        B[React 19]
        C[TypeScript]
        D[Tailwind CSS]
        E[Framer Motion]
    end
    
    subgraph "Backend"
        F[Next.js API Routes]
        G[Clerk Auth]
        H[Prisma ORM]
    end
    
    subgraph "Database"
        I[Neon PostgreSQL]
    end
    
    subgraph "Deployment"
        J[Vercel Recommended]
    end
    
    A --> F
    F --> H
    H --> I
    G --> F
    
    style A fill:#dab187
    style G fill:#c19d6f
    style I fill:#a0866f
```

---

This architecture provides:
- 🔐 Secure authentication
- 💾 Persistent data storage
- 🛒 Real-time cart updates
- 📱 Responsive design
- ⚡ Fast performance
- 🎨 Beautiful UI
