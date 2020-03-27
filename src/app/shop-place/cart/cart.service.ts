import {Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from './cart.component';
import {Phone} from '../phone-market/Phone';
import {Product} from '../product-market/Item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Item[] = [];

  constructor(private http: HttpClient) { }

  sum(items: Item[]): number {
    let sum = 0;
    for (let i = 0; i < items.length;) {
      sum += (items[i].price * items[i++].quantity);
    }
    localStorage.setItem('sum', sum.toString());
    return sum;
  }

  add(item: Item) {
    return this.items.push(item);
  }

  delete(item: Item) {
    const index = this.items.indexOf(item);
    return this.items.splice(index, 1);
  }

  checkoutProducts(products) {
    return this.http.post(productsUrl, products) ;
  }

  checkoutPhones(phones) {
    return this.http.post(phonesUrl, phones) ;
  }
}
const productsUrl = '';
const phonesUrl = '';
