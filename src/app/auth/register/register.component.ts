import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit, OnDestroy {
	constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

	public userForm: FormGroup;
	private authStatusSub: Subscription;

	onRegistration() {
		if (this.userForm.value.password != this.userForm.value.confirmPassword) {
			let snackBarRef = this.snackBar.open('Passwords do not match', 'Close');
		} else if (this.userForm.value.password === this.userForm.value.confirmPassword) {
			const createdUser: User = {
				firstName: this.userForm.value.firstName,
				lastName: this.userForm.value.lastName,
				email: this.userForm.value.email,
				password: this.userForm.value.password
			};

			this.authService.createUser(
				createdUser.firstName,
				createdUser.lastName,
				createdUser.email,
				createdUser.password
			);
		}
	}

	ngOnInit() {
		this.userForm = new FormGroup({
			firstName: new FormControl(null, { validators: [ Validators.required, Validators.minLength(3) ] }),
			lastName: new FormControl(null, { validators: [ Validators.required, Validators.minLength(3) ] }),
			email: new FormControl(null, { validators: [ Validators.required, Validators.email ] }),
			password: new FormControl(null, {
				validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
			}),
			confirmPassword: new FormControl(null, {
				validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
			})
		});

		this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus) => {});
	}

	ngOnDestroy() {
		this.authStatusSub.unsubscribe();
	}
}
