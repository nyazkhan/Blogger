import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userPhoneNO = null;
  userDetails: any = {};
  restaurantDetails: any = {};
  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,

  ) {

    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        this.userDetails = res.data;
      }
    });
    // this.getListOfRestaurant();

  }

  ngOnInit() {
  }

  getListOfRestaurant() {
    this.loginservice.getRestaurantList().subscribe((res) => {
      if (res.status === 200) {
        this.restaurantDetails = res.data;
      }
    });
  }

}
