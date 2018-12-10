import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SavingProvider } from '../../providers/saving/saving';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private saves: SavingProvider) {
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
    console.log(this.user_data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingPage');
  }

}
