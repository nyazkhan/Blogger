import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertService } from 'src/app/service/alert.service';
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  @Input() invitaion: object;
  invitationDetails: any = {};
  cancelButtonClick = false;
  bloggerDetails: any = {};
  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
    @Inject(CallNumber) private callNumber: CallNumber,
    @Inject(AlertService) private alertService: AlertService,
    private storageService: StorageService,

  ) {

    this.invitationDetails = navParams.get('invitaion');
    console.log(this.invitationDetails);
    this.bloggerDetails = this.storageService.getData('userDetails');
  }

  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  callRestaurant(num) {
    console.log(num);

    this.callNumber.callNumber(num, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }



  cancelInvitation() {
    this.cancelButtonClick = false;
    this.loginservice.updateInvitationStatus({
      id: this.invitationDetails.id,
      status: 3
    }).subscribe((res) => {
      if (res.status === 200) {
        this.alertService.presentToast('Reject Invitation Request Successfuly');
        console.log(res.data);
        this.invitationDetails.status = 3;
      }
    });
  }
  acceptinvitation() {
    this.loginservice.updateInvitationStatus({
      id: this.invitationDetails.id,
      status: 10
    }).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.invitationDetails.status = 10;
        this.alertService.presentToast('Accept Invitation Request Successfuly');

      }
    });
  }


  async presentRestaurantDetailsModal() {
    const modal = await this.modalController.create({
      component: RestaurantDetailsComponent,
      componentProps: {

        userDetails: {
          isData: true, data: this.invitationDetails.userDetails, mobileNo: null,
        },
      }
    });
    return await modal.present();
  }
}
