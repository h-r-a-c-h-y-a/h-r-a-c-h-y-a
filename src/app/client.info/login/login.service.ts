import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import {auth} from '../registration/registration.service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  validateData(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.http.post(auth + '/login', {email, password});
  }
}


