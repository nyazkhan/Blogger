import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/service/login.service';
import { BookedComponent } from '../booked/booked.component';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})
export class BookTableComponent implements OnInit {
  @Input() restaurantDetail: object;
  restaurantListCopy: any = {};
  personCount = 1;
  currentDate = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  maxDate = ((new Date()).getFullYear() + 1) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate();
  bookingDetails = {
    id: null,
    persons: 1,
    bookingDate: this.currentDate,
    bookingTime: '15:59',
    bookingTo: null
  };


  constructor(
    public modalController: ModalController,
    navParams: NavParams,
    private loginservice: LoginService,
  ) {
    console.log(this.bookingDetails);

    this.restaurantListCopy = navParams.get('restaurantDetail');

  }

  ngOnInit() { }

  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }


  noOfPerson(no) {

    if ((no === 1) && (this.bookingDetails.persons > 1)) {
      this.bookingDetails.persons--;
    }
    if ((this.bookingDetails.persons < 6) && (no === 2)) {
      this.bookingDetails.persons++;
    }
  }
  async presentBookedModelModal() {
    const modal = await this.modalController.create({
      component: BookedComponent,
      componentProps: {

      }
    });
    return await modal.present();
  }

  bookTable() {
    // this.back();
    // this.presentBookedModelModal();
    this.bookingDetails.bookingTo = this.restaurantListCopy.id;
    this.loginservice.bookTable(this.bookingDetails).subscribe((res: any) => {
      if (res.status === 200) {
        this.back();
        this.presentBookedModelModal();
      }
    });
  }
}
