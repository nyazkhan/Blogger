import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IonSlides, ActionSheetController, } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { LoginService } from 'src/app/service/login.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { CameraService } from 'src/app/service/camera.service';

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
  socialIndex = 1;
  constructor(
    @Inject(AlertService) private alertService: AlertService,
    private loginservice: LoginService,
    private storageService: StorageService,
    @Inject(Router) private router: Router,
    public cameraService: CameraService,
    public actionSheetController: ActionSheetController,


  ) {
    this.loginservice.masterApi().subscribe((res) => {

    });

    this.userPhoneNO = this.storageService.getData('mobile');
    this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
      if (res.status === 200) {
        this.bloggerDetail = res.data;
        console.log(res.data);
        this.storageService.storeData('userDetails', res.data);
        // if (res.data.stage >= 12) {
        //   this.router.navigateByUrl('/dashboard');
        // }
        this.nxtStage = res.data.stage - 4;
        this.editDetails(res.data.stage - 4);
        // this.next(res.data.stage);
        if (!this.bloggerDetail.maxDistance) {
          this.bloggerDetail.maxDistance = 10;
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
    this.nxtStage = newObj.stage - 4;
    this.storageService.storeData('stage', this.bloggerDetail.stage);
    if (newObj) {

      this.storageService.storeData('userDetails', newObj);
    }

    this.editDetails(this.nxtStage);
  }
  ngOnInit() {
    // this.photoService.loadSaved();

    // this.slides.lockSwipes(true);
  }
  editDetails(id) {
    console.log(id);
    if (id === 9) {
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


  saveUserName() {

    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 4,
      name: this.bloggerDetail.name

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });
  }


  // saveProfilePic() {

  //   this.loginservice.updateBloggerDetails({
  //     mobile: this.bloggerDetail.mobile,
  //     stage: 5,
  //     maxDistance: this.bloggerDetail.maxDistance

  //   }).subscribe((res) => {
  //     if (res.status === 200) {
  //       this.updateObject(res.data);
  //     } else {
  //       this.alertService.showErrorAlert(res.message);
  //     }
  //   });
  // }



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

      images.append('mobile', this.bloggerDetail.mobile);
      images.append('file', imgData);
      images.append('type', '5');
      this.loginservice.uploadSingleImg(images).subscribe((res1) => {
        this.loginservice.getUserDetails(this.userPhoneNO).subscribe((res) => {
          if (res.status === 200) {
            this.bloggerDetail = res.data;
            this.nxtStage = res.data.stage - 4;
            if (!this.bloggerDetail.maxDistance) {
              this.bloggerDetail.maxDistance = 10;
            }
            if (!this.bloggerDetail.reviewAmount) {
              this.bloggerDetail.reviewAmount = 0;
            }
          }
        });
        this.alertService.closeLoader();
      });
    });
  }
  deleteImgByid(id) {
    this.alertService.showLoader('Deleting Image ..');
    this.loginservice.deleteImgById(this.bloggerDetail.list[0].data[0].id).subscribe((res) => {
      if (res.status === 200) {
        this.bloggerDetail.list[0].data.splice(0, 1);
        this.alertService.closeLoader();

      }
    });
  }


  goTONext() {
    if (!this.bloggerDetail.list[0].data[0]) {
      this.alertService.showErrorAlert('Please Upload The Profile Picture');
      return;
    }
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 5,
    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
      } else {
        this.alertService.showErrorAlert(res.message);
      }
    });  }





  saveDistance() {

    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 6,
      maxDistance: this.bloggerDetail.maxDistance

    }).subscribe((res) => {
      if (res.status === 200) {
        this.updateObject(res.data);
        this.slides.slideTo(3, 10);

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
      stage: 7,
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
      stage: 8,
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
      stage: 9,
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
      stage: 10,
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
      stage: 11,
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
      stage: 12,
      email: this.bloggerDetail.email

    }).subscribe((res) => {
      if (res.status === 200) {
        // this.updateObject(res.data);
        this.bloggerDetail = res.data;
        console.log(this.bloggerDetail);
        this.nxtStage = res.data.stage - 4;
        this.storageService.storeData('stage', this.bloggerDetail.stage);
        if (res.data) {
          this.storageService.storeData('userDetails', res.data);
        }
        this.next();
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
      stage: 13,
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


    if (this.bloggerDetail.status === 5) {

      this.router.navigateByUrl('/dashboard');
    }

    if (this.bloggerDetail.status === 2) {
      this.alertService.showInfoAlert('On Hold Becouse ..   ' + this.bloggerDetail.reason);
    }
    if (this.bloggerDetail.status === 4) {
      this.alertService.showInfoAlert('Please change The mention Contant..   ' + this.bloggerDetail.reason);
    }
    if (this.bloggerDetail.status === 3) {
      this.alertService.showInfoAlert('Rejected Becouse ..   ' + this.bloggerDetail.reason);
    }

    // this.router.navigateByUrl('/dashboard');
    console.log(this.bloggerDetail);

  }



  resendEmailOTP() {
    this.loginservice.updateBloggerDetails({
      mobile: this.bloggerDetail.mobile,
      stage: 12,
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
      document.getElementById('timer').innerHTML = 'OTP expire in ' + this.seconds.toString() + 'seconds';
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
