import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
  ) { }

  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
