import { Injectable, Inject } from '@angular/core';
import { CustomHTTPService } from './custom-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(CustomHTTPService) private Http: CustomHTTPService, ) { }

  signUp(phoneNo) {
    return this.Http.post('user/save', { mobile: phoneNo, type: 2, appId: 2 });
  }
  verifyOTP(phoneNo, OTP) {
    return this.Http.post('notification/verify/otp', { mobile: phoneNo, otp: OTP, });

  }
  resendOTP(phoneNo) {
    return this.Http.post('notification/send/otp', { mobile: phoneNo });

  }

  updateBloggerDetails(details) {
    return this.Http.post('user/updateBloggerDetails', details);

  }

  getUserDetails(phoneNo) {
    return this.Http.post('user/getUserDetails', { mobile: phoneNo, type: 2 });

  }


  masterApi() {
    return this.Http.post('master/data/get', [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

  }

  uploadSingleImg(imgDetails) {
    return this.Http.post('file/uploadFile', imgDetails);

  }
  deleteImgById(id) {
    return this.Http.get('file/delete/' + id);

  }


  getRestaurantList(position) {
    return this.Http.post('search/all', position);

  }
  getRestaurantDetails(mobileNo) {
    return this.Http.post('user/getUserDetails', {
      mobile: mobileNo,
      type: 1
    });

  }
  restaurantDetails(obj) {
    return this.Http.post('user/getUserDetails', obj);

  }
  localRestaurantList() {
    // return this.http.get('./../assets/restaurant.json');

  }


  bookTable(bookingDetails) {

    return this.Http.post('connect/booking/save', bookingDetails);

  }


  getAllBooking() {
    return this.Http.get('connect/booking/get');
  }

  getAllBookingByStatus(statusId) {
    return this.Http.get('connect/booking/get/' + statusId);


  }

  getAllInvitaion() {
    return this.Http.get('connect/invitation/get');


  }

  getAllInvitaionByStatus(statusId) {
    return this.Http.get('connect/invitation/get/' + statusId);


  }

  getBlogerDetails(phoneNo) {
    return this.Http.post('user/getUserDetails', { mobile: phoneNo, type: 2 });


  }

  updateBookingStatus(statusObject) {
    return this.Http.post('connect/booking/updateStatus', statusObject);

  }
  updateInvitationStatus(statusObject) {
    return this.Http.post('connect/invitation/updateStatus', statusObject);

  }

  getReviewRequest() {
    return this.Http.get('connect/reviewRequest/get');


  }
  submitReview(rating) {
    return this.Http.post('connect/review/save', rating);

  }
  getReviewById(id) {
    return this.Http.post('connect/review/byReviewRequest/get' , id);

  }
  uploadReviewImg(imgDetails) {
    return this.Http.post('file/other/uploadFile', imgDetails);

  }


  getDashboardCount(typeOfCount) {
    return this.Http.post('connect/counts', typeOfCount);

  }



  restaurantTimeSlot(dateAndId) {
    return this.Http.post('search/rest/timeslot', dateAndId);

  }
}
