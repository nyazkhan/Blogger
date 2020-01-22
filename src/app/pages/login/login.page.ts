import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { IonSlides, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { LoginService } from 'src/app/service/login.service';
import { OtpComponent } from './otp/otp.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  phoneNo = '';
  seconds = 60;
  otp: string;
  timer: any;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(
    @Inject(AlertService) private alertService: AlertService,
    @Inject(Router) private router: Router,
    private loginservice: LoginService,
    public modalController: ModalController,
    private storageService: StorageService

  ) {
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }


  async presentOTPModal() {
    const modal = await this.modalController.create({
      component: OtpComponent,
      componentProps: {

        phone: { phone: this.phoneNo }
      }
    });
    return await modal.present();
  }





  isValidPhone() {
    const reg = /^\d{10}$/;

    if (reg.test(this.phoneNo) === false) {
      // alert('Invalid Email Address');
      return false;
    }

    return true;

  }


  onSignInSubmit() {
    if (this.phoneNo === '') {
      this.alertService.showErrorAlert('Please Enter Mobile No');
      return;
    }
    if (!this.isValidPhone()) {
      this.alertService.showErrorAlert('Please Enter Valid Mobile No');
      return;
    }

    this.alertService.showLoader('OTP sending..');
    this.loginservice.signUp(this.phoneNo).subscribe((res) => {
      if (res.status === 200) {
        this.presentOTPModal();


      }
      this.alertService.closeLoader();

    }, (err) => {

      this.alertService.closeLoader();

    });
  }




  ngOnInit() {

  }

}
