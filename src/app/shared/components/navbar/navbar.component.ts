import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, interval, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/ui.services';
import { CartStateService } from '../../../core/services/ui.services';
import { NotificationService } from '../../../core/services/api.services';
import { User } from '../../../core/models';
import { ToastService } from '../../../core/services/ui.services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  cartCount = 0;
  unreadNotifs = 0;
  isScrolled = false;
  mobileMenuOpen = false;
  private subs = new Subscription();
  private notifPollSub = new Subscription();
  private lastUnreadCount = 0;

  constructor(
    public auth: AuthService,
    public theme: ThemeService,
    private cartState: CartStateService,
    private notifService: NotificationService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.add(this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u && this.auth.isLoggedIn) {
        this.startNotificationPolling(u.userId);
      } else {
        this.unreadNotifs = 0;
        this.lastUnreadCount = 0;
        this.stopNotificationPolling();
      }
    }));
    this.subs.add(this.cartState.items$.subscribe(() => {
      this.cartCount = this.cartState.count;
    }));
  }

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 20; }

  toggleTheme() { this.theme.toggle(); }
  toggleMobile() { this.mobileMenuOpen = !this.mobileMenuOpen; }
  closeMobile() { this.mobileMenuOpen = false; }

  get dashboardRoute(): string {
    if (this.auth.isAdmin) return '/admin';
    if (this.auth.isOwner) return '/owner';
    if (this.auth.isAgent) return '/agent';
    return '/profile';
  }

  logout() { this.auth.logout(); this.closeMobile(); }

  private loadNotifCount(userId: number) {
    this.notifService.getUnreadCount(userId).subscribe({
      next: n => {
        if (n > this.lastUnreadCount && !this.router.url.startsWith('/owner')) {
          this.toast.info('You have a new notification');
          this.playNotifyTone();
        }
        this.lastUnreadCount = n;
        this.unreadNotifs = n;
      },
      error: () => {}
    });
  }

  private startNotificationPolling(userId: number) {
    this.stopNotificationPolling();
    this.notifPollSub = interval(30000).pipe(
      startWith(0),
      switchMap(() => this.notifService.getUnreadCount(userId).pipe(catchError(() => of(this.unreadNotifs))))
    ).subscribe(count => {
      if (count > this.lastUnreadCount && !this.router.url.startsWith('/owner')) {
        this.toast.info('You have a new notification');
        this.playNotifyTone();
      }
      this.lastUnreadCount = count;
      this.unreadNotifs = count;
    });
  }

  private stopNotificationPolling() {
    this.notifPollSub.unsubscribe();
    this.notifPollSub = new Subscription();
  }

  private playNotifyTone() {
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextCtor) return;
      const ctx = new AudioContextCtor();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 880;
      gain.gain.value = 0.04;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      window.setTimeout(() => {
        oscillator.stop();
        ctx.close().catch(() => {});
      }, 180);
    } catch {
      // Best-effort only; browsers may block audio until user interacts.
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.stopNotificationPolling();
  }
}
