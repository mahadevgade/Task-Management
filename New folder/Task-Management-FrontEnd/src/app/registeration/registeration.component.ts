import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterPayload } from '../../Model/register-payload';
import { RegisterServiceService } from '../../Services/register-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-registeration',
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule 
  ],
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
  providers: [RegisterServiceService] 
})
export class RegisterationComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegisterServiceService, 
    private snakeBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const payload: RegisterPayload = this.registerForm.value;
    this.registrationService.registerUser(payload).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.snakeBar.open('Registration Successful!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });
        this.registerForm.reset();
      },
      error: (error) => {
        console.error('Registration error', error);
        this.snakeBar.open('Registration Failed!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}

