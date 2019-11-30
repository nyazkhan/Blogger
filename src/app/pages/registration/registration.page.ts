import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { IonSlides, ActionSheetController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(AlertService) private alertService: AlertService,
    public actionSheetController: ActionSheetController,

  ) {

  }

  ngOnInit() {

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

}
