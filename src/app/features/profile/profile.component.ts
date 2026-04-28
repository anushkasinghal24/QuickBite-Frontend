import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/ui.services';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<div class="page-header"><div class="container"><h1>My Profile 👤</h1></div></div>
<div class="container" style="padding:32px 0 64px">
  <div class="profile-layout">
    <!-- Avatar Card -->
    <div class="profile-sidebar">
      <div class="card" style="padding:var(--space-xl);text-align:center">
        <div class="avatar-large">{{ auth.currentUser?.fullName?.charAt(0)?.toUpperCase() }}</div>
        <h3 style="margin:16px 0 4px">{{ auth.currentUser?.fullName }}</h3>
        <p class="text-muted text-sm">{{ auth.currentUser?.email }}</p>
        <span class="badge badge-brand" style="margin-top:8px">{{ auth.currentUser?.role }}</span>
        <div class="divider" style="margin:20px 0"></div>
        <div class="profile-stat"><span>📅</span><span class="text-sm">Member since {{ auth.currentUser?.createdAt | date:'MMMM yyyy' }}</span></div>
      </div>
    </div>

    <!-- Edit Form -->
    <div>
      <div class="card" style="margin-bottom:20px">
        <div class="card-header"><h4>✏️ Edit Profile</h4></div>
        <div class="card-body">
          <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
            <div class="grid grid-cols-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input formControlName="fullName" type="text" class="form-control">
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input formControlName="phone" type="tel" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input formControlName="email" type="email" class="form-control" readonly style="opacity:.6">
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="saving">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </form>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h4>🔒 Change Password</h4></div>
        <div class="card-body">
          <form [formGroup]="passForm" (ngSubmit)="changePassword()">
            <div class="form-group">
              <label class="form-label">Current Password</label>
              <input formControlName="oldPassword" type="password" class="form-control" placeholder="••••••••">
            </div>
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input formControlName="newPassword" type="password" class="form-control" placeholder="Min 6 characters">
            </div>
            <button type="submit" class="btn btn-secondary" [disabled]="savingPass">
              {{ savingPass ? 'Updating...' : 'Update Password' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
.profile-layout{display:grid;grid-template-columns:260px 1fr;gap:24px;align-items:start;
  @media(max-width:900px){grid-template-columns:1fr;}}
.avatar-large{width:80px;height:80px;border-radius:50%;background:var(--brand-gradient);color:white;font-family:var(--font-display);font-size:2rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto;}
.profile-stat{display:flex;align-items:center;gap:10px;font-size:.875rem;color:var(--text-muted);justify-content:center;}
  `]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passForm!: FormGroup;
  saving = false;
  savingPass = false;

  constructor(private fb: FormBuilder, public auth: AuthService, private toast: ToastService) {}

  ngOnInit() {
    const u = this.auth.currentUser!;
    this.profileForm = this.fb.group({ fullName: [u.fullName, Validators.required], phone: [u.phone], email: [u.email] });
    this.passForm = this.fb.group({ oldPassword: ['', Validators.required], newPassword: ['', [Validators.required, Validators.minLength(6)]] });
  }

  saveProfile() {
    if (this.profileForm.invalid) return;
    this.saving = true;
    this.auth.updateProfile(this.profileForm.value).subscribe({
      next: () => { this.toast.success('Profile updated!'); this.saving = false; },
      error: () => { this.toast.error('Failed to update'); this.saving = false; }
    });
  }

  changePassword() {
    if (this.passForm.invalid) return;
    this.savingPass = true;
    this.auth.changePassword(this.passForm.value.oldPassword, this.passForm.value.newPassword).subscribe({
      next: () => { this.toast.success('Password updated!'); this.passForm.reset(); this.savingPass = false; },
      error: () => { this.toast.error('Wrong current password'); this.savingPass = false; }
    });
  }
}
