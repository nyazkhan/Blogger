import { Component, OnInit } from '@angular/core';
enum COLORS {
  GREY = '#e0e0e0',
  GREEN = '#76ff03',
  YELLOW = '#ffca28',
  RED = '#dd2c00'
}
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  rating1 = 2;
  rating2 = 2;
  rating3 = 2;
  rating4 = 2;
  constructor() { }

  ngOnInit() { }


  star1(index: number, id: string) {

    this.rating1 = index;
    // this.ratingChange.emit(this.rating1);
  }



  getColor(index: number, id: string) {
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:
          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green
    */
    if (this.isAboveRating(index, id)) {
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

  isAboveRating(index: number, id: string): boolean {
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.
    return index > this.getIddAndReturnVariable(id);
  }


  getIddAndReturnVariable(id) {

    if (id === '1-1') {
      return 5;

    }


    if (id === '1-2') {
      return 5;

    }


    if (id === '1-3') {
      return 5;

    }


    if (id === '1-4') {
      return 5;

    }


    if (id === '2-1') {
      return 5;

    }


    if (id === '2-2') {
      return 5;

    }


    if (id === '2-3') {
      return 5;

    }


    if (id === '2-4') {
      return 5;

    }


    if (id === '3-1') {
      return 5;

    }


    if (id === '3-2') {
      return 5;

    }


    if (id === '3-3') {
      return 5;

    }


    if (id === '3-4') {
      return 5;

    }


    if (id === '4-1') {
      return 5;

    }





  }

}
