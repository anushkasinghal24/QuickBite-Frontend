# 🍕 QuickBite Frontend — Angular 17

**Order Smarter. Eat Better. Delivered Faster.**

A full-featured, production-grade Angular 17 frontend for the QuickBite online food delivery platform, integrated with the Spring Boot microservices backend.

---

## ✨ Features

### 🎨 Design System
- **Dark / Light theme** — toggle persisted in localStorage
- **Custom design tokens** — CSS variables for every color, spacing, and shadow
- **Google Fonts** — `Syne` (display) + `DM Sans` (body) for premium typography
- **Animations** — fade, slide, scale, float, pulse-ring, skeleton loading
- **Fully responsive** — mobile-first, works on all screen sizes
- **Glass morphism** cards, gradient hero, floating badges

### 👥 Role-Based Dashboards
| Role | Features |
|------|----------|
| **Guest** | Browse restaurants & menus without login |
| **Customer** | Cart, orders, live tracking, wallet, reviews, notifications |
| **Restaurant Owner** | Dashboard, menu management, order queue, analytics |
| **Delivery Agent** | Assignment view, live location updates, earnings |
| **Admin** | User management, restaurant approvals, platform analytics |

### 🔌 Backend Integration
All services map to the Spring Boot API Gateway at `http://localhost:8080`:

| Service | Endpoint Prefix | Port |
|---------|----------------|------|
| Auth/User | `/api/v1/auth` | 8081 |
| Restaurant | `/api/v1/restaurants` | 8082 |
| Menu | `/api/v1/menu` | 8083 |
| Cart | `/api/v1/cart` | 8084 |
| Order | `/api/v1/orders` | 8085 |
| Payment/Wallet | `/api/v1/payments`, `/api/v1/wallet` | 8086 |
| Delivery Agent | `/api/v1/agents` | 8087 |
| Review/Rating | `/api/v1/reviews` | 8088 |
| Notification | `/api/v1/notifications` | 8089 |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x
- **Angular CLI** 17.x

### 1. Install Angular CLI
```bash
npm install -g @angular/cli@17
```

### 2. Install Dependencies
```bash
cd quickbite-frontend
npm install
```

### 2.1 Configure Local Environment
Copy [`.env.example`](./.env.example) to `.env` and update the values for your local backend if needed.

The frontend auto-generates `src/assets/env.js` from `.env` when you run `start`, `build`, or `test`, so your local config stays out of git.

### 3. Start Backend
Make sure your Spring Boot services are running:
```bash
# Start Eureka Server first
# Then start all microservices (auth, restaurant, menu, cart, order, payment, delivery, review, notification)
# Then start api-gateway on port 8080
```

### 4. Run the Frontend
```bash
# Development (with backend proxy)
npm start
# App runs at http://localhost:4200
# Runtime config is loaded from .env and written to src/assets/env.js automatically
```

