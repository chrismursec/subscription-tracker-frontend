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
  public registerForm: FormGroup;
  private authStatusSub: Subscription;
  isLoading = false;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  onRegistration() {
    this.isLoading = true;
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      const snackBarRef = this.snackBar.open('Passwords do not match', 'Close');
    } else if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      const createdUser: User = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };

      this.authService.createUser(
        createdUser.firstName,
        createdUser.lastName,
        createdUser.username,
        createdUser.password
      );
    }
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, { validators: [ Validators.required, Validators.minLength(3) ] }),
      lastName: new FormControl(null, { validators: [ Validators.required, Validators.minLength(3) ] }),
      username: new FormControl(null, { validators: [ Validators.required ] }),
      password: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }),
      confirmPassword: new FormControl(null, {
        validators: [ Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      })
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.isLoading = false;
      this.registerForm.reset();
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
