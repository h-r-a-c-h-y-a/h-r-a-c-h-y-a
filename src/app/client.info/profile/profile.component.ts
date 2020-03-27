import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FirebaseConfig} from '../../firebase/firebase.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private cookie: CookieService,
              private route: Router, private firebaseConfig: FirebaseConfig) { }

  ngOnInit() {
  }

  logout() {
    this.firebaseConfig.signOut();
    this.route.navigate(['/login']);
  }

}
