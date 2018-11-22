import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  editForm: FormGroup;
  user_data: any;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private toastCtrl: ToastController) {
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
    this.editForm = this.createEditForm();
  }

  private createEditForm(){
    return this.formBuilder.group({
      name:[this.user_data.nombre,Validators.required],
      phone:[this.user_data.telefono,Validators.compose([Validators.required,Validators.pattern('[0-9]{9}')])],
      date:[this.user_data.fecha,Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    })
  }

  doUpdate(){//Actualizar datos de la cuenta
    let data = {//Obtener datos del formulario
      name: this.editForm.value.name,
      date: this.editForm.value.date,
      phone_number: this.editForm.value.phone,
      password: this.editForm.value.password
    };
    this.auth.getPassword(this.user_data.id).then((result)=>{//Solicitar modificacion a la base de datos
      if(result == data.password){
        this.auth.editUser(data.name, data.date, data.phone_number, this.user_data.id).then((result)=>{
          console.log(result);
          this.user_data.nombre = data.name;
          this.user_data.fecha = data.date;
          this.user_data.telefono = data.phone_number;
          localStorage.setItem('usuario_data', JSON.stringify(this.user_data));
          this.presentToast("Datos Actualizados");
          this.navCtrl.pop();
        },(err)=>{
          console.log(err);
        }).catch((error)=>{
          console.log(error);
        })
      }
      else{
        this.presentToast("Contraseña Incorrecta");
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
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
