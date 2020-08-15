import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateSubscriptionComponent } from './subscriptions/create-subscription/create-subscription.component';
import { ListSubscriptionsComponent } from './subscriptions/list-subscriptions/list-subscriptions.component';
import { HomeComponent } from './layout/home/home.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { ChartRootComponent } from './charts/chart-root/chart-root.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FeaturesComponent } from './pages/features/features.component';
import { TagChartComponent } from './charts/tag-chart/tag-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsRootComponent } from './settings/settings-root/settings-root.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'create', component: CreateSubscriptionComponent, canActivate: [ AuthGuard ] },
  { path: 'edit/:postId', component: CreateSubscriptionComponent, canActivate: [ AuthGuard ] },
  { path: 'subscriptions', component: ListSubscriptionsComponent, canActivate: [ AuthGuard ] },
  // { path: 'subscriptions/calendar', component: CalendarViewComponent, canActivate: [ AuthGuard ] },
  // { path: 'charts', component: ChartRootComponent, canActivate: [ AuthGuard ] },
  // { path: 'tag-data', component: TagChartComponent, canActivate: [ AuthGuard ] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'settings', component: SettingsRootComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
