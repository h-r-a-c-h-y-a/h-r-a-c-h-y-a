import { Component, OnInit } from '@angular/core';
import {Client} from '../Client';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../registration/registration.service';
import {Router} from '@angular/router';
import {SignWithSocialPagesService} from '../sign-with-social-pages/sign-with-social-pages.service';

@Component({
  selector: 'app-data-fill',
  templateUrl: './data-fill.component.html',
  styleUrls: ['./data-fill.component.css'],
  providers: [RegistrationService]
})
export class DataFillComponent implements OnInit {

  client: Client;
  clientForm: FormGroup;

  constructor(private registerService: RegistrationService,
              private formBuilder: FormBuilder, private route: Router,
              private signWithSocialPagesService: SignWithSocialPagesService) {
    this.clientForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phones: formBuilder.array([['+374',
        [Validators.required, Validators.pattern('^[++][0-9]{9,12}')]]])
    });
  }

  ngOnInit(): void {
    this.client = this.signWithSocialPagesService.client;
  }

  addPhone() {
    (this.clientForm.controls.phones as FormArray).push(new FormControl('+374',
      [Validators.required, Validators.pattern('^[++][0-9]{9,12}')]));
  }

  deletePhone() {
    (this.clientForm.controls.phones as FormArray).removeAt((this.clientForm.controls.phones as FormArray).length - 1);
  }

  register() {
    const name = this.clientForm.controls.name.value;
    const email = this.clientForm.controls.email.value;
    const phones = (this.clientForm.controls.phones as FormArray).getRawValue();
    const newClient = new Client(name, email, null, phones);
    newClient.id = this.client.id;
    this.registerService.save(newClient).subscribe((resp) => {
      this.route.navigate(['/shop']);
    });
  }
}
