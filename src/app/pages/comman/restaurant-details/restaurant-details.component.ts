import { Component, OnInit, Inject, Input } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { ReviewDetailsComponent } from '../review-details/review-details.component';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  @Input() mobileNo: object;

  restaurantDetail: any = {};
  restauratMoblieNo: any;
  paymentOption = {
    cash: false,
    credit: false,
    paytm: false,
    upi: false,
  };
  position: any = {};

  constructor(
    private loginservice: LoginService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    navParams: NavParams,

    @Inject(Geolocation) public geolocation: Geolocation,
    public modalCtrl: ModalController,


  ) {
    this.restauratMoblieNo = navParams.get('mobileNo');

  }



  getRestaurantDetails() {
    this.loginservice.restaurantDetails({
      mobile: this.restauratMoblieNo,
      type: 1,
      lat: 23.046549499999998,
      lon: 72.5393268
    }).subscribe((res) => {
      console.log(res);

      if (res.status === 200) {
        this.restaurantDetail = res.data;
        console.log(res);


        if (this.restaurantDetail.paymentOptions.length > 0) {
          this.restaurantDetail.paymentOptions.forEach(ele => {
            // tslint:disable-next-line: triple-equals
            if (ele == 1) {
              this.paymentOption.cash = true;

            }
            // tslint:disable-next-line: triple-equals
            if (ele == 2) {
              this.paymentOption.paytm = true;

            }
            // tslint:disable-next-line: triple-equals
            if (ele == 3) {
              this.paymentOption.upi = true;

            }
            // tslint:disable-next-line: triple-equals
            if (ele == 4) {
              this.paymentOption.credit = true;

            }
          });
        }


      }
    });
  }

  goBack() {

    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });

  }
  ngOnInit() {
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.position = {
        lat: position.coords.latitude, lon: position.coords.longitude,
      };
      console.log(this.position);

      // position.coords.latitude, position.coords.longitude
      this.getRestaurantDetails();
    });
  }


  async presentReviewgModal() {
    const modal = await this.modalCtrl.create({
      component: ReviewDetailsComponent,
      componentProps: {

        // userDetails: this.userDetails,
      }
    });
    return await modal.present();
  }

}
