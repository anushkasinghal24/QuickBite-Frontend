import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DeliveryAgent } from '../../../core/models';
import { DeliveryService } from '../../../core/services/api.services';

@Component({
  selector: 'app-admin-agents',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
<div class="page-header">
  <div class="container">
    <h1>Manage Delivery Agents</h1>
    <p>Approve pending agents, review their documents, and control platform access</p>
  </div>
</div>

<div class="container" style="padding:32px 0 64px">
  <div *ngIf="errorMessage" class="empty-state" style="margin-bottom:20px">
    <div class="empty-icon">!</div>
    <div class="empty-title">Agent data unavailable</div>
    <div class="empty-desc">{{ errorMessage }}</div>
  </div>

  <div class="grid summary-grid" style="margin-bottom:24px">
    <div class="card summary-card" *ngFor="let card of summaryCards">
      <div class="summary-label">{{ card.label }}</div>
      <div class="summary-value">{{ card.value }}</div>
    </div>
  </div>

  <div class="grid two-up">
    <div class="card panel">
      <div class="panel-head">
        <h3>Pending agents</h3>
        <span class="badge">{{ pendingAgents.length }}</span>
      </div>
      <div *ngIf="pendingAgents.length; else noPending" class="stack">
        <div class="agent-card" *ngFor="let agent of pendingAgents">
          <div class="agent-main">
            <div class="agent-title">{{ agent.fullName }}</div>
            <div class="agent-meta">{{ agent.vehicleType }} · {{ agent.vehicleNumber }}</div>
            <div class="agent-meta">Phone: {{ agent.phone }}</div>
            <textarea
              class="input"
              rows="2"
              [(ngModel)]="remarksDraft[agent.agentId]"
              placeholder="Optional remarks for reject/suspend"
            ></textarea>
          </div>
          <div class="agent-actions">
            <span class="pill">{{ agent.status || (agent.isVerified ? 'VERIFIED' : 'PENDING') }}</span>
            <button class="btn btn-primary" (click)="approve(agent)">Approve</button>
            <button class="btn btn-danger" (click)="reject(agent)">Reject</button>
            <button class="btn btn-ghost" (click)="suspend(agent)">Suspend</button>
          </div>
        </div>
      </div>
      <ng-template #noPending>
        <div class="empty-copy">No delivery agents are waiting for verification.</div>
      </ng-template>
    </div>

    <div class="card panel">
      <div class="panel-head">
        <h3>All agents</h3>
        <span class="badge">{{ allAgents.length }}</span>
      </div>
      <div *ngIf="allAgents.length; else noAgents" class="stack">
        <div class="mini-row" *ngFor="let agent of allAgents">
          <div>
            <div class="mini-title">{{ agent.fullName }}</div>
            <div class="mini-meta">{{ agent.vehicleType }} · {{ agent.vehicleNumber }}</div>
            <div class="mini-meta">#{{
              agent.agentId
            }} · {{ agent.phone }} · {{ agent.status || (agent.isVerified ? 'VERIFIED' : 'PENDING') }}</div>
          </div>
          <span class="pill" [class.muted]="agent.status !== 'VERIFIED'">{{ agent.isVerified ? 'VERIFIED' : 'PENDING' }}</span>
        </div>
      </div>
      <ng-template #noAgents>
        <div class="empty-copy">No agents found.</div>
      </ng-template>
    </div>
  </div>

  <div style="margin-top:24px">
    <a routerLink="/admin" class="btn btn-ghost">Back to dashboard</a>
  </div>
</div>
  `,
  styles: [`
