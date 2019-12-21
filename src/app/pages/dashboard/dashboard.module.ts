import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CommanModule } from '../comman/comman.module';
import { SearchComponent } from '../comman/search/search.component';
import { RestaurantDetailsComponent } from '../comman/restaurant-details/restaurant-details.component';
import { ProfileListComponent } from '../comman/profile-list/profile-list.component';
import { BookedComponent } from '../comman/booked/booked.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  // {
  //   path: 'restaurant/:id',
  //   component: RestaurantDetailsComponent
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommanModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage],
  entryComponents: [SearchComponent, RestaurantDetailsComponent, ProfileListComponent, BookedComponent],

  providers: [Geolocation],
})
export class DashboardPageModule { }
