import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  action: 'login' | 'sign up' = 'login';

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.action === 'login') {
      this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    } else if (this.action === 'sign up') {
      this.authService.signUp(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    }
  }
}
