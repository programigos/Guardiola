import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.information=[];
    let week={
      name:"día"
    };
    this.information.push(week);
    let month={
      name:"mes"
    };
    this.information.push(month);
    let year={
      name:"año"
    };
    this.information.push(year);
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
