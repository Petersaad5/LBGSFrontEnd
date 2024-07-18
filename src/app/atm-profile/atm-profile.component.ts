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
      <section class ="user-description">
        <h2 class= "user-name">{{atmProfile?.userName}}</h2>
        <p class="user-id">{{atmProfile?.email}}</p>
        <p class="user-id">{{atmProfile?.userId}}</p>
      </section>
      <section class ="account-description">
        <h2 class= "acccount-number">{{atmProfile?.accountNumber}}</h2>
        <p class="account-id">{{atmProfile?.accountId}}</p>
      </section>
      <section class ="card-description">
        <h2 class= "card-number">{{atmProfile?.cardNumber}}</h2>
        <h1 class="acount-balance">{{atmProfile?.balance}}</h1>
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
