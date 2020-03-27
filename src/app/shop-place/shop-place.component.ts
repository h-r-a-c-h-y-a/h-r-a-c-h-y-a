import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CartComponent} from './cart/cart.component';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-shop-place',
  templateUrl: './shop-place.component.html',
  styleUrls: ['./shop-place.component.css']
})
export class ShopPlaceComponent implements OnInit , OnDestroy {

  name: string;
  sum: number;
  navEnd: Observable<NavigationEnd>;

  constructor(private router: Router) {
    this.navEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.navEnd.subscribe(evt => {
      console.log(evt);
      setTimeout(() => this.sum = parseFloat(localStorage.getItem('sum')), 1000);
    });
  }

  ngOnDestroy(): void {
    this.sum = parseFloat(localStorage.getItem('sum'));
    localStorage.clear();
  }
}
