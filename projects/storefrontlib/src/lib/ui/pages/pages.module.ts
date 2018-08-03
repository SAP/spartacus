import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../layout/layout.module';

// ContentPage
//import { HomePageComponent } from './home-page/home-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { PageNotFoundComponent } from './404/404.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderConfirmationPageComponent } from './order-confirmation-page/order-confirmation-page.component';

// CategoryPage
import { CategoryPageComponent } from './category-page/category-page.component';

// ProductPage
import { ProductPageComponent } from './product-page/product-page.component';
import { MultiStepCheckoutPageComponent } from './multi-step-checkout-page/multi-step-checkout-page.component';
// My Account Pages
//import { OrderHistoryPageComponent } from './order-history-page/order-history-page.component';
import { OrderHistoryPageModule } from './order-history-page/order-history-page.module';
// OrderPage
import { OrderDetailsPageComponent } from './order-details-page/order-details-page.component';

@NgModule({
  imports: [CommonModule, LayoutModule, OrderHistoryPageModule, HomePageModule],
  declarations: [
    //HomePageComponent,
    CategoryPageComponent,
    ProductPageComponent,
    PageNotFoundComponent,
    CartPageComponent,
    MultiStepCheckoutPageComponent,
    OrderConfirmationPageComponent,
    //OrderHistoryPageComponent,
    OrderDetailsPageComponent
  ],
  exports: [
    //HomePageComponent,
    CategoryPageComponent,
    ProductPageComponent,
    PageNotFoundComponent,
    CartPageComponent,
    MultiStepCheckoutPageComponent,
    //OrderHistoryPageComponent,
    OrderDetailsPageComponent
  ]
})
export class PagesModule {}
