import { Component, OnInit, Inject, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoginService } from 'src/app/service/login.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent implements OnInit {
  @Input() booking: object;
  bookingDetails: any = {};
  cancelButtonClick = false;

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
    @Inject(CallNumber) private callNumber: CallNumber,
    @Inject(AlertService) private alertService: AlertService,
  ) {

    this.bookingDetails = navParams.get('booking');
    console.log(this.bookingDetails);

  }

  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  async presentRestaurantDetailsModal(mobile) {
    const modal = await this.modalController.create({
      component: RestaurantDetailsComponent,
      componentProps: {

        mobileNo: mobile,
      }
    });
    return await modal.present();
  }
  callRestaurant(num) {
    console.log(num);

    this.callNumber.callNumber(num, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  cancelBooking() {
    this.cancelButtonClick = false;
    this.loginservice.updateInvitationStatus({
      id: this.bookingDetails.id,
      status: 2
    }).subscribe((res) => {
      if (res.status === 200) {
        this.alertService.presentToast('Cancel Booking Request Successfuly');
        console.log(res.data);
        this.bookingDetails.status = 2;
      }
    });
  }
}
