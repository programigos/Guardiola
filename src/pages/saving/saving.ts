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
    this.presentToast("Plan de Ahorros Creado");
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
