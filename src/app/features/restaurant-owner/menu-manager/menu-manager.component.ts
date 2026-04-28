import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestaurantService, MenuService } from '../../../core/services/api.services';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';
import { Restaurant, MenuCategory, MenuItem } from '../../../core/models';

@Component({
  selector: 'app-menu-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Menu Manager</h1>
    <p>Add, edit, and manage your restaurant categories and dishes</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">🍽️</div>
    <div class="empty-title">Menu unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="card section-card" style="margin-bottom:24px">
    <div class="section-head">
      <div>
        <h3 style="margin:0 0 4px">Choose Restaurant</h3>
        <p class="text-muted" style="margin:0">Select the restaurant whose menu you want to manage.</p>
      </div>
      <a routerLink="/owner" class="btn btn-ghost">Back to dashboard</a>
    </div>

    <div class="restaurant-switcher" *ngIf="restaurants.length">
      <button
        *ngFor="let restaurant of restaurants"
        class="switch-btn"
        [class.active]="selectedRestaurantId === restaurant.restaurantId"
        (click)="selectRestaurant(restaurant.restaurantId)">
        {{ restaurant.name }}
      </button>
    </div>

    <div *ngIf="!restaurants.length" class="empty-copy">
      You need to create a restaurant first.
      <a routerLink="/owner" class="link-inline">Go to owner dashboard</a>.
    </div>
  </div>

  <ng-container *ngIf="selectedRestaurant">
    <div class="card section-card" style="margin-bottom:24px">
      <div class="section-head">
        <div>
          <h3 style="margin:0 0 4px">{{ selectedRestaurant.name }}</h3>
          <p class="text-muted" style="margin:0">{{ selectedRestaurant.city }} · {{ selectedRestaurant.cuisine }}</p>
        </div>
        <span class="badge" [class.badge-success]="selectedRestaurant.approvalStatus === 'APPROVED'" [class.badge-warning]="selectedRestaurant.approvalStatus !== 'APPROVED'">
          {{ selectedRestaurant.approvalStatus || 'PENDING' }}
        </span>
      </div>

      <div class="selected-actions">
        <button class="btn btn-secondary btn-sm" (click)="reloadSelected()">Refresh</button>
        <button class="btn btn-secondary btn-sm" (click)="toggleRestaurantOpen()">
          {{ selectedRestaurant.isOpen ? 'Close Restaurant' : 'Open Restaurant' }}
        </button>
      </div>
    </div>

    <div class="grid dual-grid">
      <div class="card section-card">
        <div class="section-head">
          <div>
            <h3 style="margin:0 0 4px">Categories</h3>
            <p class="text-muted" style="margin:0">Create, edit, or remove menu sections.</p>
          </div>
        </div>

        <div class="mini-form">
          <div class="grid mini-grid">
            <input class="input" [(ngModel)]="newCategory.name" placeholder="Category name" />
            <input class="input" [(ngModel)]="newCategory.displayOrder" type="number" placeholder="Order" />
            <input class="input full" [(ngModel)]="newCategory.description" placeholder="Description" />
          </div>
          <div class="section-actions">
            <button class="btn btn-primary" (click)="addCategory()">Add Category</button>
          </div>
        </div>

        <div *ngIf="categories.length; else noCategories" class="stack">
          <div class="category-card" *ngFor="let category of categories">
            <div class="row-top">
              <div>
                <div class="title">{{ category.name }}</div>
                <div class="meta">{{ category.itemCount || 0 }} item(s) · Order {{ category.displayOrder }}</div>
              </div>
              <span class="pill" [class.offline]="category.isActive === false">{{ category.isActive === false ? 'Inactive' : 'Active' }}</span>
            </div>

            <div class="grid edit-grid">
              <input class="input" [(ngModel)]="categoryDrafts[category.categoryId].name" />
              <input class="input" [(ngModel)]="categoryDrafts[category.categoryId].displayOrder" type="number" />
              <input class="input full" [(ngModel)]="categoryDrafts[category.categoryId].description" />
            </div>
            <div class="section-actions">
              <button class="btn btn-secondary btn-sm" (click)="saveCategory(category)">Save</button>
              <button class="btn btn-danger btn-sm" (click)="deleteCategory(category)">Delete</button>
            </div>
          </div>
        </div>

        <ng-template #noCategories>
          <div class="empty-copy">No categories yet. Add your first one above.</div>
        </ng-template>
      </div>

      <div class="card section-card">
        <div class="section-head">
          <div>
            <h3 style="margin:0 0 4px">Add Menu Item</h3>
            <p class="text-muted" style="margin:0">Create a dish and assign it to a category.</p>
          </div>
        </div>

        <div class="mini-form">
          <div class="grid item-grid">
            <select class="input full" [(ngModel)]="newItem.categoryId">
              <option [ngValue]="null">Select category</option>
              <option *ngFor="let category of categories" [ngValue]="category.categoryId">{{ category.name }}</option>
            </select>
            <input class="input" [(ngModel)]="newItem.name" placeholder="Item name" />
            <input class="input" [(ngModel)]="newItem.price" type="number" placeholder="Price" />
            <input class="input" [(ngModel)]="newItem.discountedPrice" type="number" placeholder="Discounted price" />
            <input class="input full" [(ngModel)]="newItem.description" placeholder="Description" />
            <input class="input" [(ngModel)]="newItem.imageUrl" placeholder="Image URL" />
            <input class="input" [(ngModel)]="newItem.tags" placeholder="Tags: spicy,bestseller" />
            <input class="input" [(ngModel)]="newItem.calories" type="number" placeholder="Calories" />
            <select class="input" [(ngModel)]="newItem.isVeg">
              <option [ngValue]="true">Veg</option>
              <option [ngValue]="false">Non-Veg</option>
            </select>
          </div>
          <div class="section-actions">
            <button class="btn btn-primary" (click)="addItem()">Add Item</button>
            <button class="btn btn-ghost" (click)="resetItemForm()">Reset</button>
          </div>
        </div>

        <div class="menu-block">
          <div class="section-head" style="margin-bottom:12px">
            <h3 style="margin:0">Items</h3>
            <span class="badge">{{ allItems.length }}</span>
          </div>

          <div *ngIf="allItems.length; else noItems" class="stack">
            <div class="item-card" *ngFor="let item of allItems">
              <div class="row-top">
                <div>
                  <div class="title">{{ item.name }}</div>
                  <div class="meta">{{ item.categoryName || categoryNameById(item.categoryId) }} · {{ item.isVeg ? 'Veg' : 'Non-Veg' }} · Rs. {{ item.effectivePrice || item.price }}</div>
                </div>
                <span class="pill" [class.offline]="!item.isAvailable">{{ item.isAvailable ? 'Available' : 'Hidden' }}</span>
              </div>

              <div class="grid edit-grid">
                <input class="input" [(ngModel)]="itemDrafts[item.itemId].name" />
                <input class="input" [(ngModel)]="itemDrafts[item.itemId].price" type="number" />
                <input class="input" [(ngModel)]="itemDrafts[item.itemId].discountedPrice" type="number" />
                <select class="input" [(ngModel)]="itemDrafts[item.itemId].categoryId">
                  <option *ngFor="let category of categories" [ngValue]="category.categoryId">{{ category.name }}</option>
                </select>
                <input class="input full" [(ngModel)]="itemDrafts[item.itemId].description" />
                <input class="input" [(ngModel)]="itemDrafts[item.itemId].imageUrl" placeholder="Image URL" />
                <input class="input" [(ngModel)]="itemDrafts[item.itemId].tags" placeholder="Tags" />
                <input class="input" [(ngModel)]="itemDrafts[item.itemId].calories" type="number" placeholder="Calories" />
                <select class="input" [(ngModel)]="itemDrafts[item.itemId].isVeg">
                  <option [ngValue]="true">Veg</option>
                  <option [ngValue]="false">Non-Veg</option>
                </select>
              </div>

              <div class="section-actions">
                <button class="btn btn-secondary btn-sm" (click)="saveItem(item)">Save</button>
                <button class="btn btn-secondary btn-sm" (click)="toggleAvailability(item)">
                  {{ item.isAvailable ? 'Hide' : 'Show' }}
                </button>
                <button class="btn btn-danger btn-sm" (click)="deleteItem(item)">Delete</button>
              </div>
            </div>
          </div>

          <ng-template #noItems>
            <div class="empty-copy">No menu items yet. Add your first dish above.</div>
          </ng-template>
        </div>
      </div>
    </div>
  </ng-container>
</div>
  `,
  styles: [`
.section-card{padding:20px}
.section-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:16px}
.restaurant-switcher{display:flex;flex-wrap:wrap;gap:10px}
.switch-btn{padding:10px 14px;border-radius:999px;border:1px solid var(--border-color);background:var(--bg-card);font-weight:600;cursor:pointer}
.switch-btn.active{border-color:var(--brand-primary);background:rgba(255,75,43,.08);color:var(--brand-primary)}
.selected-actions,.section-actions{display:flex;gap:10px;flex-wrap:wrap}
.dual-grid{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.mini-form{border:1px solid var(--border-color);border-radius:16px;padding:14px;background:rgba(248,250,252,.6);margin-bottom:16px}
.mini-grid,.item-grid,.edit-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.full{grid-column:1 / -1}
.stack{display:flex;flex-direction:column;gap:12px}
.category-card,.item-card{border:1px solid var(--border-color);border-radius:16px;padding:14px;background:var(--bg-card)}
.row-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.title{font-weight:800}
.meta{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.pill{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.1);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.pill.offline{background:rgba(100,116,139,.12);color:#475569}
.badge{min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--brand-primary);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700}
.empty-copy{color:var(--text-muted);padding:10px 0}
.link-inline{color:var(--brand-primary);font-weight:700;text-decoration:none}
  `]
})
export class MenuManagerComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurantId: number | null = null;
  selectedRestaurant: Restaurant | null = null;
  categories: MenuCategory[] = [];
  allItems: MenuItem[] = [];
  errorMessage = '';

  newCategory: Partial<MenuCategory> = this.defaultCategory();
  newItem: Partial<MenuItem> = this.defaultItem();
  categoryDrafts: Record<number, Partial<MenuCategory>> = {};
  itemDrafts: Record<number, Partial<MenuItem>> = {};

  constructor(
    private restaurantSvc: RestaurantService,
    private menuSvc: MenuService,
    public auth: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    if (!this.auth.currentUser) return;
    this.restaurantSvc.getByOwner(this.auth.currentUser.userId).subscribe({
      next: restaurants => {
        this.restaurants = restaurants;
        this.errorMessage = '';
        if (restaurants.length) {
          const nextId = this.selectedRestaurantId || restaurants[0].restaurantId;
          this.selectRestaurant(nextId);
        } else {
          this.selectedRestaurantId = null;
          this.selectedRestaurant = null;
          this.categories = [];
          this.allItems = [];
        }
      },
      error: () => this.errorMessage = 'Could not load your restaurants.'
    });
  }

  selectRestaurant(restaurantId: number): void {
    this.selectedRestaurantId = restaurantId;
    this.restaurantSvc.getById(restaurantId).subscribe({
      next: restaurant => {
        this.selectedRestaurant = restaurant;
        this.categories = [...(restaurant.menuCategories || [])].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        this.allItems = this.categories.flatMap(category => (category.items || []).map(item => ({ ...item, categoryName: category.name })));
        this.categoryDrafts = Object.fromEntries(
          this.categories.map(category => [category.categoryId, { ...category, restaurantId }])
        ) as Record<number, Partial<MenuCategory>>;
        this.itemDrafts = Object.fromEntries(
          this.allItems.map(item => [item.itemId, { ...item, restaurantId }])
        ) as Record<number, Partial<MenuItem>>;
        this.newCategory.restaurantId = restaurantId;
        this.newItem.restaurantId = restaurantId;
        this.errorMessage = '';
      },
      error: () => this.toast.error('Failed to load restaurant menu')
    });
  }

  reloadSelected(): void {
    if (this.selectedRestaurantId != null) {
      this.selectRestaurant(this.selectedRestaurantId);
    }
  }

  addCategory(): void {
    if (!this.selectedRestaurantId || !this.newCategory.name) {
      this.toast.warning('Category name is required');
      return;
    }

    const payload = {
      restaurantId: this.selectedRestaurantId,
      name: this.newCategory.name.trim(),
      description: this.emptyToNull(this.newCategory.description),
      imageUrl: this.emptyToNull(this.newCategory.imageUrl),
      displayOrder: this.newCategory.displayOrder != null ? Number(this.newCategory.displayOrder) : 0
    };

    this.menuSvc.addCategory(payload).subscribe({
      next: () => {
        this.toast.success('Category added');
        this.newCategory = this.defaultCategory(this.selectedRestaurantId ?? undefined);
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to add category')
    });
  }

  saveCategory(category: MenuCategory): void {
    const draft = this.categoryDrafts[category.categoryId];
    if (!draft) return;
    this.menuSvc.updateCategory(category.categoryId, draft).subscribe({
      next: () => {
        this.toast.success('Category updated');
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to update category')
    });
  }

  deleteCategory(category: MenuCategory): void {
    if (!confirm(`Delete category "${category.name}"? All items in it will be removed.`)) return;
    this.menuSvc.deleteCategory(category.categoryId, category.restaurantId).subscribe({
      next: () => {
        this.toast.success('Category deleted');
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to delete category')
    });
  }

  addItem(): void {
    if (!this.selectedRestaurantId || !this.newItem.categoryId || !this.newItem.name || this.newItem.price == null || this.newItem.isVeg == null) {
      this.toast.warning('Please complete item name, category, price, and veg/non-veg');
      return;
    }

    const payload = {
      restaurantId: this.selectedRestaurantId,
      categoryId: Number(this.newItem.categoryId),
      name: this.newItem.name.trim(),
      description: this.emptyToNull(this.newItem.description),
      price: Number(this.newItem.price),
      discountedPrice: this.newItem.discountedPrice != null ? Number(this.newItem.discountedPrice) : undefined,
      imageUrl: this.emptyToNull(this.newItem.imageUrl),
      tags: this.emptyToNull(this.newItem.tags),
      calories: this.newItem.calories != null ? Number(this.newItem.calories) : undefined,
      isVeg: !!this.newItem.isVeg
    };

    this.menuSvc.addItem(payload).subscribe({
      next: () => {
        this.toast.success('Menu item added');
        this.resetItemForm();
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to add item')
    });
  }

  saveItem(item: MenuItem): void {
    const draft = this.itemDrafts[item.itemId];
    if (!draft) return;
    this.menuSvc.updateItem(item.itemId, draft).subscribe({
      next: () => {
        this.toast.success('Item updated');
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to update item')
    });
  }

  toggleAvailability(item: MenuItem): void {
    const nextAvailability = !item.isAvailable;
    this.menuSvc.toggleAvailability(item.itemId, item.restaurantId).subscribe({
      next: () => {
        item.isAvailable = nextAvailability;
        this.toast.success(`Item ${nextAvailability ? 'shown' : 'hidden'}`);
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to toggle availability')
    });
  }

  deleteItem(item: MenuItem): void {
    if (!confirm(`Delete item "${item.name}"?`)) return;
    this.menuSvc.deleteItem(item.itemId, item.restaurantId).subscribe({
      next: () => {
        this.toast.success('Item deleted');
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to delete item')
    });
  }

  toggleRestaurantOpen(): void {
    if (!this.selectedRestaurant) return;
    const nextState = !this.selectedRestaurant.isOpen;
    this.restaurantSvc.toggleOpen(this.selectedRestaurant.restaurantId).subscribe({
      next: () => {
        this.selectedRestaurant!.isOpen = nextState;
        this.toast.success(`Restaurant ${nextState ? 'opened' : 'closed'}`);
        this.reloadSelected();
      },
      error: err => this.toast.error(err?.error?.message || 'Failed to toggle restaurant status')
    });
  }

  categoryNameById(categoryId: number): string {
    return this.categories.find(category => category.categoryId === categoryId)?.name || 'Category';
  }

  resetItemForm(): void {
    this.newItem = this.defaultItem(this.selectedRestaurantId || undefined);
  }

  private defaultCategory(restaurantId?: number): Partial<MenuCategory> {
    return {
      restaurantId: restaurantId ?? 0,
      name: '',
      description: '',
      displayOrder: 0
    };
  }

  private defaultItem(restaurantId?: number): Partial<MenuItem> {
    return {
      restaurantId: restaurantId ?? 0,
      categoryId: 0,
      name: '',
      description: '',
      price: 0,
      discountedPrice: undefined,
      imageUrl: '',
      isVeg: true,
      isAvailable: true,
      calories: 0,
      tags: ''
    };
  }

  private emptyToNull(value: unknown): string | undefined {
    if (value == null) return undefined;
    const trimmed = String(value).trim();
    return trimmed.length ? trimmed : undefined;
  }
}
