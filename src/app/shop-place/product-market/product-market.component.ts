import {Component} from '@angular/core';
import {Product} from './Item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-market',
  templateUrl: './product-market.component.html',
  styleUrls: ['./product-market.component.css']
})
export class ProductMarketComponent {


  products: Product[] =
    [
      {purchase: 'Bred', quantity: 2, done: true, price: 31.8},
      {purchase: 'Oil', quantity: 1, done: true, price: 60},
      {purchase: 'Potatoes', quantity: 3, done: true, price: 47.8},
      {purchase: 'Cheese', quantity: 1, done: true, price: 310}
    ];

  constructor(private route: Router) {}

  addItem(text: string, quantity: number, price: number): void {
    if (text == null || text.trim() === '' || quantity == null || price == null) {
      return;
    }
    this.products.push(new Product(text, quantity, price));
    this.sum();
  }

  sum(): number {
    let sum = 0;
    for (let i = 0; i < this.products.length;) {
      sum += (this.products[i].price * this.products[i++].quantity);
    }
    return sum;
  }

  delete(): void {
    for (let i = 0; i < this.products.length; i++) {
      if (!this.products[i].done) {
        this.products.splice(i, 1);
      }
    }
    this.sum();
  }

  changeQuantity(item: Product, quantity: number) {
    item.quantity = quantity;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].purchase === item.purchase) {
        this.products[i].quantity = item.quantity;
      }
    }
    this.sum();
  }

  toCart() {
    pr = this.products.filter(prod => prod.done);
    this.route.navigate(['/shop', { outlets: { place: ['cart']}}]);
  }
}
export let pr: Product [] = [];
