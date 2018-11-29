import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditPage } from '../edit/edit';
import { ChangePasswordPage } from '../change-password/change-password';

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
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));//Mostrar los datos del usuario
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewWillEnter(){
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
  }

  goEdit(){
    this.navCtrl.push(EditPage);//Cargar pagina para modificar datos
  }

  goPassword(){
    this.navCtrl.push(ChangePasswordPage);
  }

  dismiss(){// Logout
    localStorage.setItem('logeado','false');
    localStorage.setItem('usuario_data','');
    localStorage.setItem('group_id','undefined');
    this.appCtrl.getRootNav().setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

}
