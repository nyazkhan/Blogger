import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // Data passed in by componentProps
  @Input() restaurantList: object;


  constructor(
    navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('restaurantList'));
  }
  ngOnInit() { }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
