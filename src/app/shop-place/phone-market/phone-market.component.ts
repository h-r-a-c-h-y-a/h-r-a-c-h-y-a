import {Component} from '@angular/core';
import {Phone} from './Phone';
import {Router} from '@angular/router';

@Component({
  selector: 'app-phone-market',
  templateUrl: './phone-market.component.html',
  styleUrls: ['./phone-market.component.css']
})

export class PhoneMarketComponent {

  bought = false;
  companies: string[] = ['Apple', 'Huawei', 'Xiaomi', 'Samsung',
    'LG', 'Motorola', 'Alcatel', 'ZTE'];

  constructor(private route: Router) {
  }

  phones: Phone[] = [
    {title: 'iPhone 11 Pro', price: 2000, company: 'Apple', bought: false},
    {title: 'Nova 5T Summary', price: 880, company: 'Huawei', bought: false},
    {title: 'Redmi 8', price: 920, company: 'Xiaomi', bought: false},
    {title: 'Galaxy M30s', price: 670, company: 'Samsung', bought: false},
    {title: 'V50S ThinQ 5G Summary', price: 520, company: 'LG', bought: false},
    {title: 'One Macro', price: 480, company: 'Motorola', bought: false},
    {title: '1V Summary', price: 660, company: 'Alcatel', bought: false},
    {title: 'Blade A5 2019', price: 490, company: 'ZTE', bought: false},
  ];

  addPhone(title: string, price: string, company: string) {
    this.phones.push(new Phone(title, parseFloat(price), company, false));
    this.companies.push(company);
  }

  toCart() {
   ph = this.phones.filter(phone => phone.bought);
   this.route.navigate(['/shop', { outlets: { place: ['cart']}}]);
  }

}
export let ph: Phone[] = [];
