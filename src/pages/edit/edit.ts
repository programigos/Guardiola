import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.user_data = JSON.parse(localStorage.getItem('usuario_data'));
    this.editForm = this.createEditForm();
  }

  private createEditForm(){
    return this.formBuilder.group({
      name:['',Validators.required],
      phone:['',Validators.compose([Validators.required,Validators.pattern('[0-9]{9}')])],
      date:['',Validators.required]
    })
  }

  doUpdate(){
    
  }

  back(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

}
