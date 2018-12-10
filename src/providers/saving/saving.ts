import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SavingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SavingProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SavingProvider Provider');
  }

  getSavingPlans(usuario_id:number){
    
  }

}
