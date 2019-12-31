import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IonSlides, } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  userPhoneNO = null;
  nxtStage: any;
  bloggerDetail: any = {};

  seconds = 60;
  timer: any;
  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,


  ) {
    this.loginservice.masterApi().subscribe((res) => {

    });

    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.data) {
        console.log(res.data);
        if (res.data.stage >= 12) {
          this.router.navigateByUrl('/dashboard');
        }
        this.nxtStage = res.data.stage - 4;
        this.editDetails(res.data.stage - 4);
        // this.next(res.data.stage);
        this.bloggerDetail = res.data;
        if (!this.bloggerDetail.maxDistance) {
          this.bloggerDetail.maxDistance = 5;
        }
        if (!this.bloggerDetail.reviewAmount) {
          this.bloggerDetail.reviewAmount = 0;
        }
      }
    });


    // this.alertService.showLoader('Loading...');
  }
  updateObject(newObj) {
    this.bloggerDetail = newObj;
    console.log(this.bloggerDetail);
    this.nxtStage = this.bloggerDetail.stage - 4;
    this.storageService.storeData('stage', this.bloggerDetail.stage);
    this.editDetails(this.nxtStage);
  }
  ngOnInit() {
    // this.photoService.loadSaved();

    // this.slides.lockSwipes(true);
  }
  editDetails(id) {
    console.log(id);
    if (id === 7) {
      this.resendOtp();

    }
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




  saveDistance() {

    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 4,
      maxDistance: this.bloggerDetail.maxDistance

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }

  saveFoodType() {
    if (!this.bloggerDetail.foodType) {
      this.alertService.showErrorAlert('Please Select Food Type');

      return;
    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 5,
      foodType: this.bloggerDetail.foodType

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }

  saveInvitationType() {
    if (!this.bloggerDetail.invitationType) {
      this.alertService.showErrorAlert('Please Select Invitation Type');

      return;
    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 6,
      invitationType: this.bloggerDetail.invitationType

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      }
    });
  }

  saveReviewType() {
    if (!this.bloggerDetail.reviewType) {
      this.alertService.showErrorAlert('Please Select Review Type');

      return;
    }
    if (this.bloggerDetail.reviewType === 2) {
      this.bloggerDetail.reviewAmount = null;
    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 7,
      reviewAmount: this.bloggerDetail.reviewAmount,
      reviewType: this.bloggerDetail.reviewType
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }


  saveSocialUserName() {
    if (!this.bloggerDetail.fbProfile) {
      this.alertService.showErrorAlert('Please Enter fb Profile');
      return;
    }

    if (!this.bloggerDetail.instaProfile) {
      this.alertService.showErrorAlert('Please Enter Insta Profile');
      return;
    }
    if (!this.bloggerDetail.twitterProfile) {
      this.alertService.showErrorAlert('Please Enter twitter Profile');
      return;
    }
    if (!this.bloggerDetail.tripAdProfile) {
      this.alertService.showErrorAlert('Please Enter tripAd Profile');
      return;
    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 8,
      fbProfile: this.bloggerDetail.fbProfile,
      instaProfile: this.bloggerDetail.instaProfile,
      twitterProfile: this.bloggerDetail.twitterProfile,
      tripAdProfile: this.bloggerDetail.tripAdProfile,

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }

  saveAboutUser() {
    if (!this.bloggerDetail.description) {
      this.alertService.showErrorAlert('Please Tell us About You');
      return;
    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 9,
      description: this.bloggerDetail.description

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }



  isValidEmail() {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(this.bloggerDetail.email) === false) {
      // alert('Invalid Email Address');
      return false;
    }

    return true;

  }


  saveEmail() {
    if (!this.isValidEmail()) {
      this.alertService.showErrorAlert('Please Enter Valid Email Id');
      return;
    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 10,
      email: this.bloggerDetail.email

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        // this.next();
        this.seconds = 60;
        this.timer = null;
        this.resendOtp();
        this.alertService.presentToast('OTP SEND');
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }


  saveEmailOTP() {
    if (this.bloggerDetail.code === ' ') {
      this.alertService.showErrorAlert('Please Enter  OTP');

    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 11,
      email: this.bloggerDetail.email,
      code: this.bloggerDetail.code

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);

      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }

  showData() {
    this.router.navigateByUrl('/dashboard');
    console.log(this.bloggerDetail);

  }



  resendEmailOTP() {
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 10,
      email: this.bloggerDetail.email

    }).subscribe((res) => {
      if (res.status === 200) {
        // this.updateObject(res.data);
        // this.next();
        this.seconds = 60;
        this.timer = null;
        this.resendOtp();
        this.alertService.presentToast('OTP SEND');
      } else {
        this.alertService.showErrorAlert(res.message);
      }

    });
  }

  changeSeconds() {
    if ((this.seconds < 60) && (this.seconds > 0)) {
      document.getElementById('timer').innerHTML = 'Resend OTP in ' + this.seconds.toString() + 'seconds';
    }
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      clearInterval(this.timer);

    }
  }

  resendOtp() {
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.changeSeconds();
      }, 1000);
    }
  }



}
