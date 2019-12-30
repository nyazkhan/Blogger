import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReviewPage } from './review.page';
import { StartComponent } from './start/start.component';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewPage
  },
  {
    path: 'rating',
    component: RatingComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewPage, StartComponent, RatingComponent],
})
export class ReviewPageModule { }
