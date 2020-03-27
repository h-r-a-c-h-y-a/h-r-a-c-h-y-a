import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../Client';
import * as firebase from 'firebase';
import {FirebaseConfig} from '../../firebase/firebase.config';
import {Router} from '@angular/router';
import {userUrl} from '../../profile-editor/profile-editor.service';

@Injectable()
export class RegistrationService {
  successMessage = 'An email confirmation link has been sent to your email. please click on it';
  client: Client;
  constructor(private http: HttpClient,
              private firebaseConfig: FirebaseConfig,
              private route: Router) {
    if (firebaseConfig.ui.isPendingRedirect()) {
      firebaseConfig.ui.start('#firebaseui-auth-container', firebaseConfig.uiConfig);
    }
    if ((firebase.auth().isSignInWithEmailLink(window.location.href))) {
      firebaseConfig.ui.start('#firebaseui-auth-container', firebaseConfig.uiConfig);
    }
  }

  passwordValidator(password: string, confirmPassword: string): boolean {
    return password.trim() === confirmPassword.trim();
  }

  register(client: Client) {
    if (firebase.auth().currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        client.email, client.password);
      firebase.auth().currentUser.linkWithCredential(credential).then((auth) => {
        console.log('Anonymous account successfully upgraded', auth);
        this.client = client;
        this.client.id = auth.user.uid;
        if (auth.user && auth.user.emailVerified === false) {
          auth.user.sendEmailVerification().then(() => {
            this.save(this.client).subscribe(response => {
              alert(this.successMessage);
              this.route.navigate(['/login']);
              return;
            }, error => {
              this.unregister();
            });
          });
        }
      }, (error) => {
        console.log('Error upgrading anonymous account', error);
      });
      return;
    }
    return firebase.auth().createUserWithEmailAndPassword(client.email, client.password)
      .then(auth => {
        this.client = client;
        this.client.id = auth.user.uid;
        if (auth.user && auth.user.emailVerified === false) {
          auth.user.sendEmailVerification().then(() => {
            this.save(this.client).subscribe(response => {
              alert(this.successMessage);
              this.route.navigate(['/login']);
              return;
            }, error => {
              this.unregister();
            });
          });
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    // firebase.auth().sendSignInLinkToEmail(client.email, {
    //   url: 'http://localhost:4200/login',
    //   handleCodeInApp: true
    // }).then(() => {
    //
    // });
  }

  unregister() {
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
      this.route.navigate(['/login']);
      return;
    }).catch((error) => {
      console.log(error);
    });
  }

  save(client: Client) {
    return this.http.post(auth + '/register', client);
  }


  getByUID(uid: string) {
    return this.http.get(userUrl + '/user/' + uid);
  }

  getEmail() {
    return this.http.get('https://api.github.com/user/emails', {headers: {
        Authorization: `token ${(JSON.parse(JSON.stringify(firebase.auth().currentUser)).stsTokenManager.accessToken)}`
      }});
  }
}

export const auth = 'http://localhost:8080/auth';

