import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Restaurant, MenuCategory, MenuItem, Cart, CartItem,
  Order, OrderItem, PlaceOrderRequest, Payment, Wallet, WalletStatement,
  RazorpayCreateOrderRequest, RazorpayCheckoutRequest, RazorpayCheckoutVerifyRequest,
  RazorpayOrderResponse, RazorpayVerifyPaymentRequest, RazorpayWalletTopUpResponse,
  DeliveryAgent, Review, SubmitReviewRequest, BulkNotificationRequest, Notification, DashboardStats,
  AssignedOrderResponse, AgentLocationResponse, EarningsSummary, OrderSummary, DeliveryHistory,
  ApiResponse, PagedResponse
} from '../models';

const API = environment.apiUrl;

function unwrapData<T>(response: ApiResponse<T>): T {
  if (!response?.success) {
    throw new Error(response?.message || 'Request failed');
  }
  return response.data as T;
}

function normalizeOrderItem(item: any): OrderItem {
  return {
    orderItemId: Number(item?.orderItemId ?? item?.id ?? 0),
    orderId: Number(item?.orderId ?? 0),
    menuItemId: Number(item?.menuItemId ?? 0),
    name: item?.name ?? item?.menuItemName ?? 'Item',
    price: Number(item?.price ?? item?.lineTotal ?? 0),
    quantity: Number(item?.quantity ?? 0),
    customization: item?.customization ?? undefined
  };
}

function normalizeOrder(order: any): Order {
  const rawItems = Array.isArray(order?.items)
    ? order.items
    : Array.isArray(order?.orderItems)
      ? order.orderItems
      : [];
  const items = rawItems.map(normalizeOrderItem);

  return {
    ...order,
    totalAmount: Number(order?.totalAmount ?? 0),
    discount: Number(order?.discount ?? 0),
    finalAmount: Number(order?.finalAmount ?? order?.totalAmount ?? 0),
    modeOfPayment: order?.modeOfPayment ?? order?.paymentMode ?? 'COD',
    orderStatus: order?.orderStatus ?? 'PLACED',
    orderDate: order?.orderDate ?? new Date().toISOString(),
    deliveryAddress: order?.deliveryAddress ?? '',
    specialInstructions: order?.specialInstructions ?? undefined,
    items,
    itemCount: Number.isFinite(Number(order?.itemCount)) ? Number(order.itemCount) : items.length,
    cancellable: typeof order?.cancellable === 'boolean' ? order.cancellable : undefined
  };
}

function normalizeOrders(orders: any[]): Order[] {
  return (orders || []).map(normalizeOrder);
}

function normalizeOrderSummary(order: any): OrderSummary {
  return {
    orderId: Number(order?.orderId ?? 0),
    customerId: Number(order?.customerId ?? 0),
    customerName: order?.customerName ?? undefined,
    restaurantId: Number(order?.restaurantId ?? 0),
    restaurantName: order?.restaurantName ?? undefined,
    deliveryAgentId: order?.deliveryAgentId ?? null,
    deliveryAddress: order?.deliveryAddress ?? undefined,
    orderStatus: order?.orderStatus ?? 'PLACED',
    finalAmount: Number(order?.finalAmount ?? 0),
    modeOfPayment: order?.modeOfPayment ?? 'COD',
    orderDate: order?.orderDate ?? new Date().toISOString(),
    itemCount: Number.isFinite(Number(order?.itemCount)) ? Number(order.itemCount) : 0,
    cancellable: typeof order?.cancellable === 'boolean' ? order.cancellable : false
  };
}

function normalizeOrderSummaries(orders: any[]): OrderSummary[] {
  return (orders || []).map(normalizeOrderSummary);
}

