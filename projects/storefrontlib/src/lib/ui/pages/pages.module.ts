import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ContentPage
import { HomePageModule } from './home-page/home-page.module';
import { PageNotFoundModule } from './404/404.module';
import { CartPageModule } from './cart-page/cart-page.module';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';
import { MultiStepCheckoutPageModule } from './multi-step-checkout-page/multi-step-checkout-page.module';
// my Account Pages
import { OrderHistoryPageModule } from './order-history-page/order-history-page.module';
import { OrderDetailsPageModule } from './order-details-page/order-details-page.module';

// CategoryPage
import { CategoryPageModule } from './category-page/category-page.module';

// ProductPage
import { ProductPageModule } from './product-page/product-page.module';

@NgModule({
  imports: [
    CommonModule,

    OrderHistoryPageModule,
    HomePageModule,
    CategoryPageModule,
    CartPageModule,
    MultiStepCheckoutPageModule,
    OrderDetailsPageModule,
    OrderConfirmationPageModule,
    ProductPageModule,
    PageNotFoundModule
  ],
  declarations: [],
  exports: [
    OrderHistoryPageModule,
    HomePageModule,
    CategoryPageModule,
    CartPageModule,
    MultiStepCheckoutPageModule,
    OrderDetailsPageModule,
    OrderConfirmationPageModule,
    ProductPageModule,
    PageNotFoundModule
  ]
})
export class PagesModule {}
