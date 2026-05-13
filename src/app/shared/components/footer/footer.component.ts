import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <span>🍕</span>
          <span class="logo-text">Quick<span class="gradient-text">Bite</span></span>
        </div>
        <p>Order smarter. Eat better. Delivered faster. Your favourite food, right at your doorstep.</p>
        <div class="social-links">
          <a href="#" class="social-btn">📘</a>
          <a href="#" class="social-btn">📸</a>
          <a href="#" class="social-btn">🐦</a>
          <a href="#" class="social-btn">▶️</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a routerLink="/restaurants">Restaurants</a></li>
          <li><a routerLink="/home">Cuisines</a></li>
          <li><a routerLink="/home">Offers</a></li>
          <li><a routerLink="/home">New Arrivals</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Account</h4>
        <ul>
          <li><a routerLink="/login">Sign In</a></li>
          <li><a routerLink="/register">Register</a></li>
          <li><a routerLink="/orders">My Orders</a></li>
          <li><a routerLink="/wallet">Wallet</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Partners</h4>
        <ul>
          <li><a routerLink="/register">List Your Restaurant</a></li>
          <li><a routerLink="/register">Become a Rider</a></li>
          <li><a href="#">Corporate Orders</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© {{ year }} QuickBite. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Cookies</a>
        <a href="#">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
  `,
  styles: [`
.footer {
  background: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  padding: 60px 0 0;
  margin-top: 80px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
}

.footer-brand {
  p { font-size: 0.9rem; margin: 16px 0 24px; max-width: 280px; }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  .logo-text {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 800;
  }
}

.social-links {
  display: flex;
  gap: 8px;
}
.social-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--border-radius-sm);
  background: var(--bg-input);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-decoration: none;
  transition: background var(--transition-fast);
  &:hover { background: rgba(255,75,43,0.12); }
}

.footer-col {
  h4 {
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-primary);
    margin-bottom: 20px;
  }

  ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }

  a {
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
    &:hover { color: var(--brand-primary); }
  }
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  font-size: 0.82rem;
  color: var(--text-muted);

  @media (max-width: 640px) { flex-direction: column; gap: 12px; text-align: center; }
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
  a { color: var(--text-muted); text-decoration: none; &:hover { color: var(--text-primary); } }
}
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
