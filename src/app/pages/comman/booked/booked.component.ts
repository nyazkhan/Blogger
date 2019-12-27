import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss'],
})
export class BookedComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    @Inject(CallNumber) private callNumber: CallNumber
  ) { }

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

}
