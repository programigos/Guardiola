import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {DatabaseProvider} from '../database/database'
/*
  Generated class for the SavingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SavingProvider {

  constructor(public http: HttpClient, private database: DatabaseProvider) {
    console.log('Hello SavingProvider Provider');
  }

  getSavingPlans(usuario_id:number){
    return new Promise((resolve, reject)=>{
      this.database.getSavingPlans(usuario_id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }

  addSavingPLan(usuario_id, monto_objetivo,fecha){
    return new Promise((resolve, reject)=>{
      this.database.addSavingPlans(usuario_id, monto_objetivo,fecha).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
}
