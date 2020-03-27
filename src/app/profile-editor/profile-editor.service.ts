import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../client.info/Client';
import * as firebase from 'firebase';

@Injectable()
export class ProfileEditorService {

  constructor(private http: HttpClient) {
  }

  getCurrentUser() {
    const token = JSON.parse(JSON.stringify(firebase.auth().currentUser)).stsTokenManager.accessToken;
    return this.http.get(userUrl + '/current');
  }

  edit(client: Client) {
    return this.http.put(userUrl + '/edit', client);
  }
}

export const userUrl = 'http://localhost:8080/users/';
