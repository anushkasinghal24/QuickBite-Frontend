import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/ui.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  showPass = false;
  selectedRole: 'CUSTOMER'|'OWNER'|'AGENT' = 'CUSTOMER';

  roles: Array<{ id: 'CUSTOMER'|'OWNER'|'AGENT'; icon: string; name: string; desc: string; }> = [
    { id: 'CUSTOMER', icon: '👤', name: 'Customer', desc: 'Order food' },
    { id: 'OWNER',    icon: '🏪', name: 'Restaurant Owner', desc: 'Manage restaurant' },
    { id: 'AGENT',    icon: '🚴', name: 'Delivery Agent', desc: 'Deliver orders' },
  ];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email:    ['', [Validators.required, Validators.email]],
      phone:    ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  selectRole(role: 'CUSTOMER'|'OWNER'|'AGENT') { this.selectedRole = role; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const payload = { ...this.form.value, role: this.selectedRole };
    this.auth.register(payload).subscribe({
      next: res => {
        this.toast.success(`Welcome to QuickBite, ${res.user.fullName}! 🎉`);
        this.router.navigate([res.user.role === 'CUSTOMER' ? '/home' :
                              res.user.role === 'OWNER'    ? '/owner' :
                              res.user.role === 'AGENT'    ? '/agent' : '/home']);
      },
      error: err => {
        this.loading = false;
        this.toast.error(err?.error?.message || 'Registration failed. Please try again.');
      }
    });
  }

  get fullName() { return this.form.get('fullName')!; }
  get email()    { return this.form.get('email')!; }
  get phone()    { return this.form.get('phone')!; }
  get password() { return this.form.get('password')!; }
}
