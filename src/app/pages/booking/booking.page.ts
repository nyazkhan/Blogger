import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookedComponent } from '../comman/booked/booked.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  bookingList: any = [];
  bookingListCopy: any = [];


  pastBooking: any = [];
  upcomingBooking: any = [];
  constructor(
    public modalController: ModalController,
    // navParams: NavParams,
    private loginservice: LoginService,
  ) { }

  ngOnInit() {
    this.getBookingList();
  }



  getBookingList() {
    this.loginservice.getAllBooking().subscribe((res) => {
      if (res.status === 200) {
        this.bookingList = res.data;
      }
    });
  }

  getBookingListBystatus(statusId) {
    this.loginservice.getAllBookingByStatus(statusId).subscribe((res) => {
      if (res.status === 200) {
        this.bookingList = res.data;

      }
    });
  }




  filterBookingByCurrentDate(val) {
    this.bookingListCopy = this.bookingList;
    if (val === 'past') {
      this.pastBooking = this.bookingListCopy.filter((el) => {
        return el.date < new Date();
      });

    }
    if (val === 'next') {
      this.upcomingBooking = this.bookingListCopy.filter((el) => {
        return el.date >= new Date();
      });

    }
  }

  async presentBookingDetailsModal(i) {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        booking: this.bookingList[i],
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
