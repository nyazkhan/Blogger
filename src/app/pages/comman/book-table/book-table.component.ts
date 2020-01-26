import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { BookedComponent } from '../booked/booked.component';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})
export class BookTableComponent implements OnInit {
  @Input() restaurantDetail: object;
  restaurantListCopy: any = {};
  personCount = 1;
  currentDate = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  maxDate = ((new Date()).getFullYear() + 1) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  bookingDetails = {
    // id: null,
    persons: 1,
    toDate: this.currentDate,
    onTime: null,
    to: null
  };

  slotsOfRestaurant: any = [];
  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
  ) {
    console.log(this.bookingDetails);

    this.restaurantListCopy = navParams.get('restaurantDetail');
    this.slotsStatus();
  }

  slotsStatus() {
    this.slotsOfRestaurant = [];
    this.alertService.showLoader();
    this.loginservice.restaurantTimeSlot({
      restaurantId: this.restaurantListCopy.id,
      date: this.bookingDetails.toDate.toString().slice(0, 10)
    }).subscribe((res) => {
      this.alertService.closeLoader();
      if (res.status === 200) {

        this.slotsOfRestaurant = res.data;
      }
    });
  }


  ngOnInit() { }

  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  noOfPerson(no) {
    if (!(this.bookingDetails.persons < 6) ) {
      this.alertService.presentToast(' Maximum  6 person allowed in  booking ');
    }
    if ((no === 1) && (this.bookingDetails.persons > 1)) {
      this.bookingDetails.persons--;
    }
    if ((this.bookingDetails.persons < 6) && (no === 2)) {
      this.bookingDetails.persons++;
    }
  }
  async presentBookedModelModal(details) {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {
        booking: details
      }
    });
    return await modal.present();
  }

  bookTable() {
    // this.back();
    this.bookingDetails.toDate = this.bookingDetails.toDate.toString().slice(0, 10);
    this.bookingDetails.to = this.restaurantListCopy.id;
    // this.bookingDetails.toDate = '2020-01-01';
    this.loginservice.bookTable(this.bookingDetails).subscribe((res: any) => {
      if (res.status === 200) {
        this.back();
        this.presentBookedModelModal(res.data);
      }
    });

  }
}
