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
  user_data: any;
  group_data: any;
  hasGroup: boolean;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private groupCtrl: GroupProvider) {
    this.joinGroupForm = this.createJoinGroupForm();
    this.createGroupForm = this.createCreateGroupForm();
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
    this.group_data = {
      nombre: '',
      codigo: '',
      creador_id: ''
    }
    if(localStorage.getItem('group_id') != 'undefined'){
      this.hasGroup = true;
      this.getGroupInfo();
    }
    else{
      this.hasGroup = false;
    }
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

  makeGroupCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  joinGroup(){
    let data = {
      usuario_id: this.user_data.id,
      codigo: this.joinGroupForm.value.code,
    }
    this.groupCtrl.addUserGroupCode(data.usuario_id, data.codigo).then((result)=>{
      this.presentToast("Ingreso Correcto");
      this.hasGroup = true;
      this.getGroupInfo();
      console.log(result);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    })
  }

  createGroup(){
    let data = {
      usuario_id: this.user_data.id,
      codigo: this.makeGroupCode(),
      name: this.createGroupForm.value.name
    }
    this.groupCtrl.createGroup(data.usuario_id, data.codigo, data.name).then((result)=>{
      this.presentToast("Grupo Creado");
      localStorage.setItem('group_id', JSON.stringify(result));
      this.hasGroup = true;
      this.getGroupInfo();
      console.log(result);
    },(err)=>{
      console.log(err);
      this.createGroup();
    }).catch((error)=>{
      console.log(error);
      this.createGroup();
    })
  }

  getGroupInfo(){
    let group_id = JSON.parse(localStorage.getItem('group_id'));
    this.groupCtrl.getGroupInfo(group_id).then((result)=>{
      this.group_data = result[0];
      console.log(result);
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  dismiss(){

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
