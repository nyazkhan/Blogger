import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-intro',
  templateUrl: './app-intro.component.html',
  styleUrls: ['./app-intro.component.scss'],
})
export class AppIntroComponent implements OnInit {
  slidesOpts = {
    initialSlide: 1,
    speed: 400

  };
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor( private router: Router) { }
  next() {
    this.slides.slideNext();
  }


  ngOnInit() { }
  async finish() {
    // await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/auth/login');
  }

}
