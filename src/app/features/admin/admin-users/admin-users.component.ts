import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Manage Users</h1>
    <p>View platform accounts, change roles, and control access</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div class="toolbar card">
    <input class="input" [(ngModel)]="searchTerm" placeholder="Search by name or email" (keyup.enter)="applyFilters()" />
    <select class="input" [(ngModel)]="roleFilter" (change)="applyFilters()">
      <option value="">All roles</option>
      <option value="CUSTOMER">Customer</option>
      <option value="OWNER">Owner</option>
      <option value="AGENT">Agent</option>
      <option value="ADMIN">Admin</option>
    </select>
    <button class="btn btn-primary" (click)="applyFilters()">Search</button>
    <button class="btn btn-ghost" (click)="resetFilters()">Reset</button>
  </div>

  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Users unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="card" style="padding:20px">
    <div class="flex justify-between items-center" style="margin-bottom:14px">
      <div>
        <h3 style="margin:0 0 4px">Users</h3>
        <p class="text-muted" style="margin:0">{{ filteredUsers.length }} record(s)</p>
      </div>
      <a routerLink="/admin" class="btn btn-ghost">Back to dashboard</a>
    </div>

    <div class="table-wrap" *ngIf="filteredUsers.length; else noUsers">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Role</th>
            <th>Status</th>
            <th>Provider</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of filteredUsers">
            <td>
              <div class="cell-title">{{ user.fullName }}</div>
              <div class="cell-sub">{{ user.userId }}</div>
            </td>
            <td>
              <div>{{ user.email }}</div>
              <div class="cell-sub">{{ user.phone }}</div>
            </td>
            <td>{{ user.role }}</td>
            <td>
              <span class="status-pill" [class.inactive]="!user.isActive">
                {{ user.isActive ? 'Active' : 'Suspended' }}
              </span>
            </td>
            <td>{{ user.provider || 'LOCAL' }}</td>
            <td>
              <div class="actions">
                <button class="btn btn-sm btn-ghost" (click)="toggleActive(user)">
                  {{ user.isActive ? 'Suspend' : 'Reactivate' }}
                </button>
                <button class="btn btn-sm btn-danger" (click)="removeUser(user)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ng-template #noUsers>
      <div class="empty-state" style="padding:40px 0">
        <div class="empty-icon">👥</div>
        <div class="empty-title">No users found</div>
        <div class="empty-desc">Try clearing filters or register a new account.</div>
      </div>
    </ng-template>
  </div>
</div>
  `,
  styles: [`
.toolbar{display:grid;grid-template-columns:minmax(0,1fr) 220px auto auto;gap:12px;padding:16px;margin-bottom:20px;align-items:center}
.table-wrap{overflow:auto}
.admin-table{width:100%;border-collapse:collapse}
.admin-table th,.admin-table td{padding:14px 10px;border-bottom:1px solid var(--border-color);text-align:left;vertical-align:top}
.admin-table th{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.cell-title{font-weight:700}
.cell-sub{font-size:.78rem;color:var(--text-muted);margin-top:2px}
.actions{display:flex;flex-direction:column;gap:8px}
.status-pill{display:inline-flex;padding:6px 10px;border-radius:999px;background:rgba(34,197,94,.12);color:#15803d;font-size:.78rem;font-weight:700}
.status-pill.inactive{background:rgba(100,116,139,.14);color:#475569}
@media (max-width: 900px){
  .toolbar{grid-template-columns:1fr 1fr}
  .toolbar .btn{width:100%}
}
@media (max-width: 640px){
  .toolbar{grid-template-columns:1fr}
  .admin-table th,.admin-table td{padding:12px 8px}
  .actions{width:100%}
  .actions .btn{width:100%}
}
  `]
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  roleFilter = '';
  errorMessage = '';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const role = this.roleFilter ? (this.roleFilter as User['role']) : undefined;
    this.auth.getAllUsers(role).subscribe({
      next: users => {
        this.users = users;
        this.filteredUsers = users;
        this.applyTextFilter();
        this.errorMessage = '';
      },
      error: () => {
        this.users = [];
        this.filteredUsers = [];
        this.errorMessage = 'Could not load users right now.';
      }
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim();
    if (term) {
      this.auth.searchUsers(term).subscribe({
        next: users => {
          this.users = users;
          this.filteredUsers = this.filterByRole(users);
        },
        error: () => this.errorMessage = 'Search failed. Please try again.'
      });
      return;
    }

    this.loadUsers();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.roleFilter = '';
    this.loadUsers();
  }

  toggleActive(user: User): void {
    const request$ = user.isActive ? this.auth.suspendUser(user.userId) : this.auth.reactivateUser(user.userId);
    request$.subscribe({
      next: () => {
        user.isActive = !user.isActive;
      },
      error: () => this.errorMessage = `Could not update status for ${user.fullName}.`
    });
  }

  removeUser(user: User): void {
    const ok = confirm(`Delete ${user.fullName}? This action cannot be undone.`);
    if (!ok) {
      return;
    }

    this.auth.deleteUser(user.userId).subscribe({
      next: () => {
        this.users = this.users.filter(item => item.userId !== user.userId);
        this.filteredUsers = this.filteredUsers.filter(item => item.userId !== user.userId);
      },
      error: () => this.errorMessage = `Could not delete ${user.fullName}.`
    });
  }

  private filterByRole(users: User[]): User[] {
    return this.roleFilter ? users.filter(user => user.role === this.roleFilter) : users;
  }

  private applyTextFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const filtered = term
      ? this.users.filter(user =>
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term))
      : [...this.users];
    this.filteredUsers = this.filterByRole(filtered);
  }
}
