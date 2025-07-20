import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  standalone: false,
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
            <div class="transaction-actions">
              <div class="amount" [ngClass]="transaction.amount >= 0 ? 'positive' : 'negative'">
                {{ transaction.amount >= 0 ? '+' : '' }}\${{ Math.abs(transaction.amount).toFixed(2) }}
              </div>
              <div class="action-buttons">
                <button 
                  class="edit-btn" 
                  (click)="editTransaction(transaction)"
                  title="Edit transaction"
                >
                  ✏️
                </button>
                <button 
                  class="delete-btn" 
                  (click)="deleteTransaction(transaction)"
                  title="Delete transaction"
                >
                  🗑️
                </button>
              </div>
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
  @Output() editRequested = new EventEmitter<any>();
  @Output() deleteRequested = new EventEmitter<any>();
  
  Math = Math; // Make Math available in template

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

  editTransaction(transaction: any) {
    this.editRequested.emit(transaction);
  }

  async deleteTransaction(transaction: any) {
    if (confirm(`Are you sure you want to delete this ${transaction.category} transaction for $${Math.abs(transaction.amount).toFixed(2)}?`)) {
      this.deleteRequested.emit(transaction);
    }
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
