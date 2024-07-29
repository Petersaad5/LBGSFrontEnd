import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../transaction';
import { TransactionComponent } from '../transaction/transaction.component';
import { AtmService } from '../atm.service';
import { AtmProfile } from '../atm-profile';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule,TransactionComponent],
  template: `
    <h1>Transaction History</h1>
    <section class="results">
      <div *ngFor="let transaction of transactionList">
        <app-transaction [transaction]="transaction" [userAccount]="userAccount"></app-transaction>
      </div>
    </section>
  `,
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {
  atmService : AtmService = inject(AtmService);
  atmProfile : AtmProfile | undefined;
  authService: AuthService = inject(AuthService);
  userAccount: number =0;
  transactionList: Transaction[] = [];
  constructor() {
    const cardNumber = String (this.authService.getCardNumberFromToken());
    this.atmService.getAtmProfile(cardNumber).subscribe(
      (atmProfile: AtmProfile) => { 
        this.atmProfile = atmProfile;
        this.userAccount = atmProfile.accountNumber;
        console.log(atmProfile);
        console.log(this.userAccount);
        this.fetchTransactions();
      },
      error => {
        console.error('Error fetching ATM profile', error);
      }
    );
  }

  // Fetch transactions for the user account
  fetchTransactions() {
    this.atmService.getTransactionsByAccount(this.userAccount).subscribe(
      (transactions: Transaction[]) => {
        this.transactionList = transactions;
        console.log(this.transactionList);
      },
      (error) => {
        console.error('Error fetching transactions', error);
      }
    );
  }
}
