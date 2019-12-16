import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantDetail: any = {};

  paymentOption = {
    cash: false,
    credit: false,
    paytm: false,
    upi: false,
  };

  constructor(
    private loginservice: LoginService,

  ) { }

  ngOnInit() {
    this.loginservice.localRestaurantList().subscribe((res) => {
      this.restaurantDetail = res;
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


    });
  }
}
