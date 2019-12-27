import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { BookedComponent } from './booked/booked.component';
import { IonicModule } from '@ionic/angular';
import { BookTableComponent } from './book-table/book-table.component';
import { FormsModule } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InvitationComponent } from './invitation/invitation.component';



@NgModule({
  declarations: [
    SearchComponent,
    BookTableComponent,
    ReviewDetailsComponent, InvitationComponent,
    RestaurantDetailsComponent,
    ProfileListComponent,
    BookedComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,

  ],
  exports: [
    SearchComponent,
    ReviewDetailsComponent, InvitationComponent,
    BookTableComponent,
    RestaurantDetailsComponent,
    ProfileListComponent,
    BookedComponent],
  entryComponents: [ReviewDetailsComponent, InvitationComponent, BookTableComponent],
  providers: [CallNumber]

})
export class CommanModule { }
