import {Component, OnInit} from '@angular/core';
import {Client} from '../client.info/Client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileEditorService} from './profile-editor.service';
import {ComponentCanDeactivate} from '../client.info/LeavePage.guard';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  providers: [ProfileEditorService]
})
export class ProfileEditorComponent implements OnInit , ComponentCanDeactivate {

  saved = true;
  client: Client = null;
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private editorService: ProfileEditorService,
              private route: Router) {
    this.myForm = formBuilder.group({
      name : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.editorService.getCurrentUser()
      .subscribe((current: Client) => {
        this.client = current;
        console.log(current);
      }, error => {
        alert('Only authorized users can use this feature.');
        this.route.navigate(['/register']);
        return;
      });
    this.saved = !this.saved;
  }

  saveUser() {
    const name =  this.myForm.controls.name.value;
    const email =  this.myForm.controls.email.value;
    const phones =  this.client.phones;
    const client: Client = new Client(name, email, '', phones);
    client.setId(this.client.id);
    this.client = client;
    this.saved = !this.saved;
    this.editorService.edit(client).subscribe((data: Client ) => {
      this.client = data;
      console.log(data);
    });
  }

  back() {
      this.route.navigate(['/shop', { outlets: { place: ['cart']}}]);
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.myForm.dirty && !this.saved) {
      return confirm('Data not saved are you sure you want to exit?');
    } else {
      return true;
    }
  }
}