function normalizeDeliveryHistory(entry: any): DeliveryHistory {
  return {
    historyId: Number(entry?.historyId ?? entry?.id ?? 0),
    agentId: Number(entry?.agentId ?? 0),
    orderId: Number(entry?.orderId ?? 0),
    customerId: entry?.customerId != null ? Number(entry.customerId) : undefined,
    customerName: entry?.customerName ?? undefined,
    restaurantId: entry?.restaurantId != null ? Number(entry.restaurantId) : undefined,
    restaurantName: entry?.restaurantName ?? undefined,
    pickupAddress: entry?.pickupAddress ?? undefined,
    deliveryAddress: entry?.deliveryAddress ?? undefined,
    finalAmount: Number(entry?.finalAmount ?? 0),
    modeOfPayment: entry?.modeOfPayment ?? 'COD',
    orderStatus: entry?.orderStatus ?? 'DELIVERED',
    itemCount: Number.isFinite(Number(entry?.itemCount)) ? Number(entry.itemCount) : 0,
    orderDate: entry?.orderDate ?? undefined,
    deliveredAt: entry?.deliveredAt ?? undefined
  };
}

// ── Restaurant Service ──────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private url = `${API}/restaurants`;
  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 100): Observable<Restaurant[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(this.url, { params }).pipe(
      map(response => response.data?.content || [])
    );
  }

  getAllPaged(page = 0, size = 100): Observable<Restaurant[]> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(this.url, { params }).pipe(
      map(response => response.data?.content || [])
    );
  }

  getApprovedAdmin(page = 0, size = 100): Observable<Restaurant[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(`${this.url}/admin/approved`, { params }).pipe(
      map(response => response.data?.content || [])
    );
  }

  getById(id: number): Observable<Restaurant> {
    return this.http.get<ApiResponse<Restaurant>>(`${this.url}/${id}`).pipe(
      map(response => response.data!)
    );
  }

  getMenu(id: number): Observable<MenuItem[]> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.url}/${id}/menu`).pipe(
      map(response => response.data || [])
    );
  }

  getCategories(id: number): Observable<MenuCategory[]> {
    return this.http.get<ApiResponse<MenuCategory[]>>(`${this.url}/${id}/categories`).pipe(
      map(response => response.data || [])
    );
  }

  getNearby(lat: number, lng: number, radius?: number): Observable<Restaurant[]> {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lng', lng);
    if (radius != null && !Number.isNaN(radius)) {
      params = params.set('radius', radius);
    }
    return this.http.get<ApiResponse<Restaurant[]>>(`${this.url}/nearby`, {
      params
    }).pipe(
      map(response => response.data || [])
    );
  }

  getByCity(city: string, page = 0, size = 100): Observable<Restaurant[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(`${this.url}/city/${encodeURIComponent(city)}`, {
      params
    }).pipe(
      map(response => response.data?.content || [])
    );
  }

  search(q: string): Observable<Restaurant[]> {
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(`${this.url}/search`, {
      params: new HttpParams().set('keyword', q)
    }).pipe(
      map(response => response.data?.content || [])
    );
  }

  register(data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.post<ApiResponse<Restaurant>>(this.url, data).pipe(map(unwrapData));
  }

  update(id: number, data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.put<ApiResponse<Restaurant>>(`${this.url}/${id}`, data).pipe(map(unwrapData));
  }

  approve(id: number, status: 'APPROVED' | 'REJECTED' = 'APPROVED', reason = ''): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${id}/approve`, { status, reason }).pipe(map(() => undefined));
  }

  toggleOpen(id: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${id}/toggle-open`, {}).pipe(map(() => undefined));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`).pipe(map(() => undefined));
  }

  getByOwner(ownerId: number): Observable<Restaurant[]> {
    return this.http.get<ApiResponse<Restaurant[]>>(`${this.url}/my`).pipe(map(response => response.data || []));
  }

  getPending(page = 0, size = 20): Observable<Restaurant[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(`${this.url}/pending`, { params }).pipe(
      map(response => response.data?.content || [])
    );
  }
}

