import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/ui.services';
import { CartStateService } from '../../../core/services/ui.services';
import { NotificationService } from '../../../core/services/api.services';
import { User } from '../../../core/models';

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

  constructor(
    public auth: AuthService,
    public theme: ThemeService,
    private cartState: CartStateService,
    private notifService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.add(this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u && this.auth.isLoggedIn) {
        this.loadNotifCount(u.userId);
      } else {
        this.unreadNotifs = 0;
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
      next: n => this.unreadNotifs = n,
      error: () => {}
    });
  }

  ngOnDestroy() { this.subs.unsubscribe(); }
}
