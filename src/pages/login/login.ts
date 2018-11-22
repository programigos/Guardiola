import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private auth: AuthProvider, private toastCtrl: ToastController) {
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
      let res = JSON.parse(JSON.stringify(result));
      console.log(res);
      console.log(res[0])
      let largo = res.length;
      if(largo == 0){
        console.log("Datos Equivocados");
        this.presentToast("Usuario o Contraseña Incorrectos");
      }
      else{
        console.log("Soy Valido");
        localStorage.setItem('logeado','true');
        localStorage.setItem('usuario_data', JSON.stringify(res[0]));
        this.auth.getUserGroup(res[0].id).then((result)=>{
          let resu = JSON.parse(JSON.stringify(result));
          console.log(resu);
          console.log(resu[0])
          let largo = resu.length;
          if(largo == 0){
            console.log("No Tiene Grupo");
            localStorage.setItem('group_id', 'undefined');
          }
          else{
            console.log("Si Tiene Grupo");
            localStorage.setItem('group_id', JSON.stringify(resu[0]["group_id"]));
          }
        })
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
      }
    },(err)=>{
      this.presentToast("Usuario o Contraseña Incorrectos");
      console.log(err);
    }).catch((error)=>{
      this.presentToast("Usuario o Contraseña Incorrectos");
      console.log(error);
    });
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }

  presentToast(valor: string){
    let toast = this.toastCtrl.create({
      message: valor,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