// ── Menu Service ────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class MenuService {
  private url = `${API}/restaurants`;
  constructor(private http: HttpClient) {}

  getMenu(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.url}/${restaurantId}/menu`).pipe(
      map(response => response.data || [])
    );
  }

  getCategories(restaurantId: number): Observable<MenuCategory[]> {
    return this.http.get<ApiResponse<MenuCategory[]>>(`${this.url}/${restaurantId}/categories`).pipe(
      map(response => response.data || [])
    );
  }

  addCategory(data: Partial<MenuCategory>): Observable<MenuCategory> {
    const restaurantId = data.restaurantId;
    return this.http.post<ApiResponse<MenuCategory>>(`${this.url}/${restaurantId}/categories`, data).pipe(
      map(unwrapData)
    );
  }

  updateCategory(categoryId: number, data: Partial<MenuCategory>): Observable<MenuCategory> {
    const restaurantId = data.restaurantId;
    return this.http.put<ApiResponse<MenuCategory>>(`${this.url}/${restaurantId}/categories/${categoryId}`, data).pipe(
      map(unwrapData)
    );
  }

  deleteCategory(categoryId: number, restaurantId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${restaurantId}/categories/${categoryId}`).pipe(
      map(() => undefined)
    );
  }

  addItem(data: Partial<MenuItem>): Observable<MenuItem> {
    const restaurantId = data.restaurantId;
    const categoryId = data.categoryId;
    return this.http.post<ApiResponse<MenuItem>>(
      `${this.url}/${restaurantId}/categories/${categoryId}/items`,
      data
    ).pipe(map(unwrapData));
  }

  updateItem(id: number, data: Partial<MenuItem>): Observable<MenuItem> {
    const restaurantId = data.restaurantId;
    return this.http.put<ApiResponse<MenuItem>>(`${this.url}/${restaurantId}/items/${id}`, data).pipe(
      map(unwrapData)
    );
  }

  toggleAvailability(id: number, restaurantId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${restaurantId}/items/${id}/toggle-availability`, {}).pipe(
      map(() => undefined)
    );
  }

  deleteItem(id: number, restaurantId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${restaurantId}/items/${id}`).pipe(
      map(() => undefined)
    );
  }

  search(restaurantId: number, q: string): Observable<MenuItem[]> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.url}/${restaurantId}/items/search`, {
      params: new HttpParams().set('keyword', q)
    }).pipe(map(response => response.data || []));
  }

  getVegItems(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.url}/${restaurantId}/items/veg`).pipe(
      map(response => response.data || [])
    );
  }

}

