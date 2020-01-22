import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(
    @Inject(StorageService) private storageService: StorageService,
    private router: Router,
    private loginservice: LoginService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const stage = this.storageService.getData('stage');

    // if ((stage < 13) && (3 < stage)) {
    //   return true;
    // } else {
    //   if (stage >= 13) {

    //     this.router.navigateByUrl('/dashboard');
    //   }
    // }
    const userDetails = this.storageService.getData('userDetails');

    if (userDetails.status !== 5) {

      if ( (3 < stage)) {
        return true;
      }
      if (stage === 3) {

        this.router.navigateByUrl('/map');
      }
    } else {
      this.router.navigateByUrl('/dashboard');

    }
  }

}
