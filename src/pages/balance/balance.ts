import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  sumas:number[];
  user_data;

  constructor(public navCtrl: NavController, public navParams: NavParams, private saves: SavesProvider, private formBuilder: FormBuilder,private alertCtrl: AlertController) {
    this.sumas=[0,0,0];
    this.dayForm=this.createDayForm();
    this.monthForm=this.createMonthForm();
    this.yearForm=this.createYearForm();
    this.information=[];
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
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
  }
  ionViewWillEnter(){//Volver a la pantalla luego de cambiar
    this.sumas=[0,0,0];
    this.dayForm=this.createDayForm();
    this.monthForm=this.createMonthForm();
    this.yearForm=this.createYearForm();
    this.information=[];
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
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
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

  changeDay($event){//Cambiar el día de la búsqueda por días
    console.log($event);
    this.sumas[0]=0;
    this.saves.getUserDay(this.user_data.id,$event).then((result)=>{//Cargar resumen por categoría
      let balance = JSON.parse(JSON.stringify(result));
      this.information[0].categorias=balance;
      for(var i=0;i<this.information[0].categorias.length;++i){
        let categoria=this.information[0].categorias[i];
        if(categoria.id<8)
          this.sumas[0]-=categoria.amount;
        else
          this.sumas[0]+=categoria.amount;
        this.saves.getUserDayCategory(this.user_data.id,$event,categoria.id).then((result)=>{//Cargar ingresos/egresos por categoría
          let incomes = JSON.parse(JSON.stringify(result));
          categoria.incomes=incomes;
          console.log("Ingresos:");
          console.log(incomes);
          console.log(categoria.incomes);
        },(err)=>{
          console.log(err);
        }).catch((error)=>{
          console.log(error);
        });
      }
      console.log("Balance:");
      console.log(this.information);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    });
  }
  changeMonth($event){//Cambiar el mes de la búsqueda por meses
    console.log($event);
    this.sumas[1]=0;
    this.saves.getUserMonth(this.user_data.id,$event).then((result)=>{//Cargar resumen por categoría
      let balance = JSON.parse(JSON.stringify(result));
      this.information[1].categorias=balance;
      for(var i=0;i<this.information[1].categorias.length;++i){
        let categoria=this.information[1].categorias[i];
        if(categoria.id<8)
          this.sumas[1]-=categoria.amount;
        else
          this.sumas[1]+=categoria.amount;
        this.saves.getUserMonthCategory(this.user_data.id,$event,categoria.id).then((result)=>{//Cargar ingresos/egresos por categoría
          let incomes = JSON.parse(JSON.stringify(result));
          categoria.incomes=incomes;
          console.log("Ingresos:");
          console.log(incomes);
          console.log(categoria.incomes);
        },(err)=>{
          console.log(err);
        }).catch((error)=>{
          console.log(error);
        });
      }
      console.log("Balance:");
      console.log(this.information);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    });
  }

  changeYear($event){//Cambiar el año de la búsqueda por año
    console.log($event);
    this.sumas[2]=0;
    this.saves.getUserYear(this.user_data.id,$event).then((result)=>{//Cargar resumen por categoría
      let balance = JSON.parse(JSON.stringify(result));
      this.information[2].categorias=balance;
      for(var i=0;i<this.information[2].categorias.length;++i){
        let categoria=this.information[2].categorias[i];
        if(categoria.id<8)
          this.sumas[2]-=categoria.amount;
        else
          this.sumas[2]+=categoria.amount;
        this.saves.getUserYearCategory(this.user_data.id,$event,categoria.id).then((result)=>{//Cargar ingresos/egresos por categoría
          let incomes = JSON.parse(JSON.stringify(result));
          categoria.incomes=incomes;
          console.log("Ingresos:");
          console.log(incomes);
          console.log(categoria.incomes);
        },(err)=>{
          console.log(err);
        }).catch((error)=>{
          console.log(error);
        });
      }
      console.log("Balance:");
      console.log(this.information);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    });
  }

  toggleSection(idx) {//Cambiar el rango de fecha
    for(let i=0;i<3;++i){
      if(i==idx)
        this.information[i].open = !this.information[i].open;
      else
        this.information[i].open = false;
    }
  }

  toggleItem(i, j) {//Mostrar ingresos/egresos de una categoría
    this.information[i].categorias[j].open = !this.information[i].categorias[j].open;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancePage');
  }

}
