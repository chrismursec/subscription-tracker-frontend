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
  loginForm: FormGroup;
  private authStatusSub: Subscription;
  isLoading = false;

  constructor(private authService: AuthService) {}

  onLogin() {
    const authData: AuthData = { username: this.loginForm.value.username, password: this.loginForm.value.password };
    this.isLoading = true;
    this.authService.login(authData.username, authData.password);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, { validators: [ Validators.required ] }),
      password: new FormControl(null, { validators: [ Validators.required ] })
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus) => {});
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
