// src/app/post-login/post-login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { AtmProfileComponent } from "../atm-profile/atm-profile.component";
import { AtmService } from '../atm.service';
import { AtmProfile } from '../atm-profile';

@Component({
  selector: 'app-post-login',
  template: `
    <div class="post-login-container">
    <h1>Welcome, {{atmProfile?.userName}}</h1>
    <button (click)="checkProfile()">Profile</button>
    <button (click)="viewTransactionHistory()">History</button>
    <button (click)="withdraw()">Withdraw</button>
    <button (click)="deposit()">Deposit</button>
    <button (click)="transfer()">Transfer</button>
    <button (click)="logout()">Logout</button>
    </div>
  `,
  styleUrls: ['./post-login.component.css'],
  standalone: true,
  imports: [CommonModule, AtmProfileComponent]
})
export class PostLoginComponent {
  private authService: AuthService = inject(AuthService);
  atmService : AtmService = inject(AtmService);
  atmProfile : AtmProfile | undefined;
  private router: Router = inject(Router);
  constructor() {
    const cardNumber = String (this.authService.getCardNumberFromToken());
    this.atmService.getAtmProfile(cardNumber).subscribe(
      (atmProfile: AtmProfile) => {
        this.atmProfile = atmProfile;
      },
      error => {
        console.error('Error fetching ATM profile', error);
      }
    );
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  checkProfile(): void {
    this.router.navigate(['/atm-profile']);
  }
  viewTransactionHistory(): void {
    this.router.navigate(['/transaction-history']);
  }
  withdraw(): void { 
    this.router.navigate(['/withdraw',this.atmProfile?.cardNumber]);
  }
  deposit(): void { 
    this.router.navigate(['/deposit',this.atmProfile?.cardNumber]);
  }
  transfer(): void {
    this.router.navigate(['/transfer',this.atmProfile?.cardNumber]);
  }
}
