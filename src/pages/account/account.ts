import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditPage } from '../edit/edit';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user_data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appCtrl: App) {
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  goEdit(){
    this.navCtrl.push(EditPage);
  }

  dismiss(){
    localStorage.setItem('logeado','false');
    localStorage.setItem('usuario_data','');
    this.appCtrl.getRootNav().setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

}
