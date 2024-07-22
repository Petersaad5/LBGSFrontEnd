import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'
import { AtmService } from '../atm.service';
import { AtmProfile } from '../atm-profile';
import { delay } from 'rxjs';
@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Select the amount to Deposit</h1>
        <p>
          <Strong>Account Balance:{{atmProfile?.balance}} $ </Strong>
        </p>
        <input type="number" #amount placeholder="Enter amount" />
        <button (click)="deposit(amount.value)">Deposit</button>
        <h2>{{message}}</h2>
    </section>
  `,
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  route: ActivatedRoute  = inject(ActivatedRoute);
  private router: Router = inject(Router);
  atmService : AtmService = inject(AtmService);
  atmProfile: AtmProfile | undefined;
  message = '';

  constructor() {
    const cardNumber = String (this.route.snapshot.params['cardNumber']);
    this.atmService.getAtmProfile(cardNumber).subscribe(
      (atmProfile: AtmProfile) => {
        this.atmProfile = atmProfile;
      },
      error => {
        console.error('Error fetching ATM profile', error);
      }
    );
  }
  deposit(amount:string): void {
    amount = amount.trim();
    var amountInt = Number(amount);
    this.atmService.deposit(this.atmProfile?.cardNumber, amountInt).subscribe(
      (newBalance: number) => {// use this to delay before redirecting
        this.message = `Deposit successful. New balance: ${newBalance} $`;
        setTimeout(() => {
          this.router.navigate(['/post-login']);
        }, 2000);
      },
      error => {
        this.message = 'Transaction failed, please try again.';
        console.error('Error during Deposit', error);
      }
    );
  }

}
