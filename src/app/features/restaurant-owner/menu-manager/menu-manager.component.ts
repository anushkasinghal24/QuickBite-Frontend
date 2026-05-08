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
      <!-- ── Categories Section ── -->
      <div class="card section-card professional-card">
        <div class="section-head-pro">
          <div class="icon-box category-icon">📁</div>
          <div>
            <h3 class="section-title">Menu Categories</h3>
            <p class="section-subtitle">Organize your dishes into sections</p>
          </div>
        </div>

        <div class="pro-form-box">
          <div class="grid mini-grid">
            <div class="field-group">
              <label class="pro-label">Category Name</label>
              <div class="input-wrapper">
                <input class="pro-input" [(ngModel)]="newCategory.name" placeholder="e.g., Main Course, Desserts" />
              </div>
            </div>
            <div class="field-group">
              <label class="pro-label">Sort Order</label>
              <div class="input-wrapper">
                <input class="pro-input" [(ngModel)]="newCategory.displayOrder" type="number" placeholder="1" />
              </div>
            </div>
            <div class="field-group full">
              <label class="pro-label">Brief Description</label>
              <div class="input-wrapper">
                <textarea class="pro-input pro-textarea" [(ngModel)]="newCategory.description" placeholder="A short description for this category..."></textarea>
              </div>
            </div>
          </div>
          <div class="pro-form-actions">
            <button class="btn-pro btn-pro-primary" (click)="addCategory()">
              <span>+</span> Add Category
            </button>
          </div>
        </div>

        <div class="list-container">
          <div class="list-header">Existing Categories ({{categories.length}})</div>
          <div *ngIf="categories.length; else noCategories" class="pro-stack">
            <div class="pro-category-item" *ngFor="let category of categories">
              <div class="pro-item-header">
                <div class="pro-item-title">
                  <span class="pro-order-tag">{{ category.displayOrder }}</span>
                  {{ category.name }}
                </div>
                <div class="pro-item-badges">
                  <span class="pro-badge" [class.pro-badge-active]="category.isActive !== false">
                    {{ category.isActive !== false ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
              
              <!-- Inline Category Edit (Hidden by default, toggleable) -->
              <div class="pro-item-actions">
                <button class="btn-icon" title="Save Changes" (click)="saveCategory(category)">💾</button>
                <button class="btn-icon btn-icon-danger" title="Delete" (click)="deleteCategory(category)">🗑️</button>
              </div>
              
              <div class="pro-item-edit-grid">
                <input class="pro-input-sm" [(ngModel)]="categoryDrafts[category.categoryId].name" placeholder="Name" />
                <input class="pro-input-sm" style="width:60px" [(ngModel)]="categoryDrafts[category.categoryId].displayOrder" type="number" placeholder="Order" />
              </div>
            </div>
          </div>
          <ng-template #noCategories>
            <div class="pro-empty-state">No categories defined yet.</div>
          </ng-template>
        </div>
      </div>

      <!-- ── Add Menu Item Section ── -->
      <div class="card section-card professional-card">
        <div class="section-head-pro">
          <div class="icon-box item-icon">🍲</div>
          <div>
            <h3 class="section-title">Add Menu Item</h3>
            <p class="section-subtitle">Create a new dish for your menu</p>
          </div>
        </div>

        <div class="pro-form-box">
          <div class="grid pro-item-grid">
            <div class="field-group full">
              <label class="pro-label">Target Category</label>
              <div class="input-wrapper">
                <select class="pro-input pro-select" [(ngModel)]="newItem.categoryId">
                  <option [ngValue]="null">Choose a category...</option>
                  <option *ngFor="let category of categories" [ngValue]="category.categoryId">{{ category.name }}</option>
                </select>
              </div>
            </div>
            
            <div class="field-group">
              <label class="pro-label">Dish Name</label>
              <div class="input-wrapper">
                <input class="pro-input" [(ngModel)]="newItem.name" placeholder="e.g., Spicy Paneer Tikka" />
              </div>
            </div>
            
            <div class="field-group">
              <label class="pro-label">Base Price (₹)</label>
              <div class="input-wrapper">
                <input class="pro-input" [(ngModel)]="newItem.price" type="number" placeholder="0.00" />
              </div>
            </div>

            <div class="field-group">
              <label class="pro-label">Discount %</label>
              <div class="input-wrapper">
                <input class="pro-input" [(ngModel)]="newItem.discountPercent" type="number" placeholder="0" />
              </div>
            </div>

            <div class="field-group">
              <label class="pro-label">Dietary Type</label>
              <div class="input-wrapper pro-radio-group">
                <label class="pro-radio">
                  <input type="radio" [value]="true" [(ngModel)]="newItem.isVeg" name="itemType">
                  <span class="radio-label veg-label">Veg</span>
                </label>
                <label class="pro-radio">
                  <input type="radio" [value]="false" [(ngModel)]="newItem.isVeg" name="itemType">
                  <span class="radio-label nonveg-label">Non-Veg</span>
                </label>
              </div>
            </div>

            <div class="field-group full">
              <label class="pro-label">Dish Description</label>
              <div class="input-wrapper">
                <textarea class="pro-input pro-textarea" [(ngModel)]="newItem.description" placeholder="Describe the ingredients, taste, and presentation..."></textarea>
              </div>
            </div>

            <div class="field-group full">
              <label class="pro-label">Image URL</label>
              <div class="input-wrapper pro-image-input-row">
                <input class="pro-input" [(ngModel)]="newItem.imageUrl" placeholder="https://image-url.com/dish.jpg" />
                <div class="pro-image-preview" *ngIf="newItem.imageUrl">
                  <img [src]="newItem.imageUrl" (error)="newItem.imageUrl = undefined" alt="Preview">
                </div>
              </div>
              <div class="field-hint" *ngIf="!newItem.imageUrl">Provide a direct link to a high-quality dish image.</div>
            </div>

            <div class="field-group">
              <label class="pro-label">Calories</label>
              <div class="input-wrapper">
                <input class="pro-input" [(ngModel)]="newItem.calories" type="number" placeholder="e.g., 450" />
              </div>
            </div>

            <div class="field-group">
              <label class="pro-label">Tags</label>
              <div class="input-wrapper">
                <input class="pro-input" [(ngModel)]="newItem.tags" placeholder="e.g., Spicy, Best Seller" />
              </div>
            </div>
          </div>

          <div class="pro-form-actions-main">
            <button class="btn-pro btn-pro-primary" (click)="addItem()">
              Confirm & Add Dish
            </button>
            <button class="btn-pro btn-pro-ghost" (click)="resetItemForm()">Clear Form</button>
          </div>
        </div>
      </div>
    </div>

        <div class="menu-block">
          <div class="section-head" style="margin-bottom:12px">
            <h3 style="margin:0">Items</h3>
            <span class="badge">{{ allItems.length }}</span>
          </div>

          <div *ngIf="allItems.length; else noItems" class="stack">
            <div class="item-card" *ngFor="let item of allItems" [class.editing]="editingItems.has(item.itemId)">
              <!-- ── Top row: info + action buttons ── -->
              <div class="row-top">
                <div class="item-info">
                  <div class="title">{{ item.name }}</div>
                  <div class="meta">
                    <span class="meta-tag">{{ item.categoryName || categoryNameById(item.categoryId) }}</span>
                    <span class="meta-dot">·</span>
                    <span class="meta-tag" [class.veg]="item.isVeg" [class.nonveg]="!item.isVeg">{{ item.isVeg ? '🟢 Veg' : '🔴 Non-Veg' }}</span>
                    <span class="meta-dot">·</span>
                    <span class="meta-price">₹{{ item.effectivePrice || item.price }}</span>
                    <span *ngIf="item.discountedPrice" class="meta-discount">({{ discountPercentFrom(item.price, item.discountedPrice) }}% off)</span>
                  </div>
                </div>
                <div class="badge-stack">
                  <span class="pill small" [class.offline]="!item.isAvailable">{{ item.isAvailable ? 'Available' : 'Hidden' }}</span>
                  <span class="order-pill">#{{ item.itemId }}</span>
                  <button class="btn-edit-toggle" [class.active]="editingItems.has(item.itemId)" (click)="toggleItemEdit(item.itemId)">
                    <span *ngIf="!editingItems.has(item.itemId)">✏️ Edit</span>
                    <span *ngIf="editingItems.has(item.itemId)">✕ Close</span>
                  </button>
                </div>
              </div>

              <!-- ── Quick actions (always visible) ── -->
              <div class="quick-actions">
                <button class="btn btn-secondary btn-sm" (click)="toggleAvailability(item)">
                  {{ item.isAvailable ? '👁 Hide' : '👁 Show' }}
                </button>
                <button class="btn btn-danger btn-sm" (click)="deleteItem(item)">🗑 Delete</button>
              </div>

              <!-- ── Collapsible Edit Form ── -->
              <div class="edit-panel" *ngIf="editingItems.has(item.itemId)">
                <div class="edit-panel-header">Edit Item Details</div>
                <div class="grid edit-grid">
                  <label class="field">
                    <span>Name</span>
                    <input class="input" [(ngModel)]="itemDrafts[item.itemId].name" />
                  </label>
                  <label class="field">
                    <span>Price (₹)</span>
                    <input class="input" [(ngModel)]="itemDrafts[item.itemId].price" type="number" />
                  </label>
                  <label class="field">
                    <span>Discount %</span>
                    <input class="input" [(ngModel)]="itemDrafts[item.itemId].discountPercent" type="number" placeholder="0" />
                  </label>
                  <label class="field">
                    <span>Category</span>
                    <select class="input" [(ngModel)]="itemDrafts[item.itemId].categoryId">
                      <option *ngFor="let category of categories" [ngValue]="category.categoryId">{{ category.name }}</option>
                    </select>
                  </label>
                  <label class="field full">
                    <span>Description</span>
                    <input class="input" [(ngModel)]="itemDrafts[item.itemId].description" />
                  </label>
                  <label class="field">
                    <span>Image URL</span>
                    <input class="input" [(ngModel)]="itemDrafts[item.itemId].imageUrl" placeholder="https://..." />
                  </label>
                  <label class="field">
                    <span>Tags</span>
                    <input class="input" [(ngModel)]="itemDrafts[item.itemId].tags" placeholder="spicy,bestseller" />
                  </label>
                  <label class="field">
                    <span>Calories</span>
                    <input class="input" [(ngModel)]="itemDrafts[item.itemId].calories" type="number" placeholder="320" />
                  </label>
                  <label class="field">
                    <span>Type</span>
                    <select class="input" [(ngModel)]="itemDrafts[item.itemId].isVeg">
                      <option [ngValue]="true">Veg</option>
                      <option [ngValue]="false">Non-Veg</option>
                    </select>
                  </label>
                </div>
                <div class="section-actions" style="margin-top:12px">
                  <button class="btn btn-primary btn-sm" (click)="saveItem(item); toggleItemEdit(item.itemId)">💾 Save Changes</button>
                  <button class="btn btn-ghost btn-sm" (click)="toggleItemEdit(item.itemId)">Cancel</button>
                </div>
              </div>
            </div>
          </div>

          <ng-template #noItems>
            <div class="empty-copy">No menu items yet. Add your first dish above.</div>
          </ng-template>
        </div>
  </ng-container>
</div>
  `,
  styles: [`
/* Professional Redesign Styles */
.professional-card {
  border: none;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
}

.section-head-pro {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.category-icon { background: #eff6ff; border: 1px solid #dbeafe; }
.item-icon { background: #fef2f2; border: 1px solid #fee2e2; }

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.pro-form-box {
  padding: 24px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pro-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
}

.input-wrapper {
  position: relative;
}

.pro-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.2s;
  background: #fff;
}

.pro-input:focus {
  outline: none;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 4px rgba(255,75,43,0.1);
}

.pro-textarea {
  min-height: 80px;
  resize: vertical;
}

.pro-image-input-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.pro-image-preview {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  flex-shrink: 0;
}

.pro-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.field-hint {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 4px;
}

.pro-select {
  appearance: none;
  cursor: pointer;
}

.pro-radio-group {
  display: flex;
  gap: 16px;
  padding: 8px 0;
}

.pro-radio {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.veg-label { color: #16a34a; }
.nonveg-label { color: #dc2626; }

.pro-form-actions, .pro-form-actions-main {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}

.btn-pro {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-pro-primary {
  background: var(--brand-primary);
  color: #fff;
  box-shadow: 0 4px 14px rgba(255,75,43,0.3);
}

.btn-pro-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255,75,43,0.4);
}

.btn-pro-ghost {
  background: #f1f5f9;
  color: #475569;
}

.btn-pro-ghost:hover {
  background: #e2e8f0;
}

.list-container {
  padding: 0 24px 24px;
}

.list-header {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-header::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #f1f5f9;
}

.pro-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pro-category-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
}

.pro-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pro-item-title {
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pro-order-tag {
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  color: #64748b;
}

.pro-badge {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
  background: #f1f5f9;
  color: #64748b;
}

.pro-badge-active {
  background: #dcfce7;
  color: #15803d;
}

.pro-item-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.btn-icon {
  background: #fff;
  border: 1px solid #e2e8f0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
}

.btn-icon-danger { color: #ef4444; }

.pro-item-edit-grid {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.pro-input-sm {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.85rem;
}

.pro-empty-state {
  text-align: center;
  padding: 32px;
  color: #94a3b8;
  font-size: 0.9rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.pro-item-grid {
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* Original Card Styles for Items (from previous edit) */
.section-card{padding:20px}
.section-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:16px}
.restaurant-switcher{display:flex;flex-wrap:wrap;gap:10px}
.switch-btn{padding:10px 14px;border-radius:999px;border:1px solid var(--border-color);background:var(--bg-card);font-weight:600;cursor:pointer}
.switch-btn.active{border-color:var(--brand-primary);background:rgba(255,75,43,.08);color:var(--brand-primary)}
.selected-actions,.section-actions{display:flex;gap:10px;flex-wrap:wrap}
.dual-grid{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.mini-form{border:1px solid var(--border-color);border-radius:18px;padding:16px;background:linear-gradient(180deg,rgba(248,250,252,.86),rgba(255,255,255,.95));margin-bottom:16px;box-shadow:0 10px 30px rgba(15,23,42,.04)}
.form-hint{font-size:.8rem;color:var(--text-muted);margin-bottom:12px}
.mini-grid,.item-grid,.edit-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.full{grid-column:1 / -1}
.stack{display:flex;flex-direction:column;gap:12px}
.category-card,.item-card{border:1px solid var(--border-color);border-radius:18px;padding:16px;background:var(--bg-card);box-shadow:0 8px 24px rgba(15,23,42,.04);transition:box-shadow .2s}
.item-card.editing{border-color:var(--brand-primary);box-shadow:0 0 0 2px rgba(255,75,43,.15),0 8px 24px rgba(15,23,42,.08)}
.row-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.item-info{flex:1;min-width:0}
.title{font-weight:800}
.meta{font-size:.84rem;color:var(--text-muted);margin-top:4px;display:flex;flex-wrap:wrap;align-items:center;gap:4px}
.meta-dot{color:var(--border-color)}
.meta-price{font-weight:700;color:var(--text-primary)}
.meta-discount{color:#22c55e;font-weight:600;font-size:.78rem}
.meta-tag.veg{color:#16a34a}
.meta-tag.nonveg{color:#dc2626}
.pill{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.1);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.pill.small{padding:5px 10px;font-size:.72rem}
.pill.offline{background:rgba(100,116,139,.12);color:#475569}
.badge-stack{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.order-pill{padding:5px 10px;border-radius:999px;background:#f8fafc;border:1px solid var(--border-color);color:var(--text-muted);font-size:.72rem;font-weight:700}
.badge{min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--brand-primary);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700}
.btn-edit-toggle{display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:999px;border:1.5px solid var(--brand-primary);background:transparent;color:var(--brand-primary);font-size:.78rem;font-weight:700;cursor:pointer;transition:all .18s}
.btn-edit-toggle:hover,.btn-edit-toggle.active{background:var(--brand-primary);color:#fff}
.quick-actions{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:0}
.edit-panel{margin-top:16px;padding:16px;border-radius:14px;background:linear-gradient(135deg,rgba(255,75,43,.03),rgba(248,250,252,.9));border:1px solid rgba(255,75,43,.15);animation:slideDown .2s ease}
.edit-panel-header{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--brand-primary);margin-bottom:12px}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.empty-copy{color:var(--text-muted);padding:10px 0}
.link-inline{color:var(--brand-primary);font-weight:700;text-decoration:none}
.field{display:flex;flex-direction:column;gap:6px}
.field span{font-size:.76rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em}
.field .input{width:100%}
  `]
})
export class MenuManagerComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurantId: number | null = null;
  selectedRestaurant: Restaurant | null = null;
  categories: MenuCategory[] = [];
  allItems: MenuItem[] = [];
  errorMessage = '';

  /** Tracks which item IDs have their edit panel open */
  editingItems = new Set<number>();

  newCategory: Partial<MenuCategory> = this.defaultCategory();
  newItem: Partial<MenuItem> = this.defaultItem();
  categoryDrafts: Record<number, Partial<MenuCategory>> = {};
  itemDrafts: Record<number, Partial<MenuItem>> = {};

  constructor(
    private restaurantSvc: RestaurantService,
    private menuSvc: MenuService,
    public auth: AuthService,
    private toast: ToastService
  ) { }

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
        this.allItems = this.categories.flatMap(category => this.getCategoryItems(category).map(item => ({ ...item, categoryName: category.name })));
        this.categoryDrafts = Object.fromEntries(
          this.categories.map(category => [category.categoryId, { ...category, restaurantId }])
        ) as Record<number, Partial<MenuCategory>>;
        this.itemDrafts = Object.fromEntries(
          this.allItems.map(item => [item.itemId, { ...item, restaurantId, discountPercent: this.discountPercentFrom(item.price, item.discountedPrice) }])
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

  /** Toggle the edit panel open/closed for a specific menu item */
  toggleItemEdit(itemId: number): void {
    if (this.editingItems.has(itemId)) {
      this.editingItems.delete(itemId);
    } else {
      this.editingItems.add(itemId);
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
      discountedPrice: this.discountedPriceFromPercent(this.newItem.price, this.newItem.discountPercent),
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
    const payload = {
      ...draft,
      price: draft.price != null ? Number(draft.price) : item.price,
      discountedPrice: this.discountedPriceFromPercent(
        draft.price != null ? Number(draft.price) : item.price,
        draft.discountPercent ?? this.discountPercentFrom(item.price, item.discountedPrice)
      )
    };
    this.menuSvc.updateItem(item.itemId, payload).subscribe({
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

  getCategoryItems(category: MenuCategory): MenuItem[] {
    return category.menuItems || category.items || [];
  }

  getCategoryItemCount(category: MenuCategory): number {
    return category.itemCount ?? this.getCategoryItems(category).length;
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
      discountPercent: undefined,
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

  discountPercentFrom(price?: number, discountedPrice?: number): number | undefined {
    const base = Number(price);
    const finalPrice = discountedPrice == null ? undefined : Number(discountedPrice);
    if (!Number.isFinite(base) || base <= 0 || finalPrice == null || !Number.isFinite(finalPrice) || finalPrice <= 0 || finalPrice >= base) {
      return undefined;
    }
    return Math.round((1 - finalPrice / base) * 100);
  }

  private discountedPriceFromPercent(price?: number, discountPercent?: number): number | undefined {
    const base = Number(price);
    const percent = discountPercent == null ? undefined : Number(discountPercent);
    if (!Number.isFinite(base) || base <= 0 || percent == null || !Number.isFinite(percent) || percent <= 0) {
      return undefined;
    }
    const normalized = Math.min(Math.max(percent, 0), 100);
    return Math.round(base * (1 - normalized / 100) * 100) / 100;
  }
}
