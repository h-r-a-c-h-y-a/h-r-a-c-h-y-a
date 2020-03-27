import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {Router} from '@angular/router';

@Injectable()
export class FirebaseConfig {

  firebaseConfig = {

    };
  ui;
  uiConfig;

  constructor(private route: Router) {
    firebase.initializeApp(this.firebaseConfig);
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.uiConfig =  {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          redirectUrl = '/shop';
          return true;
        },
        uiShown : () => {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
    signInFlow: 'popup' ,
      signInSuccessUrl : '<url-to-redirect-to-on-success>' ,
      signInOptions : [{
      provider: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      signInMethod: [firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD, firebase.auth.PhoneAuthProvider.PHONE_SIGN_IN_METHOD],
    },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ] ,
      tosUrl : '<your-tos-url>' ,
      privacyPolicyUrl : 'your-privacy-policy-url'
  };
  }

  signOut() {
    firebase.auth().signOut();
  }

  getCurrentUser() {
    return new Promise<any>(((resolve, reject) => {
      const user =  firebase.auth().onAuthStateChanged(usr => {
        if (usr) {
          console.log(usr.isAnonymous);
          if (usr.isAnonymous) {
            console.log(usr.uid);
          }
          resolve(usr);
        } else {
          reject ('No user logged in');
        }
      });
    }));
  }

}
