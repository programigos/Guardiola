import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomesExpensesPage } from './incomes-expenses';

@NgModule({
  declarations: [
    IncomesExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomesExpensesPage),
  ],
})
export class IncomesExpensesPageModule {}
