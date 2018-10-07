import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AccountPage } from '../account/account';
import { BalancePage } from '../balance/balance';
import { IncomesExpensesPage } from '../incomes-expenses/incomes-expenses';
import { GroupPage } from '../group/group';
import { SavingPage } from '../saving/saving';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Cuenta = AccountPage;
  Grupo = GroupPage;
  IngresosGastos = IncomesExpensesPage;
  Ahorro = SavingPage;
  Balance = BalancePage;

  constructor(public navCtrl: NavController) {

  }

}
