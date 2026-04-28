import { Routes } from '@angular/router';
import { authGuard, adminGuard, ownerGuard, agentGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public / Auth
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'auth/oauth2/callback',
    loadComponent: () => import('./features/auth/oauth2-callback/oauth2-callback.component').then(m => m.OAuth2CallbackComponent)
  },

  // Home
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },

  // Restaurants
  {
    path: 'restaurants',
    loadComponent: () => import('./features/restaurants/restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent)
  },
  {
    path: 'restaurants/:id',
    loadComponent: () => import('./features/restaurants/restaurant-detail/restaurant-detail.component').then(m => m.RestaurantDetailComponent)
  },

  // Cart & Orders (Customer)
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/orders/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./features/orders/order-detail/order-detail.component').then(m => m.OrderDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'orders/:id/track',
    loadComponent: () => import('./features/orders/order-tracking/order-tracking.component').then(m => m.OrderTrackingComponent),
    canActivate: [authGuard]
  },

  // Payment
  {
    path: 'wallet',
    loadComponent: () => import('./features/payment/wallet/wallet.component').then(m => m.WalletComponent),
    canActivate: [authGuard]
  },

  // Notifications
  {
    path: 'notifications',
    loadComponent: () => import('./features/notifications/notifications.component').then(m => m.NotificationsComponent),
    canActivate: [authGuard]
  },

  // Profile
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },

  // Restaurant Owner Dashboard
  {
    path: 'owner',
    canActivate: [ownerGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/restaurant-owner/owner-dashboard/owner-dashboard.component').then(m => m.OwnerDashboardComponent)
      },
      {
        path: 'menu',
        loadComponent: () => import('./features/restaurant-owner/menu-manager/menu-manager.component').then(m => m.MenuManagerComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/restaurant-owner/owner-orders/owner-orders.component').then(m => m.OwnerOrdersComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/restaurant-owner/owner-analytics/owner-analytics.component').then(m => m.OwnerAnalyticsComponent)
      }
    ]
  },

  // Delivery Agent Dashboard
  {
    path: 'agent',
    canActivate: [agentGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/delivery/agent-dashboard/agent-dashboard.component').then(m => m.AgentDashboardComponent)
      }
    ]
  },

  // Admin Panel
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'restaurants',
        loadComponent: () => import('./features/admin/admin-restaurants/admin-restaurants.component').then(m => m.AdminRestaurantsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/admin/admin-analytics/admin-analytics.component').then(m => m.AdminAnalyticsComponent)
      }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '/home' }
];
