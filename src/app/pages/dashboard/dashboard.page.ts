import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { SearchComponent } from './search/search.component';
import { ModalController } from '@ionic/angular';
import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userPhoneNO = null;
  userDetails: any = {};
  restaurantDetails: any = {};

  position: any = {};




  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,
    @Inject(Geolocation) public geolocation: Geolocation,

  ) {

    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.position = {
        lat: position.coords.latitude, lon: position.coords.longitude,
        name: 'c'
      };
      // position.coords.latitude, position.coords.longitude
      this.getListOfRestaurant();
    });


    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        this.userDetails = res.data;
      }
    });

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      componentProps: {

        restaurantList: this.userDetails
      }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

  getListOfRestaurant() {
    // this.loginservice.getRestaurantList(this.position).subscribe((res) => {
    //   if (res.status === 200) {
    //     this.restaurantDetails = res.data;
    //     console.log(res);

    //   }
    // });

    this.loginservice.getRestaurantDetails('9004568745').subscribe((res) => {
      if (res.status === 200) {
        this.restaurantDetails = res.data;
        console.log(res);

      }
    });

  }

}