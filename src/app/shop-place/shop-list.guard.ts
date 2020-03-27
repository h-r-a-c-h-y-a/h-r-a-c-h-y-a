import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';
import {FirebaseConfig} from '../firebase/firebase.config';

@Injectable()
export class ShopListGuard implements CanActivate {

  constructor(private cookie: CookieService,
              private route: Router,
              private firebaseConfig: FirebaseConfig) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean> | boolean {

    return new Promise<boolean>((resolve, reject) => {
      this.firebaseConfig.getCurrentUser().then(user => {
        return resolve(true);
      }, error => {
        alert('Login only to authorized users\n Please register or login in system.');
        this.route.navigate(['/login']);
        return resolve(false);
      });
    });
  }

}
