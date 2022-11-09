import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/guards/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MapComponent } from './components/partials/map/map.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { RatingModule } from 'ng-starrating';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { TitleComponent } from './components/partials/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentComponent,
    PaypalButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
