import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  @Input() invitaion: object;
  invitationDetails: any = {};
  cancelButtonClick = false;

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
    @Inject(CallNumber) private callNumber: CallNumber,
    @Inject(AlertService) private alertService: AlertService,

  ) {

    this.invitationDetails = navParams.get('invitaion');
    console.log(this.invitationDetails);

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
      status: 5
    }).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.data);
        this.invitationDetails.status = 5;
        this.alertService.presentToast('Accept Invitation Request Successfuly');

      }
    });
  }


}
