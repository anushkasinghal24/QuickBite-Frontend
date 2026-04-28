import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Restaurant, MenuCategory, MenuItem, Cart, CartItem,
  Order, PlaceOrderRequest, Payment, Wallet, WalletStatement,
  DeliveryAgent, Review, SubmitReviewRequest, Notification, DashboardStats,
  ApiResponse, PagedResponse
} from '../models';

const API = environment.apiUrl;

function unwrapData<T>(response: ApiResponse<T>): T {
  if (!response?.success) {
    throw new Error(response?.message || 'Request failed');
  }
  return response.data as T;
}

// ── Restaurant Service ──────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private url = `${API}/restaurants`;
  constructor(private http: HttpClient) {}

  getAll(city?: string, cuisine?: string): Observable<Restaurant[]> {
    let params = new HttpParams();
    if (city) params = params.set('city', city);
    if (cuisine) params = params.set('cuisine', cuisine);
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(this.url, { params }).pipe(
      map(response => response.data?.content || [])
    );
  }

  getAllPaged(page = 0, size = 100, city?: string, cuisine?: string): Observable<Restaurant[]> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    if (city) params = params.set('city', city);
    if (cuisine) params = params.set('cuisine', cuisine);
    return this.http.get<ApiResponse<PagedResponse<Restaurant>>>(this.url, { params }).pipe(
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

  getNearby(lat: number, lng: number): Observable<Restaurant[]> {
    return this.http.get<ApiResponse<Restaurant[]>>(`${this.url}/nearby`, {
      params: new HttpParams().set('lat', lat).set('lng', lng)
    }).pipe(
      map(response => response.data || [])
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
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.url}/${restaurantId}/search`, {
      params: new HttpParams().set('keyword', q)
    }).pipe(map(response => response.data || []));
  }

  getVegItems(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.url}/${restaurantId}/veg`).pipe(
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

  addItem(customerId: number, restaurantId: number, menuItemId: number, qty: number, note?: string): Observable<Cart> {
    return this.http.post<ApiResponse<Cart>>(`${this.url}/${customerId}/items`, { menuItemId, restaurantId, quantity: qty, customization: note }).pipe(
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
      map(response => response.data!)
    );
  }

  getById(id: number): Observable<Order> {
    return this.http.get<ApiResponse<Order>>(`${this.url}/${id}`).pipe(
      map(response => response.data!)
    );
  }

  getByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/customer/${customerId}`).pipe(
      map(response => response.data || [])
    );
  }

  getByRestaurant(restaurantId: number): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/restaurant/${restaurantId}`).pipe(
      map(response => response.data || [])
    );
  }

  getActive(customerId: number): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/customer/${customerId}/active`).pipe(
      map(response => response.data || [])
    );
  }

  updateStatus(orderId: number, status: string): Observable<Order> {
    return this.http.put<ApiResponse<Order>>(`${this.url}/${orderId}/status`, { status }).pipe(
      map(response => response.data!)
    );
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${orderId}/cancel`, {}).pipe(
      map(() => undefined)
    );
  }

  reorder(orderId: number): Observable<Order> {
    return this.http.post<ApiResponse<Order>>(`${this.url}/${orderId}/reorder`, {}).pipe(
      map(response => response.data!)
    );
  }

  getAll(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/all`).pipe(
      map(response => response.data || [])
    );
  }

  getAllActive(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/all/active`).pipe(
      map(response => response.data || [])
    );
  }

  assignAgent(orderId: number, agentId: number): Observable<Order> {
    return this.http.put<ApiResponse<Order>>(`${this.url}/${orderId}/agent`, { agentId }).pipe(
      map(response => response.data!)
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
    return this.http.post<ApiResponse<Payment>>(`${this.url}/${paymentId}/refund`, {}).pipe(
      map(response => response.data!)
    );
  }

  getWalletBalance(customerId: number): Observable<number> {
    return this.http.get<ApiResponse<number>>(`${this.walUrl}/balance/${customerId}`).pipe(
      map(response => response.data!)
    );
  }

  addToWallet(customerId: number, amount: number): Observable<Wallet> {
    return this.http.post<ApiResponse<Wallet>>(`${this.walUrl}/topup`, { customerId, amount, sourceMode: 'CARD' }).pipe(
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
    return this.http.get<ApiResponse<DeliveryAgent>>(`${this.url}/user/${userId}`).pipe(
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

  verifyAgent(agentId: number): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.url}/${agentId}/verify`, {}).pipe(
      map(() => undefined)
    );
  }

  reviewAgent(agentId: number, action: 'VERIFY' | 'REJECT' | 'SUSPEND', remarks = ''): Observable<DeliveryAgent> {
    return this.http.put<ApiResponse<DeliveryAgent>>(`${this.url}/${agentId}/verify`, { action, remarks }).pipe(
      map(response => response.data!)
    );
  }

  getActiveDeliveries(agentId: number): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(`${this.url}/${agentId}/active`).pipe(
      map(response => response.data || [])
    );
  }

  completeDelivery(agentId: number, orderId: number): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.url}/${agentId}/complete/${orderId}`, {}).pipe(
      map(() => undefined)
    );
  }

  getAll(): Observable<DeliveryAgent[]> {
    return this.http.get<ApiResponse<DeliveryAgent[]>>(this.url).pipe(
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

  deleteReview(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.url}/${id}`).pipe(
      map(() => undefined)
    );
  }

  getAll(): Observable<Review[]> {
    return this.http.get<ApiResponse<Review[]>>(this.url).pipe(
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
    return this.http.get<ApiResponse<PagedResponse<Notification>>>(`${this.url}/recipient/${userId}`).pipe(
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
    return this.http.get<ApiResponse<PagedResponse<Notification>>>(this.url).pipe(
      map(response => response.data?.content || [])
    );
  }

  sendBulk(userIds: number[], title: string, message: string): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.url}/send-bulk`, { recipientIds: userIds, title, message }).pipe(
      map(() => undefined)
    );
  }
}
