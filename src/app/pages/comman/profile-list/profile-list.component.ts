import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import { SocialprofileComponent } from '../socialprofile/socialprofile.component';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  @Input() userDetails: object;
  userDetailsCopy: any;
  constructor(
    @Inject(Router) private router: Router,
    navParams: NavParams,
    private storageService: StorageService,
    public modalController: ModalController,
  ) {
    this.userDetailsCopy = navParams.get('userDetails');

  }

  ngOnInit() { }

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
        userDetails:  this.userDetailsCopy
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
