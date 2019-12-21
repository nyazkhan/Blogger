import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { BookedComponent } from './booked/booked.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SearchComponent, ReviewDetailsComponent, RestaurantDetailsComponent, ProfileListComponent, BookedComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [SearchComponent, ReviewDetailsComponent, RestaurantDetailsComponent, ProfileListComponent, BookedComponent],
  entryComponents: [ ReviewDetailsComponent ],

})
export class CommanModule { }