// ── Cart Service ────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class CartService {
  private url = `${API}/cart`;
  constructor(private http: HttpClient) {}

  getCart(customerId: number): Observable<Cart> {
    return this.http.get<ApiResponse<Cart>>(`${this.url}/${customerId}`).pipe(
      map(response => response.data!)
    );
  }

  addItem(customerId: number, restaurantId: number, menuItemId: number, qty: number, note?: string, snapshot?: Partial<MenuItem>): Observable<Cart> {
    return this.http.post<ApiResponse<Cart>>(`${this.url}/${customerId}/items`, {
      menuItemId,
      restaurantId,
      quantity: qty,
      customization: note,
      menuItemName: snapshot?.name,
      menuItemPrice: snapshot?.price,
      menuItemDiscountedPrice: snapshot?.discountedPrice,
      menuItemImageUrl: snapshot?.imageUrl,
      isVeg: snapshot?.isVeg
    }).pipe(
      map(response => response.data!)
    );
  }

  removeItem(customerId: number, itemId: number): Observable<Cart> {
    return this.http.delete<ApiResponse<Cart>>(`${this.url}/${customerId}/items/${itemId}`).pipe(
      map(response => response.data!)
    );
  }

  updateQty(customerId: number, itemId: number, qty: number): Observable<Cart> {
    return this.http.put<ApiResponse<Cart>>(`${this.url}/${customerId}/items/${itemId}`, { quantity: qty }).pipe(
      map(response => response.data!)
    );
  }

  clearCart(customerId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${customerId}`).pipe(
      map(() => undefined)
    );
  }

  applyPromo(customerId: number, code: string): Observable<Cart> {
    return this.http.post<ApiResponse<Cart>>(`${this.url}/${customerId}/promo`, { promoCode: code }).pipe(
      map(response => response.data!)
    );
  }
}

// ── Order Service ───────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class OrderService {
  private url = `${API}/orders`;
  constructor(private http: HttpClient) {}

  placeOrder(data: PlaceOrderRequest): Observable<Order> {
    return this.http.post<ApiResponse<Order>>(`${this.url}`, data).pipe(
      map(response => normalizeOrder(response.data))
    );
  }

  getById(id: number): Observable<Order> {
    return this.http.get<ApiResponse<Order>>(`${this.url}/${id}`).pipe(
      map(response => normalizeOrder(response.data))
    );
  }

  getByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/customer/${customerId}`).pipe(
      map(response => normalizeOrders(response.data || []))
    );
  }

  getByAgent(agentId: number): Observable<OrderSummary[]> {
    return this.http.get<ApiResponse<OrderSummary[]>>(`${this.url}/agent/${agentId}`).pipe(
      map(response => normalizeOrderSummaries(response.data || []))
    );
  }

  getByRestaurant(restaurantId: number): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/restaurant/${restaurantId}`).pipe(
      map(response => normalizeOrders(response.data || []))
    );
  }

  getActive(customerId: number): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/customer/${customerId}/active`).pipe(
      map(response => normalizeOrders(response.data || []))
    );
  }

  updateStatus(orderId: number, status: string): Observable<Order> {
    return this.http.put<ApiResponse<Order>>(`${this.url}/${orderId}/status`, { status }).pipe(
      map(response => normalizeOrder(response.data))
    );
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${orderId}/cancel`, {}).pipe(
      map(() => undefined)
    );
  }

  reorder(orderId: number, request: PlaceOrderRequest): Observable<Order> {
    return this.http.post<ApiResponse<Order>>(`${this.url}/${orderId}/reorder`, request).pipe(
      map(response => normalizeOrder(response.data))
    );
  }

  getAll(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/all`).pipe(
      map(response => normalizeOrders(response.data || []))
    );
  }

  getAllActive(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/all/active`).pipe(
      map(response => normalizeOrders(response.data || []))
    );
  }

  assignAgent(orderId: number, agentId: number): Observable<Order> {
    return this.http.put<ApiResponse<Order>>(`${this.url}/${orderId}/agent`, { agentId }).pipe(
      map(response => normalizeOrder(response.data))
    );
  }

  getRestaurantAnalytics(restaurantId: number): Observable<any> {
    return this.http.get<ApiResponse<any>>(`${this.url}/restaurant/${restaurantId}/analytics`).pipe(
      map(response => response.data!)
    );
  }

  getOrderCount(restaurantId: number): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.url}/count/${restaurantId}`).pipe(
      map(response => response.data || 0)
    );
  }
}

