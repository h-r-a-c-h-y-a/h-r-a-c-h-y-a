import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(url: string) {
    let header = new HttpHeaders();
    header = this.createAuthHeader(header);
    const token = JSON.parse(JSON.stringify(firebase.auth().currentUser)).stsTokenManager.accessToken;
    return this.http.get(url, {
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${token}`
      }
    });
  }

  put(url: string, body: any) {
    let header = new HttpHeaders();
    header = this.createAuthHeader(header);
    const token = JSON.parse(JSON.stringify(firebase.auth().currentUser)).stsTokenManager.accessToken;
    return this.http.put(url, body,  {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  post(url: string, body: any) {
    let header = new HttpHeaders();
    header = this.createAuthHeader(header);
    return this.http.post(url, body, {
      headers: header
    });
  }

  delete(url: string) {
    let header = new HttpHeaders();
    header = this.createAuthHeader(header);
    return this.http.delete(url, {
      headers: header
    });
  }

  patch(url: string, body: any) {
    let header = new HttpHeaders();
    header = this.createAuthHeader(header);
    return this.http.patch(url, body, {
      headers: header
    });
  }

  private createAuthHeader(header: HttpHeaders) {
    const token = JSON.parse(JSON.stringify(firebase.auth().currentUser)).stsTokenManager.accessToken;
    return header.set('Authorization',  `Bearer ${token}`);
  }
}
