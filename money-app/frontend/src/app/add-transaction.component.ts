import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  template: `
    <div class="add-transaction-card">
      <h2>Add New Transaction</h2>
      <form (ngSubmit)="onSubmit()" #transactionForm="ngForm">
        <div class="form-group">
          <label for="amount">Amount:</label>
          <input 
            type="number" 
            id="amount" 
            name="amount"
            [(ngModel)]="transaction.amount" 
            step="0.01" 
            required
            placeholder="Enter amount (negative for expenses)"
          >
        </div>

        <div class="form-group">
          <label for="category">Category:</label>
          <select 
            id="category" 
            name="category"
            [(ngModel)]="transaction.category" 
            required
          >
            <option value="">Select a category</option>
            <option *ngFor="let category of categories" [value]="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            name="date"
            [(ngModel)]="transaction.date" 
            required
          >
        </div>

        <div class="form-group">
          <label for="notes">Notes:</label>
          <input 
            type="text" 
            id="notes" 
            name="notes"
            [(ngModel)]="transaction.notes" 
            placeholder="Optional notes"
          >
        </div>

        <button 
          type="submit" 
          [disabled]="!transactionForm.form.valid || isSubmitting"
          class="submit-btn"
        >
          {{ isSubmitting ? 'Adding...' : 'Add Transaction' }}
        </button>
      </form>
    </div>
  `,
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  @Output() transactionAdded = new EventEmitter<any>();

  transaction = {
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  };

  categories: string[] = [];
  isSubmitting = false;

  constructor() {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      this.categories = await response.json();
    } catch (error) {
      console.error('Error loading categories:', error);
      this.categories = ['Food', 'Bills', 'Entertainment', 'Transportation', 'Shopping', 'Income'];
    }
  }

  async onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...this.transaction,
          date: new Date(this.transaction.date).toISOString()
        })
      });

      if (response.ok) {
        const newTransaction = await response.json();
        this.transactionAdded.emit(newTransaction);
        this.resetForm();
      } else {
        console.error('Error adding transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.transaction = {
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    };
  }
}
