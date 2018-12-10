import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthProvider } from '../../providers/auth/auth'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm : FormGroup;

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private toastCtrl: ToastController) {
    this.registerForm=this.createRegisterForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value != confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  private createRegisterForm(){
    return this.formBuilder.group({
      name:['',Validators.required],
      phone:['',Validators.compose([Validators.required,Validators.pattern('[0-9]{9}')])],
      email: ['',Validators.compose([Validators.email,Validators.required])],
      date:['',Validators.required],
      wallet:['',Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  doRegister(){
    let data = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      date: this.registerForm.value.date,
      phone_number: this.registerForm.value.phone,
      password: this.registerForm.value.password,
      wallet: this.registerForm.value.wallet,
    };
    this.auth.registerUser(data.name, data.email, data.date, data.phone_number, data.password, data.wallet).then((result)=>{
      console.log(result);
      this.presentToast("Usuario registrado correctamente");
      this.navCtrl.pop();
    },(err)=>{
      console.log(err);
      this.presentToast("Ha Ocurrido un Error Inesperado");
    }).catch((error)=>{
      console.log(error);
      this.presentToast("Ha Ocurrido un Error Inesperado");
    });
  }

  back(){
    this.navCtrl.pop();
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
