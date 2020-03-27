import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inShop = false;
  navStart: Observable<NavigationEnd>;

  constructor(private router: Router) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.navStart.subscribe(evt => {
      if (evt.url.startsWith('/shop') || evt.url.startsWith('/profile')) {
        this.inShop = true;
        return;
      }
      this.inShop = false;
    });
  }



}
