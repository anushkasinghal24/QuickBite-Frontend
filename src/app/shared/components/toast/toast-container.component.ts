import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../../core/services/ui.services';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="toast-wrapper">
  <div *ngFor="let toast of (toastService.toasts$ | async)" 
       class="toast toast-{{ toast.type }} animate-slideInLeft">
    <span class="toast-icon">{{ getIcon(toast.type) }}</span>
    <span class="toast-msg">{{ toast.msg }}</span>
    <button class="toast-close" (click)="toastService.remove(toast.id)">✕</button>
  </div>
</div>
  `,
  styles: [`
.toast-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 340px;
  width: 100%;

  @media (max-width: 480px) {
    bottom: 12px;
    right: 12px;
    left: 12px;
    max-width: 100%;
  }
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-xl);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  backdrop-filter: blur(8px);
  border-left: 4px solid;
  background: var(--bg-surface);
}

.toast-success { border-left-color: var(--success); .toast-icon { color: var(--success); } }
.toast-error   { border-left-color: var(--error);   .toast-icon { color: var(--error); } }
.toast-info    { border-left-color: var(--info);    .toast-icon { color: var(--info); } }
.toast-warning { border-left-color: var(--warning); .toast-icon { color: var(--warning); } }

.toast-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
.toast-msg  { flex: 1; color: var(--text-primary); }

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 0.8rem;
  padding: 2px;
  flex-shrink: 0;
  margin-top: 1px;
  &:hover { color: var(--text-primary); }
}
  `]
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
  getIcon(type: string): string {
    return { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' }[type] ?? 'ℹ️';
  }
}
