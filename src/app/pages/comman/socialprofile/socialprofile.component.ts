import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-socialprofile',
  templateUrl: './socialprofile.component.html',
  styleUrls: ['./socialprofile.component.scss'],
})
export class SocialprofileComponent implements OnInit {

  constructor(
    public modalController: ModalController,

  ) { }

  ngOnInit() {}


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
