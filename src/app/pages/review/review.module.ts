import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReviewPage } from './review.page';
import { ReviewDetailsComponent } from './review-details/review-details.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewPage
  },
  {
    path: 'reviewdetails',
    component: ReviewDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewPage, ReviewDetailsComponent]
})
export class ReviewPageModule {}
