import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {
	constructor(private authService: AuthService) {}
	loginForm: FormGroup;
	private authStatusSub: Subscription;

	onLogin() {
		const authData: AuthData = { email: this.loginForm.value.email, password: this.loginForm.value.password };
		this.authService.login(authData.email, authData.password);
	}

	ngOnInit() {
		this.loginForm = new FormGroup({
			email: new FormControl(null, { validators: [ Validators.required, Validators.email ] }),
			password: new FormControl(null, { validators: [ Validators.required ] })
		});

		this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus) => {});
	}

	ngOnDestroy() {
		this.authStatusSub.unsubscribe();
	}
}
