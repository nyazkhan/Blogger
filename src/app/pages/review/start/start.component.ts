import { Component, Input, OnInit, EventEmitter, Output, ViewChild, Inject } from '@angular/core';
import { IonSlides, ModalController, NavParams, ActionSheetController, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { AlertService } from 'src/app/service/alert.service';
import { CameraService } from 'src/app/service/camera.service';
import { StorageService } from 'src/app/service/storage.service';

enum COLORS {
  GREY = '#e0e0e0',
  GREEN = '#76ff03',
  YELLOW = '#ffca28',
  RED = '#dd2c00'
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  rating11: number;
  rating12: number;
  rating13: number;
  rating14: number;
  rating21: number;
  rating22: number;
  rating23: number;
  rating24: number;
  rating31: number;
  rating32: number;
  rating33: number;
  rating34: number;
  rating41: number;
  description: string;
  ratingObject: any = {};
  idOfReview: any = {};
  @Input() reviewId: object;
  reviewDetail: any = {};
  starValue = {
    star1: null,
    star2: null,
    star3: null,
    star4: null,
  };

  // @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
    @Inject(AlertService) private alertService: AlertService,
    private storageService: StorageService,
    public cameraService: CameraService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) {

    this.idOfReview = navParams.get('reviewId');
    console.log(this.reviewDetail);
    if (this.idOfReview.id) {

      this.getReviewById();
    } else {
      this.back();
    }
  }

  getReviewById() {
    this.loginservice.getReviewById(this.idOfReview.id).subscribe((res) => {
      console.log();
      if (res.status === 200) {
        this.reviewDetail = res.data;
        if (res.data.reviewQueAns) {
          if (res.data.reviewQueAns.length < 1) {
            this.goToSlide(0);
          } else {
            this.goToSlide(res.data.reviewQueAns.length);
            console.log(res.data.reviewQueAns.length);

          }
        }
      }
    });
  }

  goToSlide(id) {
    this.slides.slideTo(id, 10);

  }
  next() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  previous() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  star(index: number, i, j) {
    this['rating' + i + j] = index;


  }
  getColor(index: number, rating: any) {
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:
          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green
    */
    if (this.isAboveRating(index, rating)) {
      return COLORS.GREY;
    }
    switch (rating) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.GREEN;
      case 4:
      case 5:
        return COLORS.YELLOW;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number, rating): boolean {
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
    return index > rating;
  }

  ngOnInit() { }
  back() {
    this.modalController.dismiss({
      dismissed: true
    });


  }




  saveFoodRatting() {
    if (!this.rating11) {
      this.alertService.showErrorAlert('Prease Rate Presentation');
      return;
    }

    if (!this.rating12) {
      this.alertService.showErrorAlert('Prease Rate Plating');
      return;
    }


    if (!this.rating13) {
      this.alertService.showErrorAlert('Prease Rate Taste');
      return;
    }


    if (!this.rating14) {
      this.alertService.showErrorAlert('Prease Rate Texture / Mouth Fill');
      return;
    }

    this.saveRatting({
      reviewRequestId: this.reviewDetail.id,
      stage: 1,
      mainQuestionId: 1,
      queAnsList: [
        {
          questionId: 1,
          answer: this.rating11
        },
        {
          questionId: 2,
          answer: this.rating12
        },
        {
          questionId: 3,
          answer: this.rating13
        },
        {
          questionId: 4,
          answer: this.rating14
        }
      ]

    });

  }
  saveServiceRatting() {
    if (!this.rating21) {
      this.alertService.showErrorAlert('Prease Rate Cleanliness');
      return;
    }

    if (!this.rating22) {
      this.alertService.showErrorAlert('Prease Rate Understanding of Menu');
      return;
    }


    if (!this.rating23) {
      this.alertService.showErrorAlert('Prease Rate Attitute');
      return;
    }


    if (!this.rating24) {
      this.alertService.showErrorAlert('Prease Rate Promptness');
      return;
    }
    this.saveRatting({
      reviewRequestId: this.reviewDetail.id,
      stage: 2,
      mainQuestionId: 2,
      queAnsList: [
        {
          questionId: 5,
          answer: this.rating21
        },
        {
          questionId: 6,
          answer: this.rating22
        },
        {
          questionId: 7,
          answer: this.rating23
        },
        {
          questionId: 8,
          answer: this.rating24
        }
      ]

    });

  }
  saveAmbienceRatting() {
    if (!this.rating31) {
      this.alertService.showErrorAlert('Prease Rate Cleanliness');
      return;
    }

    if (!this.rating32) {
      this.alertService.showErrorAlert('Prease Rate Lighting');
      return;
    }


    if (!this.rating33) {
      this.alertService.showErrorAlert('Prease Rate Music ');
      return;
    }


    if (!this.rating34) {
      this.alertService.showErrorAlert('Prease Rate Overall Fell');
      return;
    }
    this.saveRatting({
      reviewRequestId: this.reviewDetail.id,
      stage: 3,
      mainQuestionId: 3,
      queAnsList: [
        {
          questionId: 5,
          answer: this.rating31
        },
        {
          questionId: 9,
          answer: this.rating32
        },
        {
          questionId: 10,
          answer: this.rating33
        },
        {
          questionId: 11,
          answer: this.rating34
        }
      ]

    });

  }
  saveMoneyRatting() {
    if (!this.rating41) {
      this.alertService.showErrorAlert('Prease Rate  Value for Money ');
      return;
    }
    this.saveRatting({
      reviewRequestId: this.reviewDetail.id,
      stage: 4,
      mainQuestionId: 4,
      queAnsList: [
        {
          questionId: 12,
          answer: this.rating41
        },

      ]

    });

  }




  saveDecreptionRating() {
    this.loginservice.submitReview(
      {
        reviewRequestId: this.reviewDetail.id,
        stage: 5,
        description: this.description
      }
    ).subscribe((res) => {
      if (res.status === 200) {
        this.alertService.showInfoAlert('Review Submit Successfuly');
        this.back();
      }
    });
  }
  saveRatting(ratObj) {
    this.loginservice.submitReview(ratObj).subscribe((res) => {
      if (res.status === 200) {
        this.next();
      }

    });
  }
  async presentFinamlSubmitConfirm() {
    const alert = await this.alertController.create({
      header: 'Final Submit!',
      message: '<strong> After submit you can not Upload images.</strong> <br> Please Uplaod Image frist then submit !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Submit',
          handler: () => {
            this.saveDecreptionRating();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheetForCamera() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Take Picture',
        // role: 'destructive',
        icon: 'camera',
        handler: () => {

          this.saveImage('camera');

        }
      }, {
        text: 'Gallery',
        // role: 'destructive',
        icon: 'images',
        handler: () => {

          this.saveImage('gallery');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  saveImage(from) {
    this.cameraService.takeImage(from).then((imgData) => {
      this.alertService.showLoader('Uploading Image');
      const images = new FormData();

      images.append('mobile', this.storageService.getData('mobile'));
      images.append('file', imgData);
      images.append('type', '6');
      images.append('otherId', this.reviewDetail.id);
      this.loginservice.uploadReviewImg(images).subscribe((res) => {
        this.alertService.closeLoader();
        this.getReviewById();
      });
    });
  }

  deleteImgByid(id, index) {
    this.alertService.showLoader('Deleting Image ..');
    this.loginservice.deleteImgById(id).subscribe((res) => {
      if (res.status === 200) {
        this.reviewDetail.list.splice(index, 1);
        this.alertService.closeLoader();

      }
    });
  }
}
