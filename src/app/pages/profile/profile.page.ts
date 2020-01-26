import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/service/storage.service';
import { ReviewDetailsComponent } from '../comman/review-details/review-details.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  BloggerMoblieNo: any;
  bloggerDetails: any = {};


  aboutShow = true;
  detailsShow = true;
  reviewShow = true;


  reviewList: any = [];
  constructor(

    private loginservice: LoginService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    // navParams: NavParams,
    private storageService: StorageService,

    public modalCtrl: ModalController,

    private statusBar: StatusBar,

  ) {

    this.statusBar.styleDefault();
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#3880ff');


    this.BloggerMoblieNo = this.storageService.getData('mobile');
    this.getBloggerDetails();
  }

  ngOnInit() {
  }

  getBloggerDetails() {
    this.loginservice.getBlogerDetails(this.BloggerMoblieNo).subscribe((res) => {
      if (res.status === 200) {
        this.bloggerDetails = res.data;
        this.getListOfReviews();
      }
    });
  }

  goBack() {

    this.router.navigateByUrl('/dashboard');

  }


  goToEditProfile() {
    this.storageService.storeData('edit', true);
    this.router.navigateByUrl('/registration');

  }


  async presentReviewModal(reviewId) {
    const modal = await this.modalCtrl.create({
      component: ReviewDetailsComponent,
      componentProps: {

        reviewId: { id: reviewId },
      }
    });
    return await modal.present();
  }



  getListOfReviews() {
    this.loginservice.getReviewList().subscribe((res) => {
      if (res.status === 200) {
        this.reviewList = res.data.filter((el) => {
          return (el.status === 13);
        });


      }
    });
  }
}
