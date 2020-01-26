import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';
import { ReviewDetailsComponent } from '../review-details/review-details.component';
import { BookTableComponent } from '../book-table/book-table.component';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  @Input() userDetails: object;
  inputDetails: any = {};
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  aboutShow = true;
  detailsShow = true;
  reviewShow = true;


  reviewList: any = [];
  restaurantDetail: any = {};
  restauratMoblieNo: any;
  paymentOption = {
    cash: false,
    credit: false,
    paytm: false,
    upi: false,
  };
  position: any = {};

  constructor(
    private loginservice: LoginService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    navParams: NavParams,

    @Inject(Geolocation) public geolocation: Geolocation,
    public modalCtrl: ModalController,


  ) {
    this.inputDetails = navParams.get('userDetails');

    if (this.inputDetails.isData) {
      this.restaurantDetail = this.inputDetails.data;
      this.setImageIntoSlides();

    } else {
      // if (this.inputDetails.mobileNo) {

      this.restauratMoblieNo = this.inputDetails.mobileNo;
      this.geolocation.getCurrentPosition().then((position: Geoposition) => {
        this.position = {
          lat: position.coords.latitude, lon: position.coords.longitude,
          mobile: this.restauratMoblieNo,
          type: 1,
        };
        console.log(this.position);

        // position.coords.latitude, position.coords.longitude
        this.getRestaurantDetails();
      });
      // }


    }









  }

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  // Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }



  getReviewList(id) {
    this.loginservice.getReviewListForBlogger(id).subscribe((res) => {
      if (res.status === 200) {

        this.reviewList = res.data;
      }
    });
  }

  getRestaurantDetails() {
    this.loginservice.restaurantDetails(this.position).subscribe((res) => {
      console.log(res);
      if (res.status === 200) {

        this.restaurantDetail = res.data;
        console.log(res);
        this.getReviewList(res.data.id);
        this.setImageIntoSlides();


      }
    });
  }



  setImageIntoSlides() {
    this.sliderOne = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };

    this.restaurantDetail.list.forEach(element => {
      element.data.forEach(elem => {
        this.sliderOne.slidesItems.push(elem.storagePath);
      });
    });
    console.log(this.sliderOne);

    if (this.restaurantDetail.paymentOptions.length > 0) {
      this.restaurantDetail.paymentOptions.forEach(ele => {
        // tslint:disable-next-line: triple-equals
        if (ele == 1) {
          this.paymentOption.cash = true;

        }
        // tslint:disable-next-line: triple-equals
        if (ele == 2) {
          this.paymentOption.paytm = true;

        }
        // tslint:disable-next-line: triple-equals
        if (ele == 3) {
          this.paymentOption.upi = true;

        }
        // tslint:disable-next-line: triple-equals
        if (ele == 4) {
          this.paymentOption.credit = true;

        }
      });
    }

  }

  goBack() {

    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });

  }
  ngOnInit() {

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




  async bookTableModel() {


    const modal = await this.modalCtrl.create({
      component: BookTableComponent,
      componentProps: {

        restaurantDetail: this.restaurantDetail,
      }
    });
    return await modal.present();
  }


}
