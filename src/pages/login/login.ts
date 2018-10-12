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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private auth: AuthProvider) {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(){
    return this.formBuilder.group({
      email: ['',Validators.compose([Validators.email,Validators.required,Validators.min(6),Validators.max(16)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
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
    console.log(data.email);
    this.auth.validateUser(data.email, data.password).then((result)=>{
      console.log(result);
      let res = JSON.parse(JSON.stringify(result));
      let largo = res.rows.length;
      if(largo == 0){
        console.log("Datos Equivocados");
      }
      else{
        console.log("Soy Valido");
        localStorage.setItem('logeado','true');
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
      }
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    });
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
