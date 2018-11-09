import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  passwordForm: FormGroup;
  user_data: any;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private toastCtrl: ToastController) {
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
    this.passwordForm = this.createPasswordForm();
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {//Valida la contraseña
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

  private createPasswordForm(){
    return this.formBuilder.group({
      current_password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      new_password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      repeat_password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    }, {validator: this.matchingPasswords('new_password', 'repeat_password')});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  doUpdate(){//Actualizar contraseña
    let data = {//Obtener datos del formulario
      current_password: this.passwordForm.value.current_password,
      new_password: this.passwordForm.value.new_password,
      repeat_password: this.passwordForm.value.repeat_password
    };
    this.auth.getPassword(this.user_data.id).then((result)=>{//Solicitar actualización en la base de datos
      console.log(result);
      if(result == data.current_password){
        this.auth.editPassword(data.new_password, this.user_data.id).then((result)=>{
          this.presentToast("Contraseña Actualizada");
          this.navCtrl.pop();
        },(err)=>{
          console.log(err);
        }).catch((error)=>{
          console.log(error);
        })
      }
      else{
        this.presentToast("Contraseña Actual Incorrecta");
      }
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    })
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
