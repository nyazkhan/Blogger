import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // Data passed in by componentProps
  @Input() restaurantList: object;
  @Input() position: object;

  restaurantListCopy: any;
  positionCopy: any;
  constructor(
    navParams: NavParams,
    public modalCtrl: ModalController,
    private loginservice: LoginService,
    private router: Router,


  ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('restaurantList'));
    this.restaurantListCopy = navParams.get('restaurantList');
    this.positionCopy = navParams.get('position');
  }
  getListOfRestaurant() {
    this.loginservice.getRestaurantList(this.positionCopy).subscribe((res) => {
      if (res.status === 200) {
        this.restaurantListCopy = JSON.parse(JSON.stringify(res.data));
        console.log(res);

      }
    });
  }
  test(event) {
    console.log(event.target.value);
    this.positionCopy.name = event.target.value;
    this.getListOfRestaurant();
  }
  gotToRestaurantDetailsPage(mobile) {
    this.dismiss();
    this.presentRestaurantDetailsModal(mobile);
    // this.router.navigate(['/dashboard/restaurant', mobile]);
  }

  async presentRestaurantDetailsModal(mobile) {
    const modal = await this.modalCtrl.create({
      component: RestaurantDetailsComponent,
      componentProps: {

        userDetails: {
          isData: false, data: {}, mobileNo: mobile,
        },
      }
    });
    return await modal.present();
  }


  ngOnInit() { }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