// ── Payment Service ─────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class PaymentService {
  private url    = `${API}/payments`;
  private walUrl = `${API}/wallet`;
  constructor(private http: HttpClient) {}

  processPayment(data: Partial<Payment>): Observable<Payment> {
    return this.http.post<ApiResponse<Payment>>(`${this.url}/process`, data).pipe(
      map(response => response.data!)
    );
  }

  createRazorpayOrder(data: RazorpayCreateOrderRequest): Observable<RazorpayOrderResponse> {
    return this.http.post<ApiResponse<RazorpayOrderResponse>>(`${this.url}/razorpay/create-order`, data).pipe(
      map(response => response.data!)
    );
  }

  createRazorpayCheckoutOrder(data: RazorpayCheckoutRequest): Observable<RazorpayOrderResponse> {
    return this.http.post<ApiResponse<RazorpayOrderResponse>>(`${this.url}/razorpay/checkout`, data).pipe(
      map(response => response.data!)
    );
  }

  verifyRazorpayPayment(data: RazorpayVerifyPaymentRequest): Observable<Payment> {
    return this.http.post<ApiResponse<Payment>>(`${this.url}/razorpay/verify`, data).pipe(
      map(response => response.data!)
    );
  }

  verifyRazorpayCheckoutPayment(data: RazorpayCheckoutVerifyRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.url}/razorpay/verify-checkout`, data).pipe(
      map(() => undefined)
    );
  }

  createWalletTopUpOrder(data: { customerId: number; amount: number; currency?: string }): Observable<RazorpayWalletTopUpResponse> {
    return this.http.post<ApiResponse<RazorpayWalletTopUpResponse>>(`${this.walUrl}/razorpay/create-order`, data).pipe(
      map(response => response.data!)
    );
  }

  verifyWalletTopUpPayment(data: { customerId: number; amount: number; razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string; currency?: string }): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.walUrl}/razorpay/verify`, data).pipe(
      map(() => undefined)
    );
  }

  getByOrder(orderId: number): Observable<Payment> {
    return this.http.get<ApiResponse<Payment>>(`${this.url}/order/${orderId}`).pipe(
      map(response => response.data!)
    );
  }

  getByCustomer(customerId: number): Observable<Payment[]> {
    return this.http.get<ApiResponse<PagedResponse<Payment>>>(`${this.url}/customer/${customerId}`, {
      params: new HttpParams().set('page', 0).set('size', 50)
    }).pipe(map(response => response.data?.content || []));
  }

  refund(paymentId: number): Observable<Payment> {
    return this.refundWithMode(paymentId, 'ORIGINAL');
  }

  refundWithMode(paymentId: number, refundTo: 'WALLET' | 'ORIGINAL' = 'ORIGINAL', reason = 'Customer requested refund'): Observable<Payment> {
    return this.http.post<ApiResponse<Payment>>(`${this.url}/${paymentId}/refund`, {
      reason,
      refundTo
    }).pipe(
      map(response => response.data!)
    );
  }

  getWalletBalance(customerId: number): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.walUrl}/balance/${customerId}`).pipe(
      map(response => response.data!)
    );
  }

  addToWallet(customerId: number, amount: number, gatewayTransactionId?: string): Observable<Wallet> {
    return this.http.post<ApiResponse<Wallet>>(`${this.walUrl}/topup`, {
      customerId,
      amount,
      sourceMode: 'CARD',
      gatewayTransactionId
    }).pipe(
      map(response => response.data!)
    );
  }

  payFromWallet(orderId: number, customerId: number, amount: number): Observable<Payment> {
    return this.http.post<ApiResponse<Payment>>(`${this.url}/process`, {
      orderId,
      customerId,
      amount,
      mode: 'WALLET'
    }).pipe(
      map(response => response.data!)
    );
  }

  getWalletStatements(customerId: number): Observable<WalletStatement[]> {
    return this.http.get<ApiResponse<PagedResponse<WalletStatement>>>(`${this.walUrl}/statements/${customerId}`).pipe(
      map(response => response.data?.content || [])
    );
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<ApiResponse<PagedResponse<Payment>>>(`${this.url}/all`, {
      params: new HttpParams().set('page', 0).set('size', 100)
    }).pipe(map(response => response.data?.content || []));
  }

  getRevenue(start: string, end: string): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.url}/revenue`, {
      params: new HttpParams().set('start', start).set('end', end)
    }).pipe(map(response => response.data ?? 0));
  }
}

