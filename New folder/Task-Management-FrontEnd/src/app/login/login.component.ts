import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginServiceService } from '../../Services/login-service.service';
import { LoginPayload } from '../../Model/login-payload';



@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
   
    private router: Router

  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

onSubmit() {
  if (this.loginForm.invalid) {
    return;
  }

  const loginData: LoginPayload = this.loginForm.value;

  this.loginService.login(loginData).subscribe({
    next: (token: string) => {
      console.log('Login successful. Token:', token);

      // Store the plain token string
      localStorage.setItem('token', token);

      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error("Login failed", err);
      // Optional: show error to user
    }
  });
}


}
