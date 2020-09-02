import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientModule} from './client/client.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthGuard} from '../_services/auth.guard';
import {AuthAgentGuard} from '../_services/auth-agent.guard';
import { AgentDashboardModule } from './agent-dashboard/agent-dashboard.module';
import { ConversionsComponent } from './agent-dashboard/conversions/conversions.component';
import { ConversionsDetailsComponent } from './agent-dashboard/conversions/conversions-details/conversions-details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => ClientModule
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => DashboardModule
  },
  {
    path: 'agent-dashboard',
    canActivate: [AuthAgentGuard],
    canActivateChild: [AuthAgentGuard],
    loadChildren: () => AgentDashboardModule
  },
  // {path: 'agent-dashboard/conversions', component: ConversionsComponent},
  // {path: 'agent-dashboard/conversions-details/:email/:ref', component: ConversionsDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
