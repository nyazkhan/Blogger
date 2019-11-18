import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { BASEURL } from './app.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomHTTPService {

  url: string = BASEURL;

  constructor(public http: HttpClient, public storage: StorageService, public router: Router, public alertService: AlertService) { }

  getHeaders(optHeaders?: HttpHeaders) {
    let headers = new HttpHeaders();
    if (this.storage.getData('ngStorage-token')) {
      headers = headers.set(
        'Authorization',
        'Bearer ' + this.storage.getData('ngStorage-token')
      );
    }
    if (optHeaders) {
      for (const optHeader of optHeaders.keys()) {
        headers = headers.append(optHeader, optHeaders.get(optHeader));
      }
    }
    return headers;
  }

  get(endpoint: string, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .get(this.url + '/' + endpoint, { headers: header, observe: 'response' })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  post(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .post(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response',
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }


  put(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response'
      }).pipe(map(this.extractData), catchError(this.handleError));

  }

  delete(endpoint: string, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .delete(this.url + '/' + endpoint, {
        headers: header,
        observe: 'response'
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }

  patch(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const header = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: header,
        observe: 'response'
      })
      .pipe(map(this.extractData), catchError(this.handleError));

  }

  extractData(response: HttpResponse<any>) {
    return response.body || response.status;
  }

  handleError = (errorResponse: HttpErrorResponse) => {
    switch (errorResponse.status) {
      case 401:
        this.router.navigate(['/login']).then(() => {
          this.alertService.showErrorAlert(errorResponse.error.message);
        });
        this.storage.clearData();
        break;
      case 0:
        this.alertService.showErrorAlert('You don\'t seem to have an active internet connection. Please connect and try again.');
        break;
      default:
        this.alertService.showErrorAlert(errorResponse.error.message);
        break;
    }
    return throwError(errorResponse);
  }
}
