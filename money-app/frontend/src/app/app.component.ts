import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="header">
        <h1>Daily Money Tracker</h1>
        <div class="balance">
          <span>Current Balance: </span>
          <span [ngClass]="balance >= 0 ? 'positive' : 'negative'">
            \${{ balance.toFixed(2) }}
          </span>
        </div>
      </header>
      
      <main class="main-content">
        <app-add-transaction (transactionAdded)="onTransactionAdded($event)"></app-add-transaction>
        <app-transaction-list [transactions]="transactions"></app-transaction-list>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  transactions: any[] = [];
  balance: number = 0;

  constructor() {
    this.loadTransactions();
  }

  async loadTransactions() {
    try {
      const response = await fetch('http://localhost:3000/api/transactions');
      this.transactions = await response.json();
      this.calculateBalance();
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  }

  async onTransactionAdded(transaction: any) {
    this.transactions.push(transaction);
    this.calculateBalance();
  }

  calculateBalance() {
    this.balance = this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }
}
