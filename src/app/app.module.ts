import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateSubscriptionComponent } from './subscriptions/create-subscription/create-subscription.component';
import { ListSubscriptionsComponent } from './subscriptions/list-subscriptions/list-subscriptions.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './layout/home/home.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { DeleteDialogComponent } from './subscriptions/list-subscriptions/delete-dialog/delete-dialog.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TagChartComponent } from './charts/tag-chart/tag-chart.component';
import { ChartRootComponent } from './charts/chart-root/chart-root.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FeaturesComponent } from './pages/features/features.component';
import { ErrorInterceptor } from './error.interceptor';

FullCalendarModule.registerPlugins([ dayGridPlugin ]);

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginComponent,
		RegisterComponent,
		CreateSubscriptionComponent,
		ListSubscriptionsComponent,
		HomeComponent,
		CalendarViewComponent,
		DeleteDialogComponent,
		FooterComponent,

		TagChartComponent,
		ChartRootComponent,
		PrivacyPolicyComponent,
		FeaturesComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,

		FontAwesomeModule,
		FullCalendarModule,

		MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatRadioModule,
		MatSelectModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatTabsModule,
		MatToolbarModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		AuthGuard
	],
	bootstrap: [ AppComponent ],
	entryComponents: [ DeleteDialogComponent ]
})
export class AppModule {}
