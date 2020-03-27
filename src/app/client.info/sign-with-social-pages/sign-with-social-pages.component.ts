/// <reference types="@types/gapi.auth2" />
import * as firebase from 'firebase';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Client} from '../Client';
import {SignWithSocialPagesService} from './sign-with-social-pages.service';
import {RegistrationService} from '../registration/registration.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FacebookService} from 'ngx-facebook';

@Component({
  selector: 'app-sign-with-social-pages',
  templateUrl: './sign-with-social-pages.component.html',
  styleUrls: ['./sign-with-social-pages.component.css'],
  providers: [RegistrationService]
})
export class SignWithSocialPagesComponent implements OnInit {

  client: Client;
  clientForm: FormGroup;

  constructor(private registerService: RegistrationService,
              private formBuilder: FormBuilder, private route: Router,
              private signWithSocialPagesService: SignWithSocialPagesService,
              private fb: FacebookService) {
    this.clientForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phones: formBuilder.array([['+374',
        [Validators.required, Validators.pattern('^[++][0-9]{9,12}')]]])
    });
  }

  ngOnInit() {
    const google = document.getElementById('google');
    const twitter = document.getElementById('twitter');
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    const tProvider = new firebase.auth.TwitterAuthProvider();
    this.signInWithFacebook(fbProvider);
    this.signInWithGoogle(googleProvider);
    this.signInWithTwitter(tProvider);
    this.signInWithGithub(githubProvider);
    this.fb.init({
      frictionlessRequests: false,
      hideFlashCallback: undefined,
      version: 'v5.0',
      appId: '541708766689462',
      status: true,
      cookie: true,
      xfbml: true
    });
  }

  signInWithFacebook(provider) {
    const facebook = document.getElementById('facebook');
    facebook.addEventListener('click', () => {
      console.log(firebase.auth().currentUser);
      if (firebase.auth().currentUser) {
        this.fb.login().then(response => {
          const credential = firebase.auth.FacebookAuthProvider.credential(
            response.authResponse.accessToken);
          firebase.auth().currentUser.linkWithCredential(credential).then((usercred) => {
            const user = usercred.user;
            console.log('Anonymous account successfully upgraded', user);
            this.signUser(usercred);
          }, (error) => {
            console.log('Error upgrading anonymous account', error);
          });
          return;
        });
        return;
      }
      firebase.auth().signInWithPopup(provider).then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        this.signUser(result);
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    });
  }

  signInWithGoogle(provider) {
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    const google = document.getElementById('google');
    google.addEventListener('click', () => {
      if (firebase.auth().currentUser) {
        const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
        firebase.auth().currentUser.linkWithCredential(credential).then((usercred) => {
          const user = usercred.user;
          console.log('Anonymous account successfully upgraded', user);
          this.signUser(usercred);
        }, (error) => {
          console.log('Error upgrading anonymous account', error);
        });
        return;
      }
      firebase.auth().signInWithPopup(provider).then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        this.signUser(result);
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    });
  }

  signInWithTwitter(provider) {
    const google = document.getElementById('twitter');
    google.addEventListener('click', () => {
      firebase.auth().signInWithPopup(provider).then(result => {
        // This gives you a Twitter Access Token. You can use it to access the Twitter API.
        this.signUser(result);
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    });
  }

  signInWithGithub(provider) {
    const github = document.getElementById('github');
    github.addEventListener('click', () => {
      firebase.auth().signInWithPopup(provider).then(result => {
        // This gives you a Twitter Access Token. You can use it to access the Twitter API.
        this.registerService.getEmail()
          .subscribe(email => {
            console.log(email);
          }, error => console.log(error));
        this.signUser(result);
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    });
  }

  isValidData(client: Client): boolean {
    return this.signWithSocialPagesService.isValidData(client);
  }

  signUser(result) {
    const uid = result.user.uid;
    // The signed-in user info.
    this.registerService.getByUID(uid)
      .subscribe((resp: Client) => {
        this.client = this.signWithSocialPagesService.client = resp;
        this.route.navigate(['/shop']);
      }, error => {
        const userInfo = result.user.providerData[0];
        // tslint:disable-next-line:max-line-length
        this.client = this.signWithSocialPagesService.client = new Client(userInfo.displayName, userInfo.email, null, [userInfo.phoneNumber]);
        this.signWithSocialPagesService.client.id = result.user.uid;
        if (!this.isValidData(this.client)) {
          this.route.navigate(['/fill-data']);
          return;
        } else {
          this.registerService.save(this.client)
            .subscribe((resp) => {
              this.route.navigate(['/shop']);
            });
        }
      });
  }

  signAnonymous() {
    if (firebase.auth().currentUser) {
      this.route.navigate(['/shop']);
      return;
    }
    firebase.auth().signInAnonymously().then(res => {
      console.log(res);
      this.route.navigate(['/shop']);
    }).catch(err => {
      console.log(err);
    });
  }
}
