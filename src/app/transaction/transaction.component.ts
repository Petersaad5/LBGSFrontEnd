import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  @Input() transaction!: Transaction;
  @Input() userAccount!: number;  

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
