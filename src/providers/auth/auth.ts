import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {DatabaseProvider} from '../database/database'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, private database: DatabaseProvider) {
    console.log('Hello DatabaseProvider Provider');
  }

  registerUser(nombre:string, email: string, fecha:string, telefono:number, password:string){
    this.database.registerUser(nombre, email, fecha, telefono, password).then((data)=>{
      console.log(data);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
