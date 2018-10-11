import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Generated class for the IncomesExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incomes-expenses',
  templateUrl: 'incomes-expenses.html',
})
export class IncomesExpensesPage {

  type:boolean;
  incomeForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
    this.type=true;
    this.incomeForm=this.createIncomeForm();
  }

  private createIncomeForm(){
    return this.formBuilder.group({
      concept: ['',Validators.required],
      description: ['',],
      date:['',Validators.required],
      amount:['',Validators.required],
      personal:['',Validators.required],
    });
  }

  addIncome(){
    let data={
      concept:this.incomeForm.value.concept,
      description:this.incomeForm.value.description,
      date:this.incomeForm.value.date,
      amount:this.incomeForm.value.amount,
      personal:this.incomeForm.value.personal
    }
    console.log(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomesExpensesPage');
  }

}
