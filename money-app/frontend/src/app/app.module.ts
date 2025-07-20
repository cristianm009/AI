import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AddTransactionComponent } from './add-transaction.component';
import { TransactionListComponent } from './transaction-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTransactionComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
