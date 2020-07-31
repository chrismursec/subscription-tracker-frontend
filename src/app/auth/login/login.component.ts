import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {AuthData} from '../auth-data.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }
  loginForm: FormGroup;

  onLogin() {
    const authData: AuthData = {email: this.loginForm.value.email, password: this.loginForm.value.password};
    this.authService.login(authData.email, authData.password);

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, { validators: [ Validators.required, Validators.email ] }),
			password: new FormControl(null, { validators: [ Validators.required ] })
    })
  }

}
