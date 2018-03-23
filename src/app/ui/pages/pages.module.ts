import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../layout/layout.module';

// ContentPage
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './404/404.component';
import { CartPageComponent } from './cart-page/cart-page.component';

// CategoryPage
import { CategoryPageComponent } from './category-page/category-page.component';

// ProductPage
import { ProductPageComponent } from './product-page/product-page.component';
import { MultiStepCheckoutPageComponent } from './multi-step-checkout-page/multi-step-checkout-page.component';

@NgModule({
  imports: [CommonModule, LayoutModule],
  declarations: [
    HomePageComponent,
    CategoryPageComponent,
    ProductPageComponent,
    PageNotFoundComponent,
    CartPageComponent,
    MultiStepCheckoutPageComponent
  ],
  exports: [
    HomePageComponent,
    CategoryPageComponent,
    ProductPageComponent,
    PageNotFoundComponent,
    CartPageComponent,
    MultiStepCheckoutPageComponent
  ]
})
export class PagesModule {}
