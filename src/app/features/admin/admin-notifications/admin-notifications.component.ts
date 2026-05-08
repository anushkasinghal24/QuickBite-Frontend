import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../core/services/api.services';
import { ToastService } from '../../../core/services/ui.services';
import { BulkNotificationRequest, Notification } from '../../../core/models';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Platform Notifications</h1>
    <p>Broadcast announcements and inspect live notification delivery</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Notifications unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid admin-grid" style="margin-bottom:24px">
    <div class="card stat-card">
      <div class="stat-label">Total</div>
      <div class="stat-value">{{ allNotifications.length }}</div>
      <div class="stat-note">Platform-wide records</div>
    </div>
    <div class="card stat-card">
      <div class="stat-label">Unread</div>
      <div class="stat-value">{{ unreadCount }}</div>
      <div class="stat-note">Still open in the app</div>
    </div>
    <div class="card stat-card">
      <div class="stat-label">Audible</div>
      <div class="stat-value">{{ audibleCount }}</div>
      <div class="stat-note">Urgent notifications</div>
    </div>
    <div class="card stat-card">
      <div class="stat-label">Channels</div>
      <div class="stat-value">{{ channelCount }}</div>
      <div class="stat-note">APP / EMAIL / SMS / ALL</div>
    </div>
  </div>

  <div class="grid two-up">
    <div class="card panel">
      <div class="panel-head">
        <div>
          <h3 style="margin:0 0 4px">Broadcast notification</h3>
          <p class="text-muted" style="margin:0">Send a platform-wide message to one role or everyone.</p>
        </div>
        <a routerLink="/admin" class="btn btn-ghost btn-sm">Back</a>
      </div>

      <div class="grid form-grid">
        <div class="form-field">
          <label>Title</label>
          <input class="input" [(ngModel)]="form.title" placeholder="Maintenance alert" />
        </div>
        <div class="form-field">
          <label>Type</label>
          <select class="input" [(ngModel)]="form.type">
            <option value="PROMO">PROMO</option>
            <option value="SYSTEM">SYSTEM</option>
            <option value="ORDER">ORDER</option>
            <option value="PAYMENT">PAYMENT</option>
            <option value="DELIVERY">DELIVERY</option>
            <option value="NEW_ORDER_ALERT">NEW_ORDER_ALERT</option>
          </select>
        </div>
        <div class="form-field full">
          <label>Message</label>
          <textarea class="input" rows="4" [(ngModel)]="form.message" placeholder="Write the notification message"></textarea>
        </div>
        <div class="form-field">
          <label>Channel</label>
          <select class="input" [(ngModel)]="form.channel">
            <option value="APP">APP</option>
            <option value="EMAIL">EMAIL</option>
            <option value="SMS">SMS</option>
            <option value="ALL">ALL</option>
          </select>
        </div>
        <div class="form-field">
          <label>Target role</label>
          <select class="input" [(ngModel)]="form.targetRole">
            <option [ngValue]="null">All users</option>
            <option value="CUSTOMER">Customer</option>
            <option value="OWNER">Owner</option>
            <option value="AGENT">Agent</option>
          </select>
        </div>
        <div class="form-field">
          <label>Deep link</label>
          <input class="input" [(ngModel)]="form.deepLinkUrl" placeholder="/admin/analytics" />
        </div>
        <div class="form-field">
          <label>Related type</label>
          <input class="input" [(ngModel)]="form.relatedType" placeholder="SYSTEM" />
        </div>
        <div class="form-field">
          <label>Related id</label>
          <input class="input" type="number" [(ngModel)]="form.relatedId" />
        </div>
        <div class="form-field full">
          <label>Recipient ids comma separated</label>
          <input class="input" [(ngModel)]="recipientIdsText" placeholder="1,2,3 or leave empty for broadcast" />
        </div>
      </div>

      <div class="section-actions">
        <label class="check">
          <input type="checkbox" [(ngModel)]="form.broadcastAll" />
          Broadcast to all users
        </label>
        <button class="btn btn-primary" (click)="send()" [disabled]="sending">
          <span *ngIf="!sending">Send Broadcast</span>
          <span *ngIf="sending" class="spinner" style="width:16px;height:16px;border-width:2px"></span>
        </button>
      </div>
    </div>

    <div class="card panel">
      <div class="panel-head">
        <div>
          <h3 style="margin:0 0 4px">Latest notifications</h3>
          <p class="text-muted" style="margin:0">Open deep links and track delivery channel usage.</p>
        </div>
        <button class="btn btn-ghost btn-sm" (click)="loadNotifications()">Refresh</button>
      </div>

      <div *ngIf="allNotifications.length; else noNotif" class="stack">
        <div *ngFor="let n of allNotifications" class="notif-row">
          <div>
            <div class="notif-title">{{ normalizeText(n.title) }}</div>
            <div class="notif-meta">{{ normalizeText(n.type) }} · {{ normalizeText(n.channel) }} · {{ n.sentAt | date:'short' }}</div>
            <div class="notif-msg">{{ normalizeText(n.message) }}</div>
          </div>
          <div class="notif-actions">
            <span class="badge" [class.badge-warning]="n.audible">{{ n.audible ? 'Audio' : 'Silent' }}</span>
            <a *ngIf="normalizeLink(n.deepLinkUrl)" class="btn btn-ghost btn-sm" [routerLink]="normalizeLink(n.deepLinkUrl)">Open</a>
          </div>
        </div>
      </div>

      <ng-template #noNotif>
        <div class="empty-copy">No notifications found yet.</div>
      </ng-template>
    </div>
  </div>
