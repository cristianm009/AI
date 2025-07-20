import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
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
        <app-add-transaction 
          [editingTransaction]="editingTransaction"
          (transactionAdded)="onTransactionAdded($event)"
          (transactionUpdated)="onTransactionUpdated($event)"
          (editCancelled)="onEditCancelled()"
        ></app-add-transaction>
        <app-transaction-list 
          [transactions]="transactions"
          (editRequested)="onEditRequested($event)"
          (deleteRequested)="onDeleteRequested($event)"
        ></app-transaction-list>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  transactions: any[] = [];
  balance: number = 0;
  editingTransaction: any = null;

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

  async onTransactionUpdated(updatedTransaction: any) {
    const index = this.transactions.findIndex(t => t.id === updatedTransaction.id);
    if (index !== -1) {
      this.transactions[index] = updatedTransaction;
      this.calculateBalance();
    }
    this.editingTransaction = null;
  }

  onEditRequested(transaction: any) {
    this.editingTransaction = transaction;
  }

  onEditCancelled() {
    this.editingTransaction = null;
  }

  async onDeleteRequested(transaction: any) {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/${transaction.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        this.transactions = this.transactions.filter(t => t.id !== transaction.id);
        this.calculateBalance();
      } else {
        console.error('Error deleting transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  }

  calculateBalance() {
    this.balance = this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }
}
