import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {Phone} from '../phone-market/Phone';
import {Product} from '../product-market/Item';
import {ph, PhoneMarketComponent} from '../phone-market/phone-market.component';
import {pr, ProductMarketComponent} from '../product-market/product-market.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService, ProductMarketComponent,
    PhoneMarketComponent]
})
export class CartComponent implements OnInit {

  phones: Phone[] = [];
  products: Product[] = [];
  items: Item[] = [];
  sum = 0;
  handler: any = null;

  constructor(private cart: CartService,
              private route: Router) {
  }

  ngOnInit() {
    this.loadStripe();
    this.summa();
  }

  summa() {
    this.products = pr;
    this.phones = ph;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.phones.length; i++) {
      this.items.push(new Item('phone',
        this.phones[i].title, 1, this.phones[i].price, 1));
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.products.length; i++) {
      this.items.push(new Item('product',
        this.products[i].purchase, this.products[i].quantity,
        this.products[i].price, (this.products[i].quantity * this.products[i].price)));
    }
    this.sum = this.cart.sum(this.items);
    this.route.navigate(['/shop', { outlets: { place: ['cart']}}]);
  }

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(s);
    }
  }

  pay() {

    const handler = (window as any).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token(token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      }
    });

    // handler.open({
    //   name: 'Shopping Place',
    //   description: `${this.items.length} items`,
    //   amount: this.sum * 100
    // });
    handler
  }
}


export class Item {
  constructor(public category: string,
              public name: string,
              public quantity: number,
              public price: number,
              public purchase: number) {
  }
}

