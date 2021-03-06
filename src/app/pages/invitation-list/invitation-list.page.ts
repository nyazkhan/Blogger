import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { InvitationComponent } from '../comman/invitation/invitation.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
})
export class InvitationListPage implements OnInit {
  invitaionList: any = [];
  invitaionListCopy: any = [];

  filterBy = 'all';
  pastInvitation: any = [];
  upcomingInvitation: any = [];
  constructor(
    public modalController: ModalController,
    // navParams: NavParams,
    private statusBar: StatusBar,

    private loginservice: LoginService,
  ) {

    this.statusBar.styleDefault();
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#3880ff');
 }

  ngOnInit() {
    this.getInvitationList();
  }



  getInvitationList() {
    this.loginservice.getAllInvitaion().subscribe((res) => {
      if (res.status === 200) {
        this.invitaionList = res.data;
        this.invitaionListCopy = res.data;
      }
    });
  }

  getInvitationListBystatus(statusId) {
    this.loginservice.getAllInvitaionByStatus(statusId).subscribe((res) => {
      if (res.status === 200) {
        this.invitaionList = res.data;

      }
    });
  }


  async presentInvitationModal(i) {
    const modal = await this.modalController.create({
      component: InvitationComponent,
      componentProps: {

        invitation: this.invitaionList[i],
      }
    });
    return await modal.present();
  }


  filterResponse(val) {
    this.filterBy = val;
    if (this.filterBy === 'all') {

      this.invitaionList = this.invitaionListCopy;
      return;
    }


    this.filterInvitationByCurrentDate(val);


  }





  filterInvitationByCurrentDate(val) {
    if (val === 'cancel') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {
        console.log(el.status);

        return (el.status === 3) || (el.status === 17);
      });

    }
    if (val === 'next') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {
        return (el.status === 10);
      });

    }

    if (val === 'opend') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {
        return (el.status === 1);
      });

    }
    if (val === 'past') {
      this.invitaionList = this.invitaionListCopy.filter((el) => {
        return (el.status === 16) || (el.status === 13);
      });

    }
    console.log(this.invitaionList);

  }

}
