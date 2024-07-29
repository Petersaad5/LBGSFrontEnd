export interface Transaction {
	transactionId: number;
	fromAccount: number;
	toAccount: number;
	cardNumber: string;
	transactionType: 'Deposit' | 'Transfer' | 'Withdrawal';
	amount: number;
	date: string
}


