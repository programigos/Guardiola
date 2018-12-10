import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SavingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saving',
  templateUrl: 'saving.html',
})
export class SavingPage {

  user_data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingPage');
  }

}