// ── Delivery Service ────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class DeliveryService {
  private url = `${API}/agents`;
  constructor(private http: HttpClient) {}

  register(data: Partial<DeliveryAgent>): Observable<DeliveryAgent> {
    return this.http.post<ApiResponse<DeliveryAgent>>(`${this.url}/register`, data).pipe(
      map(response => response.data!)
    );
  }

  getById(id: number): Observable<DeliveryAgent> {
    return this.http.get<ApiResponse<DeliveryAgent>>(`${this.url}/${id}`).pipe(
      map(response => response.data!)
    );
  }

  getByUserId(userId: number): Observable<DeliveryAgent> {
    // Backend exposes the authenticated agent profile at /my.
    return this.getMyProfile();
  }

  getMyProfile(): Observable<DeliveryAgent> {
    return this.http.get<ApiResponse<DeliveryAgent>>(`${this.url}/my`).pipe(
      map(response => response.data!)
    );
  }

  getNearby(lat: number, lng: number): Observable<DeliveryAgent[]> {
    return this.http.get<ApiResponse<DeliveryAgent[]>>(`${this.url}/nearby`, {
      params: new HttpParams().set('lat', lat).set('lng', lng)
    }).pipe(
      map(response => response.data || [])
    );
  }

  updateLocation(agentId: number, lat: number, lng: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${agentId}/location`, { latitude: lat, longitude: lng }).pipe(
      map(() => undefined)
    );
  }

  setAvailability(agentId: number, available: boolean): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${agentId}/availability`, { available }).pipe(
      map(() => undefined)
    );
  }

  approveAgent(agentId: number): Observable<DeliveryAgent> {
    return this.http.put<ApiResponse<DeliveryAgent>>(`${this.url}/${agentId}/approve`, {}).pipe(
      map(response => response.data!)
    );
  }

  rejectAgent(agentId: number, remarks = ''): Observable<DeliveryAgent> {
    return this.http.put<ApiResponse<DeliveryAgent>>(`${this.url}/${agentId}/reject`, { remarks }).pipe(
      map(response => response.data!)
    );
  }

  suspendAgent(agentId: number, remarks = ''): Observable<DeliveryAgent> {
    return this.http.put<ApiResponse<DeliveryAgent>>(`${this.url}/${agentId}/suspend`, { remarks }).pipe(
      map(response => response.data!)
    );
  }

  verifyAgent(agentId: number, action: 'VERIFY' | 'REJECT' | 'SUSPEND' = 'VERIFY', remarks = ''): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${agentId}/verify`, { action, remarks }).pipe(
      map(() => undefined)
    );
  }

  reviewAgent(agentId: number, action: 'VERIFY' | 'REJECT' | 'SUSPEND', remarks = ''): Observable<DeliveryAgent> {
    return this.http.put<ApiResponse<DeliveryAgent>>(`${this.url}/${agentId}/verify`, { action, remarks }).pipe(
      map(response => response.data!)
    );
  }

  getAssignedOrder(agentId: number): Observable<AssignedOrderResponse> {
    return this.http.get<ApiResponse<AssignedOrderResponse>>(`${this.url}/${agentId}/assigned-order`).pipe(
      map(response => response.data!)
    );
  }

  getLiveLocation(agentId: number): Observable<AgentLocationResponse> {
    return this.http.get<ApiResponse<AgentLocationResponse>>(`${this.url}/${agentId}/location`).pipe(
      map(response => response.data!)
    );
  }

  getEarnings(agentId: number): Observable<EarningsSummary> {
    return this.http.get<ApiResponse<EarningsSummary>>(`${this.url}/${agentId}/earnings`).pipe(
      map(response => response.data!)
    );
  }

  getHistory(agentId: number): Observable<DeliveryHistory[]> {
    return this.http.get<ApiResponse<DeliveryHistory[]>>(`${this.url}/${agentId}/history`).pipe(
      map(response => (response.data || []).map(normalizeDeliveryHistory))
    );
  }

  getActiveDeliveries(): Observable<DeliveryAgent[]> {
    return this.getActive();
  }

  completeDelivery(agentId: number, orderId: number): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.url}/${agentId}/complete/${orderId}`, {}).pipe(
      map(() => undefined)
    );
  }

  pickUpOrder(agentId: number, orderId: number): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.url}/${agentId}/pickup/${orderId}`, {}).pipe(
      map(() => undefined)
    );
  }

  getAll(): Observable<DeliveryAgent[]> {
    return this.http.get<ApiResponse<DeliveryAgent[]>>(`${this.url}/all`).pipe(
      map(response => response.data || [])
    );
  }

  getByStatus(status: 'PENDING' | 'VERIFIED' | 'SUSPENDED' | 'REJECTED'): Observable<DeliveryAgent[]> {
    return this.http.get<ApiResponse<DeliveryAgent[]>>(`${this.url}/status/${status}`).pipe(
      map(response => response.data || [])
    );
  }

  getActive(): Observable<DeliveryAgent[]> {
    return this.http.get<ApiResponse<DeliveryAgent[]>>(`${this.url}/active`).pipe(
      map(response => response.data || [])
    );
  }

  delete(agentId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${agentId}`).pipe(
      map(() => undefined)
    );
  }
}

