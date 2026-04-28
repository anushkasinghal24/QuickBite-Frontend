import { Injectable, signal, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models';

// ── Theme Service ────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = signal(localStorage.getItem('qb_theme') === 'dark');

  isDarkMode = this.isDark.asReadonly();

  constructor() {
    this.applyTheme(this.isDark());
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    this.applyTheme(next);
    localStorage.setItem('qb_theme', next ? 'dark' : 'light');
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}

// ── Cart State Service (client-side cart count/state) ────────────
@Injectable({ providedIn: 'root' })
export class CartStateService {
  private _items = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items.asObservable();

  get count(): number { return this._items.value.reduce((s,i) => s + i.quantity, 0); }
  get total(): number { return this._items.value.reduce((s,i) => s + i.price * i.quantity, 0); }

  setCart(items: CartItem[]): void { this._items.next(items); }
  clear(): void { this._items.next([]); }
}

// ── Toast Service ────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this._toasts.asObservable();

  private show(msg: string, type: ToastType, duration = 3500): void {
    const id = Date.now();
    this._toasts.next([...this._toasts.value, { id, msg, type }]);
    setTimeout(() => this.remove(id), duration);
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string)   { this.show(msg, 'error'); }
  info(msg: string)    { this.show(msg, 'info'); }
  warning(msg: string) { this.show(msg, 'warning'); }

  remove(id: number): void {
    this._toasts.next(this._toasts.value.filter(t => t.id !== id));
  }
}

export type ToastType = 'success'|'error'|'info'|'warning';
export interface ToastMessage { id: number; msg: string; type: ToastType; }
