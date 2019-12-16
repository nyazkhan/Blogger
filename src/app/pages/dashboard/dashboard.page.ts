import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { SearchComponent } from './search/search.component';
import { ModalController } from '@ionic/angular';

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
    public modalController: ModalController
  ) {



    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        this.userDetails = res.data;
      }
    });
    // this.getListOfRestaurant();

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
    this.loginservice.getRestaurantList().subscribe((res) => {
      if (res.status === 200) {
        this.restaurantDetails = res.data;
      }
    });
  }

}
