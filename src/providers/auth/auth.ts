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

  registerUser(nombre:string, email: string, fecha:string, telefono:number, password:string, saldo:number){
    return new Promise((resolve, reject)=>{
      this.database.registerUser(nombre, email, fecha, telefono, password, saldo).then(res=>{
        resolve(res);
      }).catch(error=>{
        reject(error);
      })
    })
  }

  validateUser(email:string, password:string){
    return new Promise((resolve, reject)=>{
      this.database.validateUser(email,password).then(res=>{
        resolve(res);
      }).catch(error=>{
        reject(error);
      })
    })
  }

  editUser(nombre:string, fecha_nacimiento:string, telefono:number, id){
    return new Promise((resolve, reject)=>{
      this.database.editUser(nombre, fecha_nacimiento, telefono, id).then((data)=>{
        resolve(data);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  editPassword(new_password:string, id){
    return new Promise((resolve, reject)=>{
      this.database.editPassword(new_password,id).then((data)=>{
        resolve(data);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getPassword(id){
    return new Promise((resolve, reject) =>{
      this.database.getPassword(id).then((data)=>{
        resolve(data);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  getUserGroup(id){
    return new Promise((resolve, reject) =>{
      this.database.getUserGroup(id).then((data)=>{
        resolve(data);
      },(err)=>{
        reject(err);
      }).catch((error)=>{
        reject(error);
      })
    })
  }

}
