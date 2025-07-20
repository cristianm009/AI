import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  template: `
    <div class="transaction-list-card">
      <h2>Recent Transactions</h2>
      
      <div *ngIf="transactions.length === 0" class="no-transactions">
        No transactions yet. Add your first transaction above!
      </div>
      
      <div *ngIf="transactions.length > 0" class="transactions-container">
        <div 
          *ngFor="let transaction of sortedTransactions" 
          class="transaction-item"
          [ngClass]="transaction.amount >= 0 ? 'income' : 'expense'"
        >
          <div class="transaction-main">
            <div class="transaction-info">
              <span class="category">{{ transaction.category }}</span>
              <span class="date">{{ formatDate(transaction.date) }}</span>
            </div>
            <div class="amount" [ngClass]="transaction.amount >= 0 ? 'positive' : 'negative'">
              {{ transaction.amount >= 0 ? '+' : '' }}\${{ Math.abs(transaction.amount).toFixed(2) }}
            </div>
          </div>
          
          <div *ngIf="transaction.notes" class="transaction-notes">
            {{ transaction.notes }}
          </div>
        </div>
      </div>
      
      <div *ngIf="transactions.length > 0" class="summary">
        <div class="summary-item">
          <span>Total Income:</span>
          <span class="positive">\${{ totalIncome.toFixed(2) }}</span>
        </div>
        <div class="summary-item">
          <span>Total Expenses:</span>
          <span class="negative">\${{ Math.abs(totalExpenses).toFixed(2) }}</span>
        </div>
        <div class="summary-item total">
          <span>Net Balance:</span>
          <span [ngClass]="netBalance >= 0 ? 'positive' : 'negative'">
            \${{ netBalance.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  @Input() transactions: any[] = [];

  get sortedTransactions() {
    return [...this.transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  get totalIncome() {
    return this.transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get totalExpenses() {
    return this.transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get netBalance() {
    return this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
