import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GroupProvider } from '../../providers/group/group'

/**
 * Generated class for the GroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  joinGroupForm: FormGroup;
  createGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private groupCtrl: GroupProvider) {
    this.joinGroupForm = this.createJoinGroupForm();
    this.createGroupForm = this.createCreateGroupForm();
  }

  private createJoinGroupForm(){
    return this.formBuilder.group({
      code:['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])]
    })
  }

  private createCreateGroupForm(){
    return this.formBuilder.group({
      name:['', Validators.required]
    })
  }

  joinGroup(){
    this.presentToast("Ingreso Correcto");
  }

  createGroup(){
    this.presentToast("Grupo Creado");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
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
