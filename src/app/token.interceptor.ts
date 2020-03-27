import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(JSON.stringify(firebase.auth().currentUser)).stsTokenManager.accessToken;
    // req = req.clone({headers: req.headers.set('Access-Control-Request-Headers', 'Authorization, X-Custom-Header')});
    // req = req.clone({headers: req.headers.set('Access-Control-Allow-Credentials', 'true')});
    // req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    // if (!req.headers.has('Accept')) {
    //   req = req.clone({headers: req.headers.set('Accept', 'application/json')});
    // }
    if (req.url.startsWith('https')){
      req = req.clone({ headers: req.headers.set('Authorization', `token ${token}`) });
    } else {
    req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    }
    // const clonedRequest = req.clone({
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer ${token}`)
    //     .set('Content-Type', 'application/json')
    // });
    return next.handle(req);
  }

}
