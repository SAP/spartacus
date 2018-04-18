import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CmsModule } from '../../cms/cms.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';

// layout
import { CategoryPageLayoutComponent } from './category-page-layout/category-page-layout.component';
import { LandingPageLayoutComponent } from './landing-page-layout/landing-page-layout.component';
import { ProductListPageLayoutComponent } from './product-list-page-layout/product-list-page-layout.component';
import { ProductDetailsPageLayoutComponent } from './product-details-page-layout/product-details-page-layout.component';
import { CartPageLayoutComponent } from './cart-page-layout/cart-page-layout.component';
import { MultiStepCheckoutPageLayoutComponent } from './multi-step-checkout-page-layout/multi-step-checkout-page-layout.component';
import { OrderConfirmationPageLayoutComponent } from './order-confirmation-page-layout/order-confirmation-page-layout.component';

// header components
import { CookieConfirmationModule } from '../../cms-lib/cookie-confirmation/cookie-confirmation.module';
import { LanguageSelectorModule } from '../../site-context/language-selector/language-selector.module';
import { CurrencySelectorModule } from '../../site-context/currency-selector/currency-selector.module';
import { LoginModule } from '../../user/components/login/login.module';

import { CartDetailsModule } from '../../cart/components/cart-details/cart-details.module';
import { ProductModule } from '../../product/product.module';
import { CheckoutModule } from '../../checkout/checkout.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,

    CookieConfirmationModule,
    LoginModule,
    LanguageSelectorModule,
    CurrencySelectorModule,

    ProductModule,
    CartDetailsModule,
    CheckoutModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LandingPageLayoutComponent,
    ProductListPageLayoutComponent,
    ProductDetailsPageLayoutComponent,
    CartPageLayoutComponent,
    CategoryPageLayoutComponent,
    MultiStepCheckoutPageLayoutComponent,
    OrderConfirmationPageLayoutComponent
  ],
  exports: [
    MainComponent,
    LandingPageLayoutComponent,
    ProductListPageLayoutComponent,
    ProductDetailsPageLayoutComponent,
    CartPageLayoutComponent,
    CategoryPageLayoutComponent,
    MultiStepCheckoutPageLayoutComponent,
    OrderConfirmationPageLayoutComponent
  ]
})
export class LayoutModule {}
