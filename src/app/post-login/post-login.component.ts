// src/app/post-login/post-login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-login',
  template: `
    <div class="post-login-container">
    <h1>{{this.cardNumber}}</h1>
    <button (click)="logout()">Logout</button>
    </div>
  `,
  styleUrls: ['./post-login.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PostLoginComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  cardNumber: string | undefined;
  constructor() {
    this.cardNumber = this.authService.getCardNumberFromToken();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
