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
  filterBy = 'all';


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
        this.bookingListCopy = res.data;
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


  filterResponse(val) {
    this.filterBookingByCurrentDate(val);
  }


  filterBookingByCurrentDate(val) {
    this.filterBy = val;

    if (val === 'all') {
      this.bookingList = this.bookingListCopy;
      return;
    }
    if (val === 'cancel') {
      this.bookingList = this.bookingListCopy.filter((el) => {
        console.log(el.status);

        return (el.status === 3) || (el.status === 17);
      });

    }
    if (val === 'next') {
      this.bookingList = this.bookingListCopy.filter((el) => {
        return (el.status === 10);
      });

    }

    if (val === 'opend') {
      this.bookingList = this.bookingListCopy.filter((el) => {
        return (el.status === 1);
      });

    }
    console.log(this.bookingList);
    if (val === 'past') {
      this.bookingList = this.bookingListCopy.filter((el) => {
        console.log(el.status);

        return (el.status === 8) || (el.status === 7) || (el.status === 16);
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
