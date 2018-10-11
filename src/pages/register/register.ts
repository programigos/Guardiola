import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.registerForm=this.createRegisterForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
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
      password: ['',Validators.required],
      confirmPassword:['',Validators.required],
      terms:[false,Validators.requiredTrue]
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  doRegister(){
    let data = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      date: this.registerForm.value.date,
      phone_number: this.registerForm.value.phone,
      password: this.registerForm.value.password
    };
    console.log(data);
     this.navCtrl.pop();
  }

}
