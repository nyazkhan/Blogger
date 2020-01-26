import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { AlertService } from 'src/app/service/alert.service';
import { ModalController } from '@ionic/angular';
import { ReviewDetailsComponent } from '../comman/review-details/review-details.component';
import { StartComponent } from './start/start.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  reviewList: any = [];
  reviewListCopy: any = [];
  uncompleteReview: any = [];
  filterBy = 'all';
  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    public modalController: ModalController,
    private statusBar: StatusBar,
  ) {

    this.statusBar.styleDefault();
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#3880ff');
 }

  ngOnInit() {
    this.getReviewRequestList();
  }
  getReviewRequestList() {
    this.loginservice.getReviewRequest().subscribe((res) => {
      if (res.status === 200) {

        this.reviewList = res.data;
        this.reviewListCopy = res.data;
      }
    });
  }

  async presentReviewModal(i) {
    const modal = await this.modalController.create({
      component: ReviewDetailsComponent,
      componentProps: {

        reviewId: { id: this.reviewList[i].id },
      }
    });
    return await modal.present();
  }
  async presentReatingModal(i) {
    const modal = await this.modalController.create({
      component: StartComponent,
      componentProps: {

        reviewId: { id: this.reviewList[i].id },
      }
    });
    return await modal.present();
  }

  filterResponse(val) {
    this.filterBy = val;

    if (val === 'all') {
      this.reviewList = this.reviewListCopy;

    }
    if (val === 'pending') {
      this.reviewList = this.reviewListCopy.filter((el) => {
        return (el.status === 9);
      });

    }

    if (val === 'InProgres') {
      this.reviewList = this.reviewListCopy.filter((el) => {
        return (el.status === 11);
      });

    }
    if (val === 'complete') {
      this.reviewList = this.reviewListCopy.filter((el) => {
        return (el.status === 13);
      });

    }

  }
  navigateByStatus(status, index) {
    if ((status === 9) || (status === 11)) {
      this.presentReatingModal(index);
    }
    if (status === 13) {
      this.presentReviewModal(index);
    }
  }
}
