import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookedComponent } from '../comman/booked/booked.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor(
    public modalController: ModalController,

  ) { }

  ngOnInit() {
  }
  async presentBookingDetailsModal(mobile) {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        // mobileNo: mobile,
      }
    });
    return await modal.present();
  }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
