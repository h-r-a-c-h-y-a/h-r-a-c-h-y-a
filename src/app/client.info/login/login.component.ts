import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ComponentCanDeactivate} from '../LeavePage.guard';
import {Observable} from 'rxjs';
import {Client} from '../Client';
import * as firebase from 'firebase';
import {SignWithSocialPagesService} from '../sign-with-social-pages/sign-with-social-pages.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, ComponentCanDeactivate {

  success = false;
  saved = false;
  loginForm: FormGroup;
  error;
  client: Client;

  constructor(private loginService: LoginService,
              private route: Router,
              private social: SignWithSocialPagesService) {
    this.loginForm = new FormBuilder().group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    });
  }

  logIn() {
    this.saved = !this.saved;
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    const isChecked = (document.getElementById('defaultChecked2') as HTMLInputElement).checked;
    if (!isChecked) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        this.login(email, password);
      });
    } else {
      this.login(email, password);
    }
  }

  login(email: string, password: string) {
    this.loginService.validateData(email, password)
      .then(resp => {
        if (resp.user.emailVerified) {
          this.loginService.login(email, password).subscribe((response: RespModel) => {
            this.client = response.client;
            localStorage.setItem('token', response.token);
            console.log(response);
            this.saved = true;
            this.route.navigate(['/shop']);
            return;
          }, error1 => {
            this.success = false;
            this.error = error1.error.message; // 'Something went wrong, please try later.';
          });
        }
        this.success = false;
        this.error = 'Please verify your email and try again.';
      })
      .catch((error) => {
        const errorCode = error.code;
        this.error = error.message;
        console.log(error);
        this.success = false;
      });
  }

  canDeactivate(): boolean | Observable<boolean> {
    this.social.isChecked = (document.getElementById('defaultChecked2') as HTMLInputElement).checked;
    if (!this.saved && !firebase.auth().currentUser) {
      return confirm('Data not saved are you sure you want to exit?');
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.success = !this.success;
    this.error = '';
    const checkbox = (document.getElementById('defaultChecked2') as HTMLInputElement);
    checkbox.addEventListener('change', ev => {
      if (!checkbox.checked) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      }
    });
  }
}

interface RespModel {
  token: string;
  client: Client;
}
