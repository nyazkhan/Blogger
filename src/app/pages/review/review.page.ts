import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { AlertService } from 'src/app/service/alert.service';
import { ModalController } from '@ionic/angular';
import { ReviewDetailsComponent } from '../comman/review-details/review-details.component';
import { StartComponent } from './start/start.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  reviewList: any = [];
  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    public modalController: ModalController,

  ) { }

  ngOnInit() {
    this.getReviewRequestList();
  }
  getReviewRequestList() {
    this.loginservice.getReviewRequest().subscribe((res) => {
      if (res.status === 200) {

        this.reviewList = res.data;
      }
    });
  }

  async presentReviewModal() {
    const modal = await this.modalController.create({
      component: ReviewDetailsComponent,
      componentProps: {

        // reviewDetails: this.reviewList[i],
      }
    });
    return await modal.present();
  }
  async presentReatingModal(i) {
    const modal = await this.modalController.create({
      component: StartComponent,
      componentProps: {

        reviewDetails: this.reviewList[i],
      }
    });
    return await modal.present();
  }

}
