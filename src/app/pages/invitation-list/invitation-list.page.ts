import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { InvitationComponent } from '../comman/invitation/invitation.component';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
})
export class InvitationListPage implements OnInit {
  invitaionList: any = [];
  invitaionListCopy: any = [];


  pastInvitation: any = [];
  upcomingInvitation: any = [];
  constructor(
    public modalController: ModalController,
    // navParams: NavParams,
    private loginservice: LoginService,
  ) { }

  ngOnInit() {
    this.getInvitationList();
  }



  getInvitationList() {
    this.loginservice.getAllInvitaion().subscribe((res) => {
      if (res.status === 200) {
        this.invitaionList = res.data;
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

        invitaion: this.invitaionList[i],
      }
    });
    return await modal.present();
  }

  filterInvitationByCurrentDate(val) {
    this.invitaionListCopy = this.invitaionList;
    if (val === 'past') {
      this.pastInvitation = this.invitaionListCopy.filter((el) => {
        return el.date < new Date();
      });

    }
    if (val === 'next') {
      this.upcomingInvitation = this.invitaionListCopy.filter((el) => {
        return el.date >= new Date();
      });

    }
  }

}
