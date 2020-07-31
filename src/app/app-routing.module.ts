import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateSubscriptionComponent } from './subscriptions/create-subscription/create-subscription.component';
import { AuthGuard } from './auth/auth.guard';
import { ListSubscriptionsComponent } from './subscriptions/list-subscriptions/list-subscriptions.component';
import { HomeComponent } from './layout/home/home.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateSubscriptionComponent, canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: CreateSubscriptionComponent, canActivate: [ AuthGuard ] },
  {path: 'subscriptions', component: ListSubscriptionsComponent, canActivate: [AuthGuard]},
  {path: 'subscriptions/calendar', component: CalendarViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
