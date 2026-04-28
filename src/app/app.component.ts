import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastContainerComponent } from './shared/components/toast/toast-container.component';
import { ThemeService } from './core/services/ui.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastContainerComponent],
  template: `
    <app-navbar />
    <main class="page-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-toast-container />
  `
})
export class AppComponent implements OnInit {
  constructor(private theme: ThemeService) {}
  ngOnInit() { /* Theme already applied in ThemeService constructor */ }
}
