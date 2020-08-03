import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DeleteDialogComponent } from './subscriptions/list-subscriptions/delete-dialog/delete-dialog.component';
import { FooterComponent } from './layout/footer/footer.component';

FullCalendarModule.registerPlugins([
	// register FullCalendar plugins
	dayGridPlugin
]);

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
		FooterComponent
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

		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
		MatFormFieldModule,
		MatCardModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule,
		MatListModule,
		MatSelectModule,
		MatPaginatorModule,
		MatDialogModule
	],
	providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard ],
	bootstrap: [ AppComponent ],
	entryComponents: [ DeleteDialogComponent ]
})
export class AppModule {}
