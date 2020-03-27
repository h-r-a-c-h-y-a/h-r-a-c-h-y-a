import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopPlaceComponent} from './shop-place.component';
import {ProductMarketComponent} from './product-market/product-market.component';
import {PhoneMarketComponent} from './phone-market/phone-market.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CartComponent} from './cart/cart.component';
import {CommonModule} from '@angular/common';
import {ShopListGuard} from './shop-list.guard';


const appRoutes: Routes = [
  {path: '', component: ShopPlaceComponent, canActivate: [ShopListGuard]},

  {path: 'products', component: ProductMarketComponent, outlet: 'place'},
  {path: 'phones', component: PhoneMarketComponent, outlet: 'place'},
  {path: 'cart', component: CartComponent, outlet: 'place'}
];


@NgModule({

  declarations: [ShopPlaceComponent,
    ProductMarketComponent,
    PhoneMarketComponent,
    CartComponent],
  imports: [FormsModule,
    HttpClientModule, ReactiveFormsModule,
    RouterModule.forChild(appRoutes), CommonModule],
  exports: [
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule ],
  providers: [ShopListGuard]
})
export class ShopRoutingModule {
}
