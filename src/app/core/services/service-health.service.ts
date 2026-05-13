import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ServiceHealthIssue {
  key: string;
  label: string;
  message: string;
  updatedAt: number;
}

@Injectable({ providedIn: 'root' })
export class ServiceHealthService {
  private readonly issuesSubject = new BehaviorSubject<ServiceHealthIssue[]>([]);
  readonly issues$ = this.issuesSubject.asObservable();

  get issuesSnapshot(): ServiceHealthIssue[] {
    return this.issuesSubject.value;
  }

  markUnavailable(key: string, label: string, message: string): void {
    const next = [...this.issuesSubject.value.filter(issue => issue.key !== key), {
      key,
      label,
      message,
      updatedAt: Date.now()
    }].sort((a, b) => b.updatedAt - a.updatedAt);

    this.issuesSubject.next(next);
  }

  markAvailable(key: string): void {
    const next = this.issuesSubject.value.filter(issue => issue.key !== key);
    if (next.length !== this.issuesSubject.value.length) {
      this.issuesSubject.next(next);
    }
  }

  clear(): void {
    this.issuesSubject.next([]);
  }

  resolveScope(url: string): { key: string; label: string } {
    const lower = url.toLowerCase();

    if (lower.includes('/api/v1/payments') || lower.includes('/api/v1/wallet')) {
      return { key: 'payments', label: 'Payment service' };
    }
    if (lower.includes('/api/v1/orders') || lower.includes('/api/v1/cart')) {
      return { key: 'orders', label: 'Order service' };
    }
    if (lower.includes('/api/v1/notifications')) {
      return { key: 'notifications', label: 'Notification service' };
    }
    if (lower.includes('/api/v1/restaurants') || lower.includes('/api/v1/reviews')) {
      return { key: 'restaurants', label: 'Restaurant service' };
    }
    if (lower.includes('/api/v1/delivery') || lower.includes('/api/v1/agents')) {
      return { key: 'delivery', label: 'Delivery service' };
    }
    if (lower.includes('/api/v1/auth')) {
      return { key: 'auth', label: 'Authentication service' };
    }

    return { key: 'backend', label: 'Backend service' };
  }
}
