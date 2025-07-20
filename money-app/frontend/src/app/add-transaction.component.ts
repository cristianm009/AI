import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  standalone: false,
  template: `
    <div class="add-transaction-card">
      <h2>{{ editingTransaction ? 'Edit Transaction' : 'Add New Transaction' }}</h2>
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

        <div class="form-actions">
          <button 
            type="submit" 
            [disabled]="!transactionForm.form.valid || isSubmitting"
            class="submit-btn"
          >
            {{ isSubmitting ? (editingTransaction ? 'Updating...' : 'Adding...') : (editingTransaction ? 'Update Transaction' : 'Add Transaction') }}
          </button>
          
          <button 
            *ngIf="editingTransaction"
            type="button" 
            (click)="cancelEdit()"
            class="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnChanges {
  @Input() editingTransaction: any = null;
  @Output() transactionAdded = new EventEmitter<any>();
  @Output() transactionUpdated = new EventEmitter<any>();
  @Output() editCancelled = new EventEmitter<void>();

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingTransaction'] && this.editingTransaction) {
      this.transaction = {
        amount: this.editingTransaction.amount,
        category: this.editingTransaction.category,
        date: new Date(this.editingTransaction.date).toISOString().split('T')[0],
        notes: this.editingTransaction.notes || ''
      };
    }
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
      if (this.editingTransaction) {
        // Update existing transaction
        const response = await fetch(`http://localhost:3000/api/transactions/${this.editingTransaction.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...this.transaction,
            date: new Date(this.transaction.date).toISOString()
          })
        });

        if (response.ok) {
          const updatedTransaction = await response.json();
          this.transactionUpdated.emit(updatedTransaction);
          this.resetForm();
        } else {
          console.error('Error updating transaction');
        }
      } else {
        // Add new transaction
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
      }
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  cancelEdit() {
    this.editCancelled.emit();
    this.resetForm();
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
