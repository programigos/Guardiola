import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SavesProvider } from '../../providers/saves/saves'

/**
 * Generated class for the BalancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html',
})
export class BalancePage {

  information:any[];
  dayForm:FormGroup;
  monthForm:FormGroup;
  yearForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private saves: SavesProvider, private formBuilder: FormBuilder) {
    this.dayForm=this.createDayForm();
    this.monthForm=this.createMonthForm();
    this.yearForm=this.createYearForm();
    this.information=[];
    let user_data = JSON.parse(localStorage.getItem('usuario_data'));
    let day={
      name:"DIA",
      categorias:[]
    };
    this.information.push(day);
    let month={
      name:"MES",
      categorias:[]
    };
    this.information.push(month);
    let year={
      name:"AÑO",
      categorias:[]
    };
    this.information.push(year);
    this.saves.getUserSave(user_data.id).then((result)=>{
      let balance = JSON.parse(JSON.stringify(result));
      console.log("Balance:");
      console.log(balance);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    });
  }

  private createDayForm(){
    return this.formBuilder.group({
      date: ['',Validators.required]
    });
  }

  private createMonthForm(){
    return this.formBuilder.group({
      month: ['',Validators.required]
    });
  }

  private createYearForm(){
    return this.formBuilder.group({
      year: ['',Validators.required]
    });
  }

  changeDay($event){
    console.log("Funciona");
    console.log($event);
    let user_data = JSON.parse(localStorage.getItem('usuario_data'));
    this.saves.getUserDay(user_data.id,$event).then((result)=>{
      let balance = JSON.parse(JSON.stringify(result));
      this.information[0].categorias=balance;
      console.log("Balance:");
      console.log(this.information);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    });
  }

  changeMonth($event){
    console.log($event);
  }

  changeYear($event){
    console.log($event);
  }

  toggleSection(idx) {
    for(let i=0;i<3;++i){
      if(i==idx)
        this.information[i].open = !this.information[i].open;
      else
        this.information[i].open = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }

}
