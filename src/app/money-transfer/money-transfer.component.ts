import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'
import { AtmService } from '../atm.service';
import { AtmProfile } from '../atm-profile';
import { delay } from 'rxjs';
import { $locationShim } from '@angular/common/upgrade';
@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
    <h1>Select the account you want to transfer to :</h1>
        <input type="number" #account placeholder="Enter Account Number" id="account"/>
      <h1>Select the amount to withdraw</h1>
        <p>
          <Strong>Account Balance:{{atmProfile?.balance}} $ </Strong>
        </p>
        <input type="number" #amount placeholder="Enter amount" id ="amount" />
        <button (click)="transfer(account.value,amount.value)">Transfer</button>
        <h2>{{message}}</h2>
    </section>
  `,
  styleUrl: './money-transfer.component.css'
})
export class MoneyTransferComponent {
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
  transfer(account:string,amount:string): void {
    amount = amount.trim();
    var amountInt = Number(amount);
    account = account.trim();
    var accountInt = Number(account);
    this.atmService.transfer(this.atmProfile?.cardNumber,accountInt, amountInt).subscribe(
      (newBalance: number) => {// use this to delay before redirecting
        this.message = `Transfer successful. New balance: ${newBalance} $`;
        setTimeout(() => {
          this.router.navigate(['/post-login']);
        }, 3000);
      },
      error => {
        this.message = `Transaction failed, please try again.'${this.atmProfile?.cardNumber} ${accountInt}  ${amountInt} `;
        console.error('Error during transfer', error);
      }
    );
  }
}
