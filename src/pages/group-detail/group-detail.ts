import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupProvider } from '../../providers/group/group';

/**
 * Generated class for the GroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-detail',
  templateUrl: 'group-detail.html',
})
export class GroupDetailPage {

  pet:string = "members";
  users:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groupCtrl: GroupProvider) {
    let group_id = JSON.parse(localStorage.getItem('group_id'));
    console.log(group_id);
    this.groupCtrl.getListUsersGroup(group_id).then((result)=>{
      console.log(result);
      this.users = result;
    },(err)=>{
      console.log(err);
    }).catch((error)=>{
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailPage');
  }

}
