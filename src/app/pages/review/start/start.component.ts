import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

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

  @Input() rating1: number;
  @Input() rating2: number;
  @Input() rating3: number;
  @Input() rating4: number;




  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  star1(index: number) {

    this.rating1 = index;
    this.ratingChange.emit(this.rating1);
  }
  star2(index: number) {

    this.rating2 = index;
    this.ratingChange.emit(this.rating2);
  }
  star3(index: number) {

    this.rating3 = index;
    this.ratingChange.emit(this.rating3);
  }
  star4(index: number) {

    this.rating4 = index;
    this.ratingChange.emit(this.rating4);
  }

  getColor(index: number, id: any) {
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:
          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green
    */
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    switch (this.rating1) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
    return index > this.rating1;
  }

  ngOnInit() { }

}
