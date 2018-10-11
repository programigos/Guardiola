import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, auth: AuthProvider) {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(){
    return this.formBuilder.group({
      email: ['',Validators.compose([Validators.email,Validators.required,Validators.min(6),Validators.max(16)])],
      password: ['',Validators.compose([Validators.required,Validators.min(6),Validators.max(16)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin(){
    let data={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    console.log(data);
    this.navCtrl.push(HomePage)
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
