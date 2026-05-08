import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RestaurantService, CartService, ReviewService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { CartStateService, ToastService } from '../../../core/services/ui.services';
import { Restaurant, MenuCategory, MenuItem, Review, Cart } from '../../../core/models';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant!: Restaurant;
  categories: MenuCategory[] = [];
  menuItems: MenuItem[] = [];
  reviews: Review[] = [];
  cart: Cart | null = null;
  cartQty: Record<number, number> = {};
  activeCategory = 0;
  loading = true;
  errorMessage = '';
  activeTab: 'menu' | 'reviews' | 'info' = 'menu';
  searchMenu = '';
  showVegOnly = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restSvc: RestaurantService,
    private cartSvc: CartService,
    private reviewSvc: ReviewService,
    public auth: AuthService,
    private cartState: CartStateService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRestaurant(id);
    this.loadMenu(id);
    this.loadReviews(id);
    if (this.auth.isCustomer && this.auth.currentUser) {
      this.loadCart(this.auth.currentUser.userId);
    }
  }

  loadRestaurant(id: number) {
    this.restSvc.getById(id).subscribe({
      next: r => { this.restaurant = r; this.loading = false; },
      error: () => {
        this.errorMessage = 'We could not load this restaurant right now.';
        this.loading = false;
      }
    });
  }

  loadMenu(restaurantId: number) {
    this.restSvc.getCategories(restaurantId).subscribe({
      next: cats => {
        this.categories = cats;
      },
      error: () => {
        this.categories = [];
      }
    });

    this.restSvc.getMenu(restaurantId).subscribe({
      next: items => {
        this.menuItems = items;
      },
      error: () => {
        this.menuItems = [];
      }
    });
  }

  loadReviews(restaurantId: number) {
    this.reviewSvc.getByRestaurant(restaurantId).subscribe({
      next: r => this.reviews = r,
      error: () => this.reviews = []
    });
  }

  loadCart(customerId: number) {
    this.cartSvc.getCart(customerId).subscribe({
      next: c => { this.syncCart(c); },
      error: () => { }
    });
  }

  get filteredItems(): MenuItem[] {
    let items = this.menuItems;
    if (this.showVegOnly) items = items.filter(i => i.isVeg);
    if (this.searchMenu) {
      const q = this.searchMenu.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
    }
    if (this.activeCategory) items = items.filter(i => i.categoryId === this.activeCategory);
    return items;
  }

  addToCart(item: MenuItem) {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/login']); return; }
    const qty = (this.cartQty[item.itemId] || 0) + 1;
    this.cartQty[item.itemId] = qty;
    this.cartSvc.addItem(this.auth.currentUser!.userId, item.restaurantId, item.itemId, 1, undefined, item).subscribe({
      next: c => { this.cart = c; this.cartState.setCart(c.items); this.toast.success(`${item.name} added! 🛒`); },
      error: () => { this.cartQty[item.itemId]--; this.toast.error('Failed to add item.'); }
    });
  }

  removeFromCart(item: MenuItem) {
    if (!this.cart) return;
    const qty = (this.cartQty[item.itemId] || 1) - 1;
    this.cartQty[item.itemId] = qty;
    const customerId = this.cart.customerId || this.auth.currentUser?.userId;
    if (!customerId) return;
    if (qty === 0) {
      const cartItem = this.cart.items.find(i => i.menuItemId === item.itemId);
      if (cartItem) {
        this.cartSvc.removeItem(customerId, cartItem.itemId).subscribe({
          next: c => { this.cart = c; this.cartState.setCart(c.items); },
          error: () => { this.cartQty[item.itemId]++; }
        });
      }
    } else {
      const cartItem = this.cart.items.find(i => i.menuItemId === item.itemId);
      if (!cartItem) {
        this.cartQty[item.itemId]++;
        return;
      }
      this.cartSvc.updateQty(customerId, cartItem.itemId, qty).subscribe({
        next: c => { this.cart = c; this.cartState.setCart(c.items); },
        error: () => { this.cartQty[item.itemId]++; }
      });
    }
  }

  getRatingStars(rating: number): boolean[] { return Array.from({ length: 5 }, (_, i) => i < rating); }

  get cartTotal(): number { return this.cart ? this.cart.totalPrice : 0; }
  get cartItemCount(): number { return Object.values(this.cartQty).reduce((s, q) => s + q, 0); }

  private syncCart(cart: Cart): void {
    this.cart = cart;
    this.cartQty = {};
    cart.items.forEach(i => this.cartQty[i.menuItemId] = i.quantity);
    this.cartState.setCart(cart.items);
  }
}
