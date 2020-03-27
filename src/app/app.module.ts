import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {DialogContentExampleComponent, RegistrationComponent} from './client.info/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './client.info/login/login.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LeavePageGuard} from './client.info/LeavePage.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ShopRoutingModule} from './shop-place/shop-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileComponent} from './client.info/profile/profile.component';
import {MatMenuModule} from '@angular/material';
import {MaterialModule} from './client.info/profile/material.module';
import {ProfileEditorComponent} from './profile-editor/profile-editor.component';
import {CookieService} from 'ngx-cookie-service';
import {ShopListGuard} from './shop-place/shop-list.guard';
import {FirebaseConfig} from './firebase/firebase.config';
import {SignWithSocialPagesComponent} from './client.info/sign-with-social-pages/sign-with-social-pages.component';
import {TokenInterceptor} from './token.interceptor';
import {SignWithSocialPagesService} from './client.info/sign-with-social-pages/sign-with-social-pages.service';
import { DataFillComponent } from './client.info/data-fill/data-fill.component';
import { VerifyPhoneNumberComponent } from './client.info/verify-phone-number/verify-phone-number.component';
import {RegistrationService} from './client.info/registration/registration.service';
import {FacebookModule, FacebookService} from 'ngx-facebook';


const appRoutes: Routes = [
  {path: 'profile', component: ProfileEditorComponent, canDeactivate: [LeavePageGuard], canActivate: [ShopListGuard]},
  {path: 'register', component: RegistrationComponent, canDeactivate: [LeavePageGuard]},
  {path: 'fill-data', component: DataFillComponent, canDeactivate: [LeavePageGuard]},
  {path: 'verify-phone-number', component: VerifyPhoneNumberComponent, canDeactivate: [LeavePageGuard]},
  {path: 'login', component: LoginComponent, canDeactivate: [LeavePageGuard]},
  {
    path: 'shop', loadChildren: () =>
      import('../app/shop-place/shop-routing.module')
        .then(m => m.ShopRoutingModule)
  },
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ProfileEditorComponent,
    SignWithSocialPagesComponent,
    DataFillComponent,
    VerifyPhoneNumberComponent, DialogContentExampleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ShopRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MaterialModule,
    FacebookModule.forRoot()
  ],
  providers: [
    LeavePageGuard,
    CookieService,
    FirebaseConfig,
    SignWithSocialPagesService,
    RegistrationService,
    FacebookService,
    // HttpService
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor , multi: true }
    ],
  exports: [],
  entryComponents: [DialogContentExampleComponent],
  bootstrap: [HomeComponent]
})
export class AppModule {
}
