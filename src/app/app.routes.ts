// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostLoginComponent } from './post-login/post-login.component';
import { AtmProfileComponent } from './atm-profile/atm-profile.component';
import { AuthGuard } from './auth.guard';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post-login', component: PostLoginComponent, canActivate: [AuthGuard] },
  { path: 'atm-profile', component: AtmProfileComponent, canActivate: [AuthGuard] },
  { path: 'withdraw/:cardNumber', component: WithdrawComponent, canActivate: [AuthGuard] },
  { path: 'deposit/:cardNumber', component: DepositComponent, canActivate: [AuthGuard] },
  {path: 'transfer/:cardNumber', component: MoneyTransferComponent, canActivate: [AuthGuard]},
  {path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuard]}
];
