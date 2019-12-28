import { Component, OnInit, Input, Inject } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  @Input() invitaion: object;
  invitationDetails: any = {};
  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
    @Inject(CallNumber) private callNumber: CallNumber

  ) {

    this.invitationDetails = navParams.get('invitaion');
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

}