.summary-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;align-items:stretch}
.summary-card{padding:20px 18px;display:flex;flex-direction:column;gap:8px;min-height:112px}
.summary-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)}
.summary-value{font-size:clamp(1.55rem,2.3vw,1.8rem);font-weight:800;overflow-wrap:anywhere}
.two-up{grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
.panel{padding:20px}
.panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.stack{display:flex;flex-direction:column;gap:12px}
.agent-card{border:1px solid var(--border-color);border-radius:16px;padding:14px;background:var(--bg-card);display:flex;flex-direction:column;gap:12px}
.agent-main{display:flex;flex-direction:column;gap:8px}
.agent-title{font-weight:800;font-size:1rem}
.agent-meta{font-size:.84rem;color:var(--text-muted)}
.agent-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.mini-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-color)}
.mini-row:last-child{border-bottom:none;padding-bottom:0}
.mini-title{font-weight:700}
.mini-meta{font-size:.82rem;color:var(--text-muted);margin-top:2px}
.pill{padding:6px 10px;border-radius:999px;background:rgba(255,75,43,.1);color:var(--brand-primary);font-size:.78rem;font-weight:700}
.pill.muted{background:rgba(100,116,139,.12);color:#475569}
.badge{min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--brand-primary);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700}
.empty-copy{color:var(--text-muted);padding:10px 0}
@media (max-width: 900px){
  .summary-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
  .two-up{grid-template-columns:1fr}
}
@media (max-width: 640px){
  .summary-grid{grid-template-columns:1fr}
  .agent-actions,.mini-row{align-items:flex-start}
  .agent-actions .btn,.agent-actions .input{width:100%}
}
  `]
})
export class AdminAgentsComponent implements OnInit {
  pendingAgents: DeliveryAgent[] = [];
  allAgents: DeliveryAgent[] = [];
  remarksDraft: Record<number, string> = {};
  errorMessage = '';

  summaryCards = [
    { label: 'Pending', value: 0 },
    { label: 'Verified', value: 0 },
    { label: 'Suspended', value: 0 },
    { label: 'Rejected', value: 0 },
  ];

  constructor(private deliverySvc: DeliveryService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.deliverySvc.getByStatus('PENDING').subscribe({
      next: agents => {
        this.pendingAgents = agents;
        this.remarksDraft = Object.fromEntries(agents.map(agent => [agent.agentId, ''])) as Record<number, string>;
        this.refreshSummary();
        this.errorMessage = '';
      },
      error: () => {
        this.pendingAgents = [];
        this.errorMessage = 'Could not load pending agents.';
      }
    });

    this.deliverySvc.getAll().subscribe({
      next: agents => {
        this.allAgents = agents;
        this.refreshSummary();
      },
      error: () => {
        this.allAgents = [];
        this.errorMessage = 'Could not load all agents.';
      }
    });
  }

  approve(agent: DeliveryAgent): void {
    this.deliverySvc.approveAgent(agent.agentId).subscribe({
      next: () => this.load(),
      error: () => this.errorMessage = `Could not approve ${agent.fullName}.`
    });
  }

  reject(agent: DeliveryAgent): void {
    const remarks = (this.remarksDraft[agent.agentId] || '').trim();
    this.deliverySvc.rejectAgent(agent.agentId, remarks).subscribe({
      next: () => this.load(),
      error: () => this.errorMessage = `Could not reject ${agent.fullName}.`
    });
  }

  suspend(agent: DeliveryAgent): void {
    const remarks = (this.remarksDraft[agent.agentId] || '').trim();
    this.deliverySvc.suspendAgent(agent.agentId, remarks).subscribe({
      next: () => this.load(),
      error: () => this.errorMessage = `Could not suspend ${agent.fullName}.`
    });
  }

  private refreshSummary(): void {
    this.summaryCards = [
      { label: 'Pending', value: this.pendingAgents.length },
      { label: 'Verified', value: this.allAgents.filter(agent => agent.status === 'VERIFIED' || agent.isVerified).length },
      { label: 'Suspended', value: this.allAgents.filter(agent => agent.status === 'SUSPENDED').length },
      { label: 'Rejected', value: this.allAgents.filter(agent => agent.status === 'REJECTED').length },
    ];
  }
}
