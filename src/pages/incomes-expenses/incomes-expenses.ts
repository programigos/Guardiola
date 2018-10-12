import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SavesProvider } from '../../providers/saves/saves'

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder, private saves: SavesProvider) {
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

  setType(val){
    this.type=val;
  }

  addIncome(){
    let user_data = JSON.parse(localStorage.getItem('usuario_data'));
    console.log(user_data);
    let data={
      user_id:user_data.id,
      concept:this.incomeForm.value.concept,
      description:this.incomeForm.value.description,
      date:this.incomeForm.value.date,
      amount:this.incomeForm.value.amount,
      personal:this.incomeForm.value.personal,
      type:this.type
    }
    console.log(data);
    if(this.type){
      data.concept= 8;
    }
    this.saves.addExpenseIncome(data.user_id, null, data.concept, data.description, data.amount, data.date, data.type).then((result) =>{
      console.log(result);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    })
    console.log(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomesExpensesPage');
  }

}
