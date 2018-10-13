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

  
}
