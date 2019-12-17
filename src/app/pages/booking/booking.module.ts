import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingPage } from './booking.page';
import { BookedComponent } from './booked/booked.component';

const routes: Routes = [
  {
    path: '',
    component: BookingPage
  },
  {
    path: 'booked',
    component: BookedComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingPage, BookedComponent],
  exports: [BookedComponent]
})
export class BookingPageModule { }