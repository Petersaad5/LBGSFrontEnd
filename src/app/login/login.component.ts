// src/app/login/login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <div class="form-group">
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" [(ngModel)]="cardNumber" name="cardNumber" required>
        </div>
        <div class="form-group">
          <label for="csv">CSV:</label>
          <input type="number" id="csv" [(ngModel)]="csv" name="csv" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  cardNumber: string = '';
  csv: number | null = null;

  login(): void {
    if (this.csv !== null) {
      this.authService.login(this.cardNumber, this.csv).subscribe(
        () => {
          this.router.navigate(['/post-login']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.error('CSV cannot be null');
    }
  }
}
