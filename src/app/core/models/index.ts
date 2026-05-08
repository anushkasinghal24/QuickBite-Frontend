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
  costForTwo?: number;
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
  menuItems?: MenuItem[];
}

export interface MenuItem {
  itemId: number;
  restaurantId: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  description?: string;
  price: number;
  discountPercent?: number;
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
export type OrderStatus = 'PLACED'|'CONFIRMED'|'PREPARING'|'READY_TO_PICK_UP'|'PICKED_UP'|'DELIVERED'|'CANCELLED';
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
  itemCount?: number;
  cancellable?: boolean;
  agentName?: string;
  agentPhone?: string;
}

export interface OrderSummary {
  orderId: number;
  customerId: number;
  customerName?: string;
  restaurantId: number;
  restaurantName?: string;
  deliveryAgentId?: number | null;
  deliveryAddress?: string;
  orderStatus: OrderStatus;
  finalAmount: number;
  modeOfPayment: PaymentMode;
  orderDate: string;
  itemCount: number;
  cancellable: boolean;
}

export interface DeliveryHistory {
  historyId?: number;
  agentId: number;
  orderId: number;
  customerId?: number;
  customerName?: string;
  restaurantId?: number;
  restaurantName?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  finalAmount: number;
  modeOfPayment: PaymentMode;
  orderStatus: OrderStatus | string;
  itemCount: number;
  orderDate?: string;
  deliveredAt?: string;
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
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  currency: string;
  createdAt?: string;
  paidAt?: string;
  refundedAt?: string;
}

export interface RazorpayCreateOrderRequest {
  orderId: number;
  customerId: number;
  amount: number;
  mode: 'CARD' | 'UPI';
  currency?: string;
}

export interface RazorpayCheckoutRequest {
  amount: number;
  mode: 'CARD' | 'UPI';
  currency?: string;
}

export interface RazorpayCheckoutVerifyRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface RazorpayOrderResponse {
  keyId: string;
  razorpayOrderId: string;
  orderId?: number;
  customerId?: number;
  amount: number;
  currency: string;
  status: PaymentStatus;
  receipt: string;
}

export interface RazorpayVerifyPaymentRequest {
  orderId: number;
  customerId: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount?: number;
  currency?: string;
}

export interface RazorpayWalletTopUpResponse {
  keyId: string;
  razorpayOrderId: string;
  customerId: number;
  amount: number;
  currency: string;
  status: PaymentStatus;
  receipt: string;
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
  status?: string;
  currentOrderId?: number;
  totalEarnings?: number;
  adminRemarks?: string;
  locationUpdatedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssignedOrderResponse {
  orderId: number;
  agentId: number;
  restaurantId: number;
  restaurantName: string;
  pickupAddress: string;
  pickupLatitude?: number;
  pickupLongitude?: number;
  customerName: string;
  deliveryAddress: string;
  orderStatus: OrderStatus;
  orderDate?: string;
  estimatedDelivery?: string;
}

export interface AgentLocationResponse {
  agentId: number;
  fullName: string;
  currentLatitude?: number;
  currentLongitude?: number;
  locationUpdatedAt?: string;
  avgRating?: number;
  vehicleType?: string;
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
  isFlagged?: boolean;
  flagReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubmitReviewRequest {
  orderId: number;
  restaurantId: number;
  agentId?: number;
  foodRating: number;
  deliveryRating?: number;
  comment?: string;
}

export interface BulkNotificationRequest {
  recipientIds?: number[];
  broadcastAll?: boolean;
  targetRole?: 'CUSTOMER' | 'OWNER' | 'AGENT' | null;
  type: string;
  title: string;
  message: string;
  channel?: 'APP' | 'EMAIL' | 'SMS' | 'ALL';
  relatedId?: number;
  relatedType?: string;
  deepLinkUrl?: string;
}

// ── Notification ───────────────────────────────────────────────
export type NotifType    = 'ORDER'|'NEW_ORDER_ALERT'|'PAYMENT'|'PROMO'|'DELIVERY';
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
  deepLinkUrl?: string;
  isRead: boolean;
  audible?: boolean;
  sentAt: string;
  readAt?: string;
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

export interface TopSellingItem {
  menuItemId: number;
  itemName: string;
  quantitySold: number;
  revenue: number;
}

export interface PeakHour {
  hour: number;
  label: string;
  orderCount: number;
}

export interface RevenueAnalytics {
  restaurantId: number;
  restaurantName: string;
  totalRevenue: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  topSellingItems: TopSellingItem[];
  peakHours: PeakHour[];
}

export interface EarningsSummary {
  agentId: number;
  fullName: string;
  totalDeliveries: number;
  totalEarnings: number;
  avgRating: number;
  isAvailable: boolean;
  status: string;
}