### 5. Production Build
```bash
npm run build:prod
# Output in dist/quickbite-frontend/
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces (User, Restaurant, Order, etc.)
│   │   ├── services/
│   │   │   ├── auth.service.ts        # Login, register, JWT, OAuth
│   │   │   ├── api.services.ts        # All REST API services
│   │   │   └── ui.services.ts         # Theme, Toast, CartState
│   │   ├── guards/
│   │   │   └── auth.guard.ts          # Route guards (auth, admin, owner, agent, guest)
│   │   └── interceptors/
│   │       └── jwt.interceptor.ts     # Auto-attach JWT + refresh on 401
│   ├── shared/
│   │   └── components/
│   │       ├── navbar/                # Responsive navbar + dark mode toggle
│   │       ├── footer/                # Footer with links
│   │       └── toast/                 # Toast notification system
│   ├── features/
│   │   ├── auth/
│   │   │   ├── login/                 # Email/password + OAuth login
│   │   │   └── register/              # Role-based registration
│   │   ├── home/                      # Landing page with hero, cuisines, featured
│   │   ├── restaurants/
│   │   │   ├── restaurant-list/       # Browse + filter + search
│   │   │   └── restaurant-detail/     # Menu, reviews, info + cart sidebar
│   │   ├── cart/                      # Cart management + promo codes
│   │   ├── orders/
│   │   │   ├── checkout/              # Address + payment selection
│   │   │   ├── order-list/            # Order history
│   │   │   ├── order-detail/          # Full order details + timeline
│   │   │   └── order-tracking/        # Live order tracking with polling
│   │   ├── payment/
│   │   │   └── wallet/                # Wallet balance + top-up + statements
│   │   ├── notifications/             # Notification centre + mark read
│   │   ├── profile/                   # Edit profile + change password
│   │   ├── restaurant-owner/
│   │   │   ├── owner-dashboard/       # Stats, recent orders, open/close toggle
│   │   │   ├── menu-manager/          # Menu CRUD
│   │   │   ├── owner-orders/          # Order queue management
│   │   │   └── owner-analytics/       # Revenue + top items
│   │   ├── delivery/
│   │   │   └── agent-dashboard/       # Delivery assignment + location update
│   │   └── admin/
│   │       ├── admin-dashboard/       # Platform overview
│   │       ├── admin-users/           # User management
│   │       ├── admin-restaurants/     # Restaurant approvals
│   │       ├── admin-orders/          # All orders view
│   │       └── admin-analytics/       # Platform analytics
│   ├── app.component.ts               # Root component
│   ├── app.config.ts                  # App providers (router, http, animations)
│   └── app.routes.ts                  # Lazy-loaded route configuration
├── environments/
│   ├── environment.ts                 # Runtime-backed config with local fallbacks
│   ├── environment.prod.ts            # Runtime-backed config for production builds
│   └── runtime-config.ts              # Reads values from window.__QB_ENV__
├── styles.scss                        # Global design system (variables, utilities, components)
├── index.html
└── main.ts
```

---

## 🎨 Design Tokens

All design values are CSS variables in `styles.scss`:

```css
/* Colors */
--brand-primary:   #FF4B2B   /* QuickBite red-orange */
--brand-secondary: #FF416C   /* Deep rose */
--brand-accent:    #FFA726   /* Warm amber */

/* Dark mode is applied via [data-theme="dark"] on <html> */
```

---

## 🔐 Authentication Flow

1. User registers or logs in → JWT stored in `localStorage`
2. `JwtInterceptor` attaches `Authorization: Bearer <token>` to every request
3. On 401 → auto-refresh using refresh token
4. Route guards (`authGuard`, `adminGuard`, `ownerGuard`, `agentGuard`) protect routes
5. OAuth2 redirects: `/api/v1/auth/oauth2/google` and `/api/v1/auth/oauth2/github`

---

## 📡 WebSocket (Real-time Tracking)

The order tracking page polls every 15 seconds via HTTP. To enable full WebSocket:

```typescript
// In order-tracking.component.ts, replace polling with:
import { Client } from '@stomp/stompjs';
const client = new Client({ brokerURL: 'ws://localhost:8080/ws' });
client.subscribe(`/topic/order/${orderId}`, msg => { /* update UI */ });
```

---

## 🧪 Running with Mock Data

The frontend includes **full mock data** for every feature — restaurants, menus, orders, notifications, etc. You can develop and test the UI without a running backend.

When the backend is unavailable, all services automatically fall back to mock data.

---

## 🛠️ Key Dependencies

| Package | Purpose |
|---------|---------|
| `@angular/material` | UI components (CDK) |
| `@stomp/stompjs` | WebSocket for live tracking |
| `chart.js` + `ng2-charts` | Analytics charts |
| `leaflet` | Map for delivery tracking |
| `animate.css` | CSS animations |

---

## 🌐 Environment Configuration

Local runtime settings live in [`.env`](./.env) and are turned into `src/assets/env.js` before the app starts.

**Supported keys**
```bash
API_URL=http://localhost:8080/api/v1
WS_URL=http://localhost:8080/ws
AUTH_URL=http://localhost:8081
GOOGLE_OAUTH_URL=/oauth2/authorization/google
GITHUB_OAUTH_URL=/oauth2/authorization/github
```

`src/environments/environment.ts` and `src/environments/environment.prod.ts` read these runtime values first, then fall back to safe defaults.

The generated `src/assets/env.js` file is ignored by git, so local credentials and backend URLs stay out of commits.

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, bottom nav |
| Tablet | 640–1024px | 2-column grid |
| Desktop | > 1024px | Full multi-column |

---