// ── Review Service ──────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class ReviewService {
  private url = `${API}/reviews`;
  constructor(private http: HttpClient) {}

  addReview(data: SubmitReviewRequest): Observable<Review> {
    return this.http.post<ApiResponse<Review>>(this.url, data).pipe(
      map(response => response.data!)
    );
  }

  getByOrder(orderId: number): Observable<Review> {
    return this.http.get<ApiResponse<Review>>(`${this.url}/order/${orderId}`).pipe(
      map(response => response.data!)
    );
  }

  getByRestaurant(restaurantId: number): Observable<Review[]> {
    return this.http.get<ApiResponse<Review[]>>(`${this.url}/restaurant/${restaurantId}`).pipe(
      map(response => response.data || [])
    );
  }

  getByCustomer(customerId: number): Observable<Review[]> {
    return this.http.get<ApiResponse<Review[]>>(`${this.url}/customer/${customerId}`).pipe(
      map(response => response.data || [])
    );
  }

  getAvgFoodRating(restaurantId: number): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.url}/restaurant/${restaurantId}/average`).pipe(
      map(response => response.data!)
    );
  }

  getAvgDeliveryRating(agentId: number): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.url}/agent/${agentId}/average`).pipe(
      map(response => response.data!)
    );
  }

  getRestaurantSummary(restaurantId: number): Observable<any> {
    return this.http.get<ApiResponse<any>>(`${this.url}/restaurant/${restaurantId}/summary`).pipe(
      map(response => response.data!)
    );
  }

  getAgentSummary(agentId: number): Observable<any> {
    return this.http.get<ApiResponse<any>>(`${this.url}/agent/${agentId}/summary`).pipe(
      map(response => response.data!)
    );
  }

  updateReview(reviewId: number, data: Partial<SubmitReviewRequest>): Observable<Review> {
    return this.http.put<ApiResponse<Review>>(`${this.url}/${reviewId}`, data).pipe(
      map(response => response.data!)
    );
  }

  flagReview(reviewId: number, reason: string): Observable<Review> {
    return this.http.put<ApiResponse<Review>>(`${this.url}/${reviewId}/flag`, { reason }).pipe(
      map(response => response.data!)
    );
  }

  verifyReview(reviewId: number): Observable<Review> {
    return this.http.put<ApiResponse<Review>>(`${this.url}/${reviewId}/verify`, {}).pipe(
      map(response => response.data!)
    );
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`).pipe(
      map(() => undefined)
    );
  }

  getAll(): Observable<Review[]> {
    return this.http.get<ApiResponse<Review[]>>(`${this.url}/all`).pipe(
      map(response => response.data || [])
    );
  }

  getFlagged(): Observable<Review[]> {
    return this.http.get<ApiResponse<Review[]>>(`${this.url}/flagged`).pipe(
      map(response => response.data || [])
    );
  }
}

// ── Notification Service ────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private url = `${API}/notifications`;
  constructor(private http: HttpClient) {}

  getByRecipient(userId: number): Observable<Notification[]> {
    return this.http.get<ApiResponse<PagedResponse<Notification>>>(`${this.url}/recipient/${userId}`, {
      params: new HttpParams().set('page', 0).set('size', 20)
    }).pipe(
      map(response => response.data?.content || [])
    );
  }

  markRead(notifId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/read/${notifId}`, {}).pipe(
      map(() => undefined)
    );
  }

  markAllRead(userId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/read-all/${userId}`, {}).pipe(
      map(() => undefined)
    );
  }

  getUnreadCount(userId: number): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.url}/unread-count/${userId}`).pipe(
      map(response => response.data!)
    );
  }

  delete(notifId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${notifId}`).pipe(
      map(() => undefined)
    );
  }

  getAll(): Observable<Notification[]> {
    return this.http.get<ApiResponse<PagedResponse<Notification>>>(`${this.url}/all`, {
      params: new HttpParams().set('page', 0).set('size', 100)
    }).pipe(
      map(response => response.data?.content || [])
    );
  }

  sendBulk(data: BulkNotificationRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.url}/send-bulk`, {
      recipientIds: data.recipientIds || [],
      broadcastAll: data.broadcastAll ?? false,
      targetRole: data.targetRole ?? null,
      type: data.type,
      title: data.title,
      message: data.message,
      channel: data.channel || 'APP',
      relatedId: data.relatedId,
      relatedType: data.relatedType,
      deepLinkUrl: data.deepLinkUrl
    }).pipe(
      map(() => undefined)
    );
  }
}