</div>
  `,
  styles: [`
.admin-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;align-items:stretch}
.stat-card{padding:20px 18px;display:flex;flex-direction:column;gap:8px;min-height:112px}
.stat-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.stat-value{font-size:clamp(1.65rem,2.4vw,2rem);font-weight:800;line-height:1.05;overflow-wrap:anywhere}
.stat-note{font-size:.82rem;color:var(--text-muted);line-height:1.45;overflow-wrap:anywhere;margin-top:auto}
.two-up{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.panel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.form-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.form-field{display:flex;flex-direction:column;gap:6px}
.form-field.full{grid-column:1 / -1}
.form-field label{font-size:.82rem;font-weight:700;color:var(--text-muted)}
.section-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:18px}
.check{display:flex;align-items:center;gap:8px;font-weight:700;color:var(--text-muted)}
.stack{display:flex;flex-direction:column;gap:12px}
.notif-row{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:14px 0;border-bottom:1px solid var(--border-color)}
.notif-row:last-child{border-bottom:none;padding-bottom:0}
.notif-title{font-weight:800}
.notif-meta,.notif-msg{font-size:.84rem;color:var(--text-muted);margin-top:4px}
.notif-actions{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.empty-copy{color:var(--text-muted)}
@media (max-width: 900px){
  .admin-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
  .two-up{grid-template-columns:1fr}
}
@media (max-width: 640px){
  .admin-grid{grid-template-columns:1fr}
  .form-grid{grid-template-columns:1fr}
  .notif-row,.notif-actions{align-items:flex-start}
  .notif-actions .btn{width:100%}
  .section-actions .btn,.section-actions .check{width:100%}
}
  `]
})
export class AdminNotificationsComponent implements OnInit {
  allNotifications: Notification[] = [];
  errorMessage = '';
  sending = false;
  recipientIdsText = '';
  form: BulkNotificationRequest = {
    broadcastAll: true,
    targetRole: null,
    type: 'SYSTEM',
    title: '',
    message: '',
    channel: 'APP',
    relatedId: undefined,
    relatedType: 'SYSTEM',
    deepLinkUrl: '/admin'
  };

  constructor(
    private notifSvc: NotificationService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  get unreadCount(): number {
    return this.allNotifications.filter(n => !n.isRead).length;
  }

  get audibleCount(): number {
    return this.allNotifications.filter(n => n.audible).length;
  }

  get channelCount(): number {
    return new Set(this.allNotifications.map(n => n.channel)).size;
  }

  normalizeLink(link?: string | null): string | null {
    const value = (link || '').trim();
    if (!value) return null;
    return value.startsWith('/') ? value : `/${value}`;
  }

  normalizeText(value?: string): string {
    return (value || '')
      .replace(/Ã¢â€šÂ¹|Ã¢â‚¬Â¹|Ã¢â‚¬Å¡Â¹|â‚¹|Â₹|Ã‚Â₹|ÃƒÂ¢Ã¢â€šÂ¹/g, '₹')
      .replace(/Ã¢â‚¬â„¢|â€™|Â’/g, "'")
      .replace(/Ã¢â‚¬â€œ|Ã¢â‚¬â€”|â€“|â€”/g, '-')
      .replace(/\s+\./g, '.')
      .replace(/\s+/g, ' ')
      .trim();
  }

  loadNotifications(): void {
    this.notifSvc.getAll().subscribe({
      next: n => {
        this.allNotifications = [...n].sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
        this.errorMessage = '';
      },
      error: () => this.errorMessage = 'Could not load platform notifications.'
    });
  }

  send(): void {
    const recipientIds = this.recipientIdsText
      .split(',')
      .map(v => Number(v.trim()))
      .filter(v => Number.isFinite(v) && v > 0);

    if (!this.form.broadcastAll && !recipientIds.length && !this.form.targetRole) {
      this.toast.error('Choose broadcast all, a target role, or at least one recipient id.');
      return;
    }

    if (!this.form.title.trim() || !this.form.message.trim()) {
      this.toast.error('Title and message are required.');
      return;
    }

    this.sending = true;
    this.notifSvc.sendBulk({
      ...this.form,
      recipientIds,
      relatedId: this.form.relatedId ? Number(this.form.relatedId) : undefined
    }).subscribe({
      next: () => {
        this.sending = false;
        this.toast.success('Broadcast sent.');
        this.form.title = '';
        this.form.message = '';
        this.recipientIdsText = '';
        this.loadNotifications();
      },
      error: err => {
        this.sending = false;
        this.toast.error(err?.error?.message || 'Failed to send broadcast');
      }
    });
  }
}
