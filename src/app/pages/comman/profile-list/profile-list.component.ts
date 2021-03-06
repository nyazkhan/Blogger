import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import { SocialprofileComponent } from '../socialprofile/socialprofile.component';
import { StorageService } from 'src/app/service/storage.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  @Input() userDetails: object;
  userDetailsCopy: any;
  dashBoardCount: any = {};
  constructor(
    @Inject(Router) private router: Router,
    navParams: NavParams,
    private loginservice: LoginService,
    private storageService: StorageService,
    public modalController: ModalController,
  ) {
    this.userDetailsCopy = navParams.get('userDetails');

  }

  ngOnInit() {
    this.getCount();
  }
  getCount() {
    this.loginservice.getDashboardCount({
      searchType: 5,
      status: 1
    }).subscribe((res) => {
      if (res.status === 200) {
        this.dashBoardCount = JSON.parse(res.data);
        console.log(this.dashBoardCount);

      }
    });
  }

  navigateTo(val) {
    this.dismiss();
    this.router.navigateByUrl(val);
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async presentSocialprofileModal() {
    const modal = await this.modalController.create({
      component: SocialprofileComponent,
      componentProps: {
        userDetails: this.userDetailsCopy
      }
    });
    return await modal.present();
  }

  LogOut() {
    this.storageService.clearData();
    this.dismiss();
    this.router.navigateByUrl('/login');
  }
}
