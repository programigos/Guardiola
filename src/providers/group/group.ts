import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DatabaseProvider } from '../database/database'

/*
  Generated class for the GroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupProvider {

  constructor(public http: HttpClient, private database: DatabaseProvider) {
    console.log('Hello GroupProvider Provider');
  }

  createGroup(usuario_id: number, codigo: string, name: string){
    return new Promise((resolve, reject) =>{
      this.database.createGroup(usuario_id,codigo,name).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }

  getGroupInfo(group_id: number){
    return new Promise((resolve, reject) =>{
      this.database.getGroupInfo(group_id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }

  addUserGroupCode(usuario_id: number, codigo: string){
    return new Promise((resolve, reject) =>{
      this.database.addUserGroupCode(usuario_id, codigo).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }

  dropUserGroup(usuario_id: number, group_id: number, is_creator: boolean){
    return new Promise((resolve, reject) =>{
      this.database.dropUserGroup(usuario_id, group_id, is_creator).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }

  getCreatorGroup(usuario_id: number){
    return new Promise((resolve, reject) =>{
      this.database.getCreatorGroup(usuario_id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }

  getListUsersGroup(group_id: number){
    return new Promise((resolve, reject) =>{
      this.database.getListUsersGroup(group_id).then(res=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
}
