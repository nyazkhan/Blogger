import { Injectable, Inject } from '@angular/core';
import { CustomHTTPService } from './custom-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(CustomHTTPService) private Http: CustomHTTPService, public http: HttpClient, ) { }

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
    return this.Http.post('master/data/get', [1, 2, 3, 4]);

  }

  uploadSingleImg(imgDetails) {
    return this.Http.post('file/uploadFile', imgDetails);

  }
  deleteImgById(id) {
    return this.Http.get('file/delete/' + id);

  }


  getRestaurantList(position) {
    return this.Http.post('search/restaurant', position);

  }
getRestaurantDetails(mobileNo) {
  return this.Http.post('user/getUserDetails', {
    mobile : mobileNo,
    type : 1
  });

}

  localRestaurantList() {
    return this.http.get('./../assets/restaurant.json');

  }

}