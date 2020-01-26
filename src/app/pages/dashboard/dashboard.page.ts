import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
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
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit , AfterViewInit {
  userPhoneNO = null;
  userDetails: any = {};
  restaurantDetails: any = [];

  position: any = {};

  dashBoardCount: any = {};
  commingInvitation: any = [];
  commingBooking: any = [];
  commingAppointments: any = [];

  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public modalController: ModalController,
    @Inject(Geolocation) public geolocation: Geolocation,
    private statusBar: StatusBar,

  ) {

    this.statusBar.styleDefault();
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#9dff51');

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
      this.appointments(this.position);
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

  appointments(pos) {
    this.commingBooking = [];
    this.commingInvitation = [];
    this.commingAppointments = [];
    this.loginservice.upCommingAppointents({
      searchType: 1,
      status: 10,
      durationType: 1,
      lat: pos.lat,
      lon: pos.lon

    }).subscribe((res) => {
      if (res.status === 200) {
        this.commingInvitation = res.data;

        this.loginservice.upCommingAppointents({
          searchType: 2,
          status: 10,
          durationType: 1,
          lat: pos.lat,
          lon: pos.lon

        }).subscribe((resp) => {
          if (resp.status === 200) {
            this.commingBooking = res.data;
            this.commingAppointments = res.data.concat(resp.data);
            this.commingAppointments.sort((a, b) => {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              const date1 = new Date(a.toDate);
              const date2 = new Date(b.toDate);
              return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
            });
            console.log(this.commingAppointments);

          }
        });
      }
    });
  }


  getCount() {
    this.loginservice.getDashboardCount({
      searchType: 5,
      status: null
    }).subscribe((res) => {
      if (res.status === 200) {
        this.dashBoardCount = JSON.parse(res.data);
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

    console.log(val);

    if (!val.persons) {
      this.presentInvitationModal(val);

    }
    if (val.persons) {
      this.presentBookingModal(val);
    }
  }

  async ngAfterViewInit() {
    this.statusBar.styleDefault();
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#9dff51');

  }
  async presentBookingModal(val) {

    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

        booking: val,
      }
    });
    return await modal.present();
  }
  async presentInvitationModal(val) {
    console.log(val);

    const modal = await this.modalController.create({
      component: InvitationComponent,
      componentProps: {

        invitation: val,
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
