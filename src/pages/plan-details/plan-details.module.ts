import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanDetailsPage } from './plan-details';

@NgModule({
  declarations: [
    PlanDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanDetailsPage),
  ],
})
export class PlanDetailsPageModule {}
