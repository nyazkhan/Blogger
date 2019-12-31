import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-socialprofile',
  templateUrl: './socialprofile.component.html',
  styleUrls: ['./socialprofile.component.scss'],
})
export class SocialprofileComponent implements OnInit {
  @Input() userDetails: object;
  userDetailsCopy: any = {};
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
  ) {
    this.userDetailsCopy = navParams.get('userDetails');
  }

  ngOnInit() { }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
