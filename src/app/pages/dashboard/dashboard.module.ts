import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { SearchComponent } from './search/search.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ReviewPageModule } from '../review/review.module';
import { ReviewDetailsComponent } from '../review/review-details/review-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }, {
    path: 'restaurant/:id',
    component: RestaurantDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage, ProfileListComponent, RestaurantDetailsComponent, SearchComponent],
  exports: [SearchComponent, ProfileListComponent, RestaurantDetailsComponent],
  providers: [Geolocation],
  entryComponents: [ProfileListComponent, ReviewDetailsComponent, SearchComponent]
})
export class DashboardPageModule { }
