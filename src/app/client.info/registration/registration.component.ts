import {Component, OnInit} from '@angular/core';
import {Client} from '../Client';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from './registration.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ComponentCanDeactivate} from '../LeavePage.guard';
import {MatDialog} from '@angular/material';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, ComponentCanDeactivate {
  isFailed = true;
  saved = false;
  successMessage = 'An email confirmation link has been sent to your email. please click on it';
  errorMessage = 'Registration failed.. Please try later.';
  client: Client;
  clientForm: FormGroup;

  constructor(private registerService: RegistrationService,
              private formBuilder: FormBuilder,
              private route: Router, private dialog: MatDialog) {
    this.clientForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phones: formBuilder.array([['+374',
        [Validators.required, Validators.pattern('^[++][0-9]{9,12}')]]]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    });


  }

  addPhone() {
    (this.clientForm.controls.phones as FormArray).push(new FormControl('+374',
      [Validators.required, Validators.pattern('^[++][0-9]{9,12}')]));
  }

  deletePhone() {
    (this.clientForm.controls.phones as FormArray).removeAt((this.clientForm.controls.phones as FormArray).length - 1);
  }

  confirm(password, confirmPassword) {
    return this.registerService.passwordValidator(password, confirmPassword);
  }

  register() {
    this.saved = !this.saved;
    const name = this.clientForm.controls.name.value;
    const email = this.clientForm.controls.email.value;
    const password = this.clientForm.controls.password.value;
    const phones = (this.clientForm.controls.phones as FormArray).getRawValue();
    const newClient = new Client(name, email, password, phones);
    const dialogRef = this.dialog.open(DialogContentExampleComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registerService.register(newClient).then(() => {
        }).catch((error) => {
          this.errorMessage = error.message;
          this.isFailed = true;
        });
      } else {
        this.registerService.client = newClient;
        this.route.navigate(['/verify-phone-number']);
        return;
      }
    });
  }

  ngOnInit() {
    this.isFailed = !this.isFailed;
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.saved && !firebase.auth().currentUser) {
      return confirm('Data not saved are you sure you want to exit?');
    } else {
      return true;
    }
  }
}
// export let client;

@Component({
  template: `
         <p>choose confirmation method</p>
    <mat-dialog-actions align="end">
    <div class="dialog">
      <button mat-button [mat-dialog-close]="false">With Phone Number</button>
      <button mat-button [mat-dialog-close]="true">With Email</button>
    </div>
    </mat-dialog-actions>
  `,
  styles: [`div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: stretch;
  }
  p{
    text-align: center;
    padding: 1rem;
    font-family: monospace;
    font-style: oblique;
    font-weight: bold;
    color: darkblue;
  }
  button{    background-color: aliceblue;}
  button:hover {background-color: aquamarine; color: black}`]
})
export class DialogContentExampleComponent {}

