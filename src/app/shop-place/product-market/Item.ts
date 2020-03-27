export class Product {
  purchase: string;
  quantity: number;
  done: boolean;
  price: number;

  constructor(purchase: string, quantity: number, price: number ) {
    this.purchase = purchase;
    this.done = true;
    this.price = price;
    this.quantity = quantity;
  }
}
