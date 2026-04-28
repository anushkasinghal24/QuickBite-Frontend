import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/api.services';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/ui.services';
import { Notification } from '../../core/models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="page-header"><div class="container"><h1>Notifications 🔔</h1></div></div>
<div class="container" style="padding:32px 0 64px">
  <div style="max-width:680px;margin:0 auto">
    <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
      <div class="empty-icon">🔔</div>
      <div class="empty-title">Notifications unavailable</div>
      <div class="empty-desc">{{ errorMessage }}</div>
    </div>

    <div class="flex justify-between items-center" style="margin-bottom:20px">
      <p class="text-muted">{{ unreadCount }} unread notification{{ unreadCount !== 1 ? 's' : '' }}</p>
      <button class="btn btn-ghost btn-sm" (click)="markAllRead()" *ngIf="unreadCount">✅ Mark all read</button>
    </div>

    <div *ngIf="notifications.length; else noNotif">
      <div *ngFor="let n of notifications" class="notif-item card animate-fadeInUp"
           [class.unread]="!n.isRead" (click)="markRead(n)">
        <div class="notif-icon" [ngClass]="getNotifClass(n.type)">{{ getNotifIcon(n.type) }}</div>
        <div class="notif-body">
          <div class="notif-title">{{ n.title }}</div>
          <div class="notif-msg">{{ n.message }}</div>
          <div class="notif-time text-xs text-muted">{{ n.sentAt | date:'medium' }}</div>
        </div>
        <div class="unread-dot" *ngIf="!n.isRead"></div>
      </div>
    </div>

    <ng-template #noNotif>
      <div class="empty-state" style="padding:80px 0">
        <div class="empty-icon">🔔</div>
        <div class="empty-title">No notifications</div>
        <div class="empty-desc">You're all caught up! Notifications about your orders will appear here.</div>
      </div>
    </ng-template>
  </div>
</div>
  `,
  styles: [`
.notif-item{display:flex;align-items:flex-start;gap:14px;padding:16px;margin-bottom:10px;cursor:pointer;transition:all var(--transition-fast);border-radius:var(--border-radius-md);border:1px solid var(--border-color);background:var(--bg-card);
  &.unread{background:rgba(255,75,43,.03);border-color:rgba(255,75,43,.2);}
  &:hover{box-shadow:var(--shadow-sm);}
}
.notif-icon{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;
  &.order{background:rgba(59,130,246,.1);}
  &.payment{background:rgba(34,197,94,.1);}
  &.promo{background:rgba(255,167,38,.1);}
  &.delivery{background:rgba(255,75,43,.1);}
}
.notif-body{flex:1;}
.notif-title{font-weight:600;font-size:.9rem;margin-bottom:3px;}
.notif-msg{font-size:.82rem;color:var(--text-muted);line-height:1.5;margin-bottom:5px;}
.unread-dot{width:10px;height:10px;border-radius:50%;background:var(--brand-primary);flex-shrink:0;margin-top:4px;}
  `]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;
  errorMessage = '';
  get unreadCount() { return this.notifications.filter(n => !n.isRead).length; }

  constructor(private svc: NotificationService, public auth: AuthService, private toast: ToastService) {}

  ngOnInit() {
    if (this.auth.currentUser) {
      this.svc.getByRecipient(this.auth.currentUser.userId).subscribe({
        next: n => { this.notifications = n.sort((a,b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()); this.loading = false; this.errorMessage = ''; },
        error: () => { this.notifications = []; this.loading = false; this.errorMessage = 'Notifications are temporarily unavailable.'; }
      });
    }
  }

  markRead(n: Notification) {
    if (n.isRead) return;
    n.isRead = true;
    this.svc.markRead(n.notificationId).subscribe({ error: () => {} });
  }

  markAllRead() {
    if (!this.auth.currentUser) return;
    this.notifications.forEach(n => n.isRead = true);
    this.svc.markAllRead(this.auth.currentUser.userId).subscribe({ next: () => this.toast.success('All notifications marked as read'), error: () => {} });
  }

  getNotifIcon(type: string): string { return {ORDER:'📦',PAYMENT:'💳',PROMO:'🎁',DELIVERY:'🛵'}[type] || '🔔'; }
  getNotifClass(type: string): string { return type.toLowerCase(); }
}
