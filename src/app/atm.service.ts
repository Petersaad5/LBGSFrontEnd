import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtmProfile } from './atm-profile';

@Injectable({
  providedIn: 'root'
})
export class AtmService {
  private profileApiUrl = 'https://localhost:7104/api/Atm/GetAtmProfile'; 
  private withdrawOrDepositApiUrl = 'https://localhost:7104/api/Atm/DepositOrWithdraw';
  private transferApiUrl = 'https://localhost:7104/api/Atm/MoneyTransfer';

  constructor(private http: HttpClient) { }

  getAtmProfile(cardNumber: string): Observable<AtmProfile> {
    const params = new HttpParams().set('CardNumber', cardNumber);
    return this.http.get<AtmProfile>(this.profileApiUrl, { params });
  }
  deposit(cardNumber: string | undefined, amount: number): Observable<number> {
    amount = Math.abs(amount);
    const request = { cardNumber, amount };
    return this.http.put<number>(this.withdrawOrDepositApiUrl, request);
  }
  withdraw(cardNumber: string | undefined, amount: number): Observable<number> {
    amount = Math.abs(amount) * -1;
    const request = { cardNumber, amount };
    return this.http.put<number>(this.withdrawOrDepositApiUrl, request);
  }
  transfer(cardNumber: string | undefined, accountNumber: number, ammount: number): Observable<number> {
    ammount = Math.abs(ammount);
    const request = { cardNumber, accountNumber, ammount };
    return this.http.put<number>(this.transferApiUrl, request); // attention when making api call the field names must match exactly
  }
}