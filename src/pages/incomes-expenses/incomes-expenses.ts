import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';

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
  pet: string = "expend";
  user_data;
  months:string[];
  notifId:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder, private saves: SavesProvider, private toastCtrl: ToastController, private localNotifications: LocalNotifications) {
    this.months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.type=false;
    this.incomeForm=this.createIncomeForm();
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
    let date = this.generateDate(2018,12,9);
    let a:ILocalNotification={
      id: 1,
      text: 'Esto funciona prro',
      sound:'file://sound.mp3'
    };
    let b:ILocalNotification={
      id: 2,
      trigger: {at: date},
      text: 'Esto funciona prro x2',
      sound:'file://sound.mp3'
    };
    this.setNotification([2018,12,10],"Recordatorio","Egreso: Pension S/. 600");
    this.setNotification([2018,12,10],"Recordatorio","Esto funciona x2");
    this.setNotification([2018,12,10],"Recordatorio","Esto funciona x3");
  }

  generateDate(year,month,day){
    let date:string=this.months[month-1]+" "+day+", "+year;
    return new Date(date);
  }

  setNotification(dateNumbers,title,message){
    let date=this.generateDate(dateNumbers[0],dateNumbers[1],dateNumbers[2]);
    console.log(this.notifId);
    let notification={
      id:++this.notifId,
      title:title,
      text:message,
      trigger:{at:date},
      vibrate:true,
      launch:true
    }
    this.localNotifications.schedule(notification);
  }

  private createIncomeForm(){
    return this.formBuilder.group({
      concept: ['',],
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
    let in_eg = "Gasto";
    console.log(this.user_data);
    let data={
      user_id:this.user_data.id,
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
      in_eg = "Ingreso";
      this.user_data["saldo"]+=Number(data.amount);
    }
    else{
      if(this.user_data["saldo"]-data.amount>=0){
        this.user_data["saldo"]-=Number(data.amount);
      }
      else{
        this.presentToast("No cuenta con saldo suficiente");
        return;
      }
    }
    localStorage.setItem('usuario_data',JSON.stringify(this.user_data));
    if(data.personal == 1){
      this.saves.addExpenseIncome(data.user_id, null, data.concept, data.description, data.amount, data.date, data.type).then((result) =>{
        this.presentToast(in_eg + " Añadido Correctamente");
        this.incomeForm.reset();
        console.log(result);
      },(err)=>{
        this.presentToast(err);
        console.log(err);
      }).catch((error)=>{
        this.presentToast(error);
        console.log(error);
      })
      console.log(data);
    }
    else{
      let group_id = localStorage.getItem("group_id");
      if(group_id != "undefined"){
        this.saves.addExpenseIncome(data.user_id, JSON.parse(group_id), data.concept, data.description, data.amount, data.date, data.type).then((result) =>{
          this.presentToast(in_eg + " Grupal Añadido Correctamente");
          this.incomeForm.reset();
          console.log(result);
        },(err)=>{
          this.presentToast(err);
          console.log(err);
        }).catch((error)=>{
          this.presentToast(error);
          console.log(error);
        })
        console.log(data);
      }
      else{
        this.presentToast("Usted No Se Encuentra En Ningun Grupo");
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomesExpensesPage');
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
