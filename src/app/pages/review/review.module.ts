import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReviewPage } from './review.page';
import { StartComponent } from './start/start.component';
import { RatingComponent } from './rating/rating.component';
import { CommanModule } from '../comman/comman.module';
import { ReviewDetailsComponent } from '../comman/review-details/review-details.component';

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
    CommanModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewPage, StartComponent, RatingComponent],
  entryComponents: [ReviewDetailsComponent, StartComponent]
})
export class ReviewPageModule { }
