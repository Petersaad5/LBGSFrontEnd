import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtmProfile } from '../atm-profile';
import { AtmService } from '../atm.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-atm-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <section class="user-description">
        <h1 class="user-name">{{atmProfile?.userName}}</h1>
        <p class="user-id"><strong>Email:</strong> <span>{{atmProfile?.email}}</span></p>
        <p class="user-id"><strong>User ID:</strong> <span>{{atmProfile?.userId}}</span></p>
      </section>
      <section class="account-description">
        <h2 class="account-number"><strong>Account Number:</strong> <span>{{atmProfile?.accountNumber}}</span></h2>
        <p class="account-id"><strong>Account ID:</strong> <span>{{atmProfile?.accountId}}</span></p>
      </section>
      <section class="card-description">
        <h3 class="card-number"><strong>Card Number:</strong> <span>{{atmProfile?.cardNumber}}</span></h3>
        <p class="account-balance"><strong>Balance:</strong> <span>{{atmProfile?.balance}}</span></p>
      </section>
    </article>


  `,
  styleUrl: './atm-profile.component.css'
})
export class AtmProfileComponent {
  atmService : AtmService = inject(AtmService);
  atmProfile : AtmProfile | undefined;
  authService: AuthService = inject(AuthService);
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
}
