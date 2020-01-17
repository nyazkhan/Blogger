import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { SearchComponent } from '../comman/search/search.component';
import { ModalController } from '@ionic/angular';
import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { ProfileListComponent } from '../comman/profile-list/profile-list.component';
import { RestaurantDetailsComponent } from '../comman/restaurant-details/restaurant-details.component';
import { BookedComponent } from '../comman/booked/booked.component';
import { InvitationComponent } from '../comman/invitation/invitation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userPhoneNO = null;
  userDetails: any = {};
  restaurantDetails: any = [];

  position: any = {};

  dashBoardCount: any = {};


  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,
    @Inject(Geolocation) public geolocation: Geolocation,

  ) {
    this.loginservice.masterApi().subscribe((res) => {
      console.log(res);

    });
    this.getCount();
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.position = {
        lat: position.coords.latitude, lon: position.coords.longitude,
        name: '',
        searchType: 1

      };
      console.log(this.position);

      // position.coords.latitude, position.coords.longitude
      this.getListOfRestaurant();
    });


    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        this.userDetails = res.data;
        // this.storageService.storeData('userDetails', res.data);
      }
    });

  }
  getCount() {
    this.loginservice.getDashboardCount({
      searchType: 5,
      status: null
    }).subscribe((res) => {
      if (res.status === 200) {
        this.dashBoardCount = JSON.parse( res.data);
        console.log(this.dashBoardCount);

      }
    });
  }

  async presentRestaurantSearchModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      componentProps: {

        restaurantList: this.restaurantDetails,
        position: this.position,
      }
    });
    return await modal.present();
  }
  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileListComponent,
      componentProps: {

        userDetails: this.userDetails,
      }
    });
    return await modal.present();
  }
  async presentRestaurantDetailsModal(mobile) {
    const modal = await this.modalController.create({
      component: RestaurantDetailsComponent,
      componentProps: {

        userDetails: {
          isData: false, data: {}, mobileNo: mobile,
        },
      }
    });
    return await modal.present();
  }


  appointmenType(val) {
    if (val === 'invitaion') {
      this.presentInvitationModal();

    }
    if (val === 'booking') {
      this.presentBookingModal();
    }
  }


  async presentBookingModal() {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        // userDetails: this.userDetails,
      }
    });
    return await modal.present();
  }
  async presentInvitationModal() {
    const modal = await this.modalController.create({
      component: InvitationComponent,
      componentProps: {

        // invitaion: invitaion details jayegi yaha se,
      }
    });
    return await modal.present();
  }


  ngOnInit() {
  }

  getListOfRestaurant() {
    this.loginservice.getRestaurantList(this.position).subscribe((res) => {
      if (res.status === 200) {
        this.restaurantDetails = res.data;
        console.log(res);

      }
    });

    // this.loginservice.getRestaurantDetails('9512015723').subscribe((res) => {
    //   if (res.status === 200) {
    //     this.restaurantDetails = res.data;
    //     console.log(res);

    //   }
    // });

  }

}
