import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
	constructor(private authService: AuthService) {}

	userIsAuthenticated = false;
	private authListenerSubs: Subscription;

	onLogout() {
		this.authService.logout();
	}
	ngOnInit() {
		this.userIsAuthenticated = this.authService.getIsAuth();
		this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
			this.userIsAuthenticated = isAuthenticated;
		});
	}

	ngOnDestroy() {
		this.authListenerSubs.unsubscribe();
	}
}
