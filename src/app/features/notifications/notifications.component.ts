import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { NotificationService } from '../../core/services/api.services';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/ui.services';
import { Notification } from '../../core/models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="page-header"><div class="container"><h1>Notifications</h1></div></div>
<div class="container" style="padding:32px 0 64px">
  <div style="max-width:680px;margin:0 auto">
    <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
      <div class="empty-icon">N</div>
      <div class="empty-title">Notifications unavailable</div>
      <div class="empty-desc">{{ errorMessage }}</div>
    </div>

    <div class="flex justify-between items-center" style="margin-bottom:20px;gap:12px;flex-wrap:wrap">
      <p class="text-muted">{{ unreadCount }} unread notification{{ unreadCount !== 1 ? 's' : '' }}</p>
      <div class="flex" style="gap:8px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" (click)="refreshNow()">Refresh</button>
        <button class="btn btn-ghost btn-sm" (click)="markAllRead()" *ngIf="unreadCount">Mark all read</button>
      </div>
    </div>

    <div *ngIf="notifications.length; else noNotif">
      <div *ngFor="let n of notifications" class="notif-item card animate-fadeInUp"
           [class.unread]="!n.isRead" (click)="openNotification(n)">
        <div class="notif-icon" [ngClass]="getNotifClass(n.type)">{{ getNotifIcon(n.type) }}</div>
        <div class="notif-body">
          <div class="notif-head">
            <div class="notif-title">{{ getDisplayTitle(n) }}</div>
            <span class="notif-chip">{{ getChannelLabel(n.channel) }}</span>
            <span class="notif-chip" *ngIf="n.audible">Audio</span>
          </div>
          <div class="notif-msg">{{ getDisplayMessage(n) }}</div>
          <div class="notif-meta">
            <span *ngIf="n.relatedType">{{ n.relatedType }}</span>
            <span *ngIf="n.relatedId">#{{ n.relatedId }}</span>
            <button *ngIf="getNotificationTarget(n)" class="notif-link" type="button" (click)="openNotification(n, $event)">Open</button>
          </div>
          <div class="notif-actions">
            <button class="btn btn-ghost btn-sm" *ngIf="!n.isRead" (click)="markRead(n); $event.stopPropagation()">
              Mark read
            </button>
            <span class="read-label" *ngIf="n.isRead">Read</span>
          </div>
          <div class="notif-time text-xs text-muted">{{ n.sentAt | date:'medium' }}</div>
        </div>
        <div class="unread-dot" *ngIf="!n.isRead"></div>
      </div>
    </div>

    <ng-template #noNotif>
      <div class="empty-state" style="padding:80px 0">
        <div class="empty-icon">N</div>
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
.notif-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px}
.notif-chip{font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:999px;background:var(--bg-input);color:var(--text-secondary);text-transform:uppercase;letter-spacing:.04em}
.notif-icon{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:700;flex-shrink:0;
  &.order{background:rgba(59,130,246,.1);}
  &.payment{background:rgba(34,197,94,.1);}
  &.promo{background:rgba(255,167,38,.1);}
  &.delivery{background:rgba(255,75,43,.1);}
  &.new_order_alert{background:rgba(99,102,241,.1);}
}
.notif-body{flex:1;}
.notif-title{font-weight:600;font-size:.95rem;line-height:1.35;margin-bottom:3px;color:var(--text-primary);}
.notif-msg{font-size:.82rem;color:var(--text-muted);line-height:1.5;margin-bottom:5px;}
.notif-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.72rem;color:var(--text-muted)}
.notif-link{margin-left:auto;font-size:.78rem;font-weight:700;color:var(--brand-primary)}
.notif-link{background:none;border:none;padding:0;cursor:pointer}
.notif-actions{display:flex;align-items:center;gap:10px;margin-top:4px}
.read-label{font-size:.74rem;font-weight:700;color:#15803d;background:rgba(34,197,94,.12);padding:4px 8px;border-radius:999px}
.unread-dot{width:10px;height:10px;border-radius:50%;background:var(--brand-primary);flex-shrink:0;margin-top:4px;}
  `]
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = true;
  errorMessage = '';
  private pollSub = new Subscription();
  private seenIds = new Set<number>();
  get unreadCount() { return this.notifications.filter(n => !n.isRead).length; }

  constructor(
    private svc: NotificationService,
    public auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.currentUser) return;
    this.refreshNotifications(false);
    this.pollSub = interval(30000).subscribe(() => this.refreshNotifications(true));
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

  openNotification(n: Notification, event?: Event) {
    event?.stopPropagation();
    if (!n.isRead) {
      n.isRead = true;
      this.markRead(n);
    }
    const target = this.getNotificationTarget(n);
    if (target) {
      this.router.navigateByUrl(target).catch(() => {});
    }
  }

  refreshNow() {
    this.refreshNotifications(false);
  }

  getNotifIcon(type: string): string {
    return { ORDER: 'O', NEW_ORDER_ALERT: 'N', PAYMENT: 'P', PROMO: '%', DELIVERY: 'D' }[type] || 'N';
  }

  getNotifClass(type: string): string {
    return (type || 'notification').toLowerCase();
  }

  getChannelLabel(channel?: string): string {
    return channel || 'APP';
  }

  getDisplayTitle(n: Notification): string {
    const cleanTitle = this.cleanText(n.title);
    if (cleanTitle) return cleanTitle;

    const message = this.cleanText(n.message).toLowerCase();
    if (message.includes('confirmed')) return 'Order Confirmed';
    if (message.includes('picked up')) return 'Order Picked Up';
    if (message.includes('prepared')) return 'Food is Being Prepared';
    if (message.includes('delivered')) return 'Order Delivered';
    if (message.includes('payment')) return 'Payment Update';
    if (message.includes('offer') || message.includes('promo')) return 'New Offer';

    switch ((n.type || '').toUpperCase()) {
      case 'ORDER':
      case 'NEW_ORDER_ALERT':
        return 'Order Update';
      case 'PAYMENT':
        return 'Payment Update';
      case 'PROMO':
        return 'Promotion';
      case 'DELIVERY':
        return 'Delivery Update';
      default:
        return 'Notification';
    }
  }

  getDisplayMessage(n: Notification): string {
    return this.normalizeMessage(n.message);
  }

  private refreshNotifications(checkForNew: boolean) {
    if (!this.auth.currentUser) return;

    this.svc.getByRecipient(this.auth.currentUser.userId).subscribe({
      next: n => {
        const sorted = n
          .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
          .slice(0, 20);
        this.handleNewNotifications(sorted, checkForNew);
        this.notifications = sorted;
        this.loading = false;
        this.errorMessage = '';
      },
      error: () => {
        this.notifications = [];
        this.loading = false;
        this.errorMessage = 'Notifications are temporarily unavailable.';
      }
    });
  }

  private handleNewNotifications(nextList: Notification[], checkForNew: boolean) {
    if (!checkForNew) {
      this.seenIds = new Set(nextList.map(n => n.notificationId));
      return;
    }

    const newItems = nextList.filter(n => !this.seenIds.has(n.notificationId));
    this.seenIds = new Set(nextList.map(n => n.notificationId));

    if (!newItems.length) return;

    const loudItems = newItems.filter(n => n.audible || n.type === 'ORDER');
    if (loudItems.length) {
      this.playTone();
      this.toast.info(`New notification${newItems.length > 1 ? 's' : ''} received`);
    }
  }

  getNotificationTarget(n: Notification): string | null {
    const type = (n.type || n.relatedType || '').toUpperCase();
    if ((type === 'ORDER' || type === 'NEW_ORDER_ALERT' || type === 'DELIVERY') && n.relatedId) {
      return `/orders/${n.relatedId}`;
    }
    if (type === 'PAYMENT' || n.relatedType === 'PAYMENT') {
      return '/wallet';
    }
    if (n.relatedType === 'RESTAURANT' && n.relatedId) return `/restaurants/${n.relatedId}`;
    const deepLink = this.normalizeLink(n.deepLinkUrl);
    if (deepLink) return deepLink;
    if (n.relatedType === 'SYSTEM') return '/notifications';
    return null;
  }

  private resolveFallbackLink(n: Notification): string | null {
    if (n.relatedType === 'ORDER' && n.relatedId) return `/orders/${n.relatedId}`;
    if (n.relatedType === 'PAYMENT') return '/wallet';
    if (n.relatedType === 'RESTAURANT' && n.relatedId) return `/restaurants/${n.relatedId}`;
    if (n.relatedType === 'SYSTEM') return '/notifications';
    return null;
  }

  normalizeLink(link?: string | null): string | null {
    const value = (link || '').trim();
    if (!value) return null;
    return value.startsWith('/') ? value : `/${value}`;
  }

  private cleanText(value?: string): string {
    return (value || '')
      .replace(/[^\x20-\x7E]+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,!?;:])/g, '$1')
      .trim();
  }

  private normalizeMessage(value?: string): string {
    return (value || '')
      .replace(/Ã¢â€šÂ¹|Ã¢â‚¬Â¹|Ã¢â‚¬Å¡Â¹|â‚¹|Â₹/g, '₹')
      .replace(/Ã¢â‚¬â„¢/g, "'")
      .replace(/Ã¢â‚¬â€|â€“|Ã¢â‚¬â€œ/g, '-')
      .replace(/\s+\./g, '.')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private playTone() {
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextCtor) return;
      const ctx = new AudioContextCtor();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = 760;
      gain.gain.value = 0.05;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      window.setTimeout(() => {
        oscillator.stop();
        ctx.close().catch(() => {});
      }, 220);
    } catch {
      // Best-effort only.
    }
  }

  ngOnDestroy() {
    this.pollSub.unsubscribe();
  }
}
