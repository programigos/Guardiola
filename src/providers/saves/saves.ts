import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {DatabaseProvider} from '../database/database'

/*
  Generated class for the SavesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SavesProvider {

  constructor(public http: HttpClient, private database: DatabaseProvider) {
    console.log('Hello SavesProvider Provider');
  } 

  addExpenseIncome(usuario_id: number, grupo_id: number, categoria: number, descripcion: string, monto: number, fecha: string, gasto_ingreso:boolean){
    return new Promise((resolve, reject)=>{
      this.database.addExpenseIncome(usuario_id, grupo_id, categoria, descripcion, monto, fecha, gasto_ingreso).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
  getUserSave(id){
    return new Promise((resolve, reject)=>{
      this.database.getUserSave(id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
  getUserDay(id,date:string){
    return new Promise((resolve, reject)=>{
      this.database.getUserDay(id,date).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
<<<<<<< HEAD
  getUserDayCategory(user_id,date:string,category_id){
    return new Promise((resolve, reject)=>{
      this.database.getUserDayCategory(user_id,date,category_id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
  getUserMonth(id,month){
    return new Promise((resolve, reject)=>{
      this.database.getUserMonth(id,month).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
  getUserMonthCategory(user_id,month,category_id){
    return new Promise((resolve, reject)=>{
      this.database.getUserMonthCategory(user_id,month,category_id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
  getUserYear(id,year){
    return new Promise((resolve, reject)=>{
      this.database.getUserYear(id,year).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
  getUserYearCategory(user_id,year,category_id){
    return new Promise((resolve, reject)=>{
      this.database.getUserYearCategory(user_id,year,category_id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
=======
>>>>>>> c7cae0845d97e30936cbaa766fedf300ef076d66
}
