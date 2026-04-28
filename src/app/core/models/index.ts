// ═══════════════════════════════════════════════════════════════
// QuickBite — Core Models
// ═══════════════════════════════════════════════════════════════

// ── API Response Wrappers ─────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
  timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// ── Auth ───────────────────────────────────────────────────────
export interface User {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'OWNER' | 'AGENT' | 'ADMIN';
  provider?: string;
  isActive: boolean;
  createdAt: string;
  profilePicUrl?: string;
}

export interface LoginRequest  { email: string; password: string; }
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: 'CUSTOMER' | 'OWNER' | 'AGENT';
}
export interface AuthResponse {
  accessToken: string;
  token?: string;
  refreshToken?: string;
  user: User;
}

// ── Restaurant ─────────────────────────────────────────────────
export interface Restaurant {
  restaurantId: number;
  ownerId: number;
  name: string;
  description?: string;
  cuisine: string;
  address: string;
  city: string;
  state?: string;
  pincode?: string;
  latitude: number;
  longitude: number;
  phone: string;
  email?: string;
  avgRating: number;
  isOpen: boolean;
  approvalStatus?: string;
  deliveryRadius: number;
  minOrderAmount: number;
  estimatedDeliveryMin: number;
  imageUrl?: string;
  openingTime?: string;
  closingTime?: string;
  totalReviews?: number;
  createdAt?: string;
  menuCategories?: MenuCategory[];
}

// ── Menu ───────────────────────────────────────────────────────
export interface MenuCategory {
  categoryId: number;
  restaurantId: number;
  name: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive?: boolean;
  itemCount?: number;
  createdAt?: string;
  items?: MenuItem[];
}

export interface MenuItem {
  itemId: number;
  restaurantId: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  effectivePrice?: number;
  imageUrl?: string;
  isVeg: boolean;
  isAvailable: boolean;
  rating?: number;
  calories?: number;
  tags?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ── Cart ───────────────────────────────────────────────────────
export interface Cart {
  cartId: number;
  customerId: number;
  restaurantId: number;
  totalPrice: number;
  items: CartItem[];
  promoCode?: string;
  discount?: number;
}

export interface CartItem {
  itemId: number;
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
  imageUrl?: string;
  isVeg?: boolean;
}

// ── Order ──────────────────────────────────────────────────────
export type OrderStatus = 'PLACED'|'CONFIRMED'|'PREPARING'|'PICKED_UP'|'DELIVERED'|'CANCELLED';
export type PaymentMode  = 'COD'|'CARD'|'UPI'|'WALLET';

export interface Order {
  orderId: number;
  customerId: number;
  restaurantId: number;
  restaurantName?: string;
  deliveryAgentId?: number;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  modeOfPayment: PaymentMode;
  orderStatus: OrderStatus;
  orderDate: string;
  estimatedDelivery?: string;
  deliveryAddress: string;
  specialInstructions?: string;
  items: OrderItem[];
  agentName?: string;
  agentPhone?: string;
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
}

export interface PlaceOrderRequest {
  deliveryAddress: string;
  modeOfPayment: PaymentMode;
  specialInstructions?: string;
}

// ── Payment & Wallet ───────────────────────────────────────────
export type PaymentStatus = 'PENDING'|'PAID'|'REFUNDED'|'FAILED';

export interface Payment {
  paymentId: number;
  orderId: number;
  customerId: number;
  amount: number;
  status: PaymentStatus;
  mode: PaymentMode;
  transactionId?: string;
  currency: string;
  paidAt?: string;
  refundedAt?: string;
}

export interface Wallet {
  walletId: number;
  customerId: number;
  balance: number;
}

export interface WalletStatement {
  id: number;
  walletId: number;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  createdAt: string;
  balance: number;
}

// ── Delivery Agent ─────────────────────────────────────────────
export interface DeliveryAgent {
  agentId: number;
  userId: number;
  fullName: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  currentLatitude?: number;
  currentLongitude?: number;
  isAvailable: boolean;
  isVerified: boolean;
  avgRating: number;
  totalDeliveries: number;
}

// ── Review ─────────────────────────────────────────────────────
export interface Review {
  reviewId: number;
  orderId: number;
  customerId: number;
  restaurantId: number;
  agentId?: number;
  foodRating: number;
  deliveryRating?: number;
  comment?: string;
  reviewDate: string;
  isVerified: boolean;
  customerName?: string;
}

export interface SubmitReviewRequest {
  orderId: number;
  restaurantId: number;
  agentId?: number;
  foodRating: number;
  deliveryRating?: number;
  comment?: string;
}

// ── Notification ───────────────────────────────────────────────
export type NotifType    = 'ORDER'|'PAYMENT'|'PROMO'|'DELIVERY';
export type NotifChannel = 'APP'|'EMAIL'|'SMS';

export interface Notification {
  notificationId: number;
  recipientId: number;
  type: NotifType;
  title: string;
  message: string;
  channel: NotifChannel;
  relatedId?: number;
  relatedType?: string;
  isRead: boolean;
  sentAt: string;
}

// ── API Response Wrapper ───────────────────────────────────────
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  avgRating: number;
  ordersToday: number;
  revenueToday: number;
  pendingApprovals?: number;
  activeDeliveries?: number;
}

export interface RevenueData {
  label: string;
  amount: number;
}
