import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  isLoading = false;
  error = '';

  constructor(private authService: AuthService) {}

  async handleGoogleLogin() {
    this.isLoading = true;
    this.error = '';
    try {
      await this.authService.loginWithGoogle();
    } catch (error: any) {
      this.error = error.code === 'auth/popup-closed-by-user'
        ? 'You closed the login window. Please try again.'
        : error.message || 'Login failed. Please try again.';
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
