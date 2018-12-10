import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SavingProvider } from '../../providers/saving/saving';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { PlanDetailsPage } from '../plan-details/plan-details';

/**
 * Generated class for the SavingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saving',
  templateUrl: 'saving.html',
})
export class SavingPage {

  user_data;
  planForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toastCtrl: ToastController, private saves:SavingProvider) {
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
    this.planForm = this.createPlanForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingPage');
  }

  private createPlanForm(){
    return this.formBuilder.group({
      amount:['',Validators.required],
      date:['',Validators.required],
    });
  }

  createPlan(){
    let data={
      id:this.user_data["id"],
      total:this.planForm.value.amount,
      date:this.planForm.value.date
    }
    console.log(data);
    this.saves.addSavingPLan(data.id,data.total,data.date).then((result) =>{
      this.presentToast("Plan de Ahorros Creado");
      this.planForm.reset();
    },(err)=>{
      this.presentToast(err);
      console.log(err);
    }).catch((error)=>{
      this.presentToast(error);
      console.log(error);
    })
    
  }

  goPlanDetails(){
    this.navCtrl.push(PlanDetailsPage);
  }

  presentToast(valor: string){
    let toast = this.toastCtrl.create({
      message: valor,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
