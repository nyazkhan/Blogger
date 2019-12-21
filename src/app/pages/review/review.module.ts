import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReviewPage } from './review.page';
import { ReviewDetailsComponent } from '../comman/review-details/review-details.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewPage ],
})
export class ReviewPageModule { }
