import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingPage } from './booking.page';
import { CommanModule } from '../comman/comman.module';
import { BookedComponent } from '../comman/booked/booked.component';
// import { BookedComponent } from '../comman/booked/booked.component';

const routes: Routes = [
  {
    path: '',
    component: BookingPage
  },
  // {
  //   path: 'booked',
  //   component: BookedComponent
  // }
];

@NgModule({
  imports: [
    CommonModule,
    CommanModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingPage],
  entryComponents: [BookedComponent]
})
export class BookingPageModule { }
