import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CartDetailsModule } from '../../cart/components/cart-details/cart-details.module';
import { CheckoutModule } from '../../checkout/checkout.module';
// header components
import { CookieConfirmationModule } from '../../cms-lib/cookie-confirmation/cookie-confirmation.module';
import { CmsModule } from '../../cms/cms.module';
import { GlobalMessageModule } from '../../global-message/global-message.module';
import { MaterialModule } from '../../material.module';
import { MyAccountModule } from '../../my-account/my-account.module';
import { ProductModule } from '../../product/product.module';
import { CurrencySelectorModule } from '../../site-context/currency-selector/currency-selector.module';
import { LanguageSelectorModule } from '../../site-context/language-selector/language-selector.module';
import { LoginModule } from './../../user/components/login/login.module';
import { CartPageLayoutComponent } from './cart-page-layout/cart-page-layout.component';
// layout
import { CategoryPageLayoutComponent } from './category-page-layout/category-page-layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageLayoutComponent } from './landing-page-layout/landing-page-layout.component';
import { LoginPageLayoutModule } from './login-page-layout/login-page-layout.module';
import { MainComponent } from './main/main.component';
import { MultiStepCheckoutPageLayoutComponent } from './multi-step-checkout-page-layout/multi-step-checkout-page-layout.component';
import { OrderConfirmationPageLayoutComponent } from './order-confirmation-page-layout/order-confirmation-page-layout.component';
import { OrderDetailsPageLayoutComponent } from './order-details-page-layout/order-details-page-layout.component';
import { OrderHistoryPageLayoutComponent } from './order-history-page-layout/order-history-page-layout.component';
import { ProductDetailsPageLayoutComponent } from './product-details-page-layout/product-details-page-layout.component';
import { ProductListPageLayoutComponent } from './product-list-page-layout/product-list-page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,

    CookieConfirmationModule,
    LanguageSelectorModule,
    CurrencySelectorModule,
    GlobalMessageModule,
    LoginModule,
    ProductModule,
    CartDetailsModule,
    CheckoutModule,
    MyAccountModule,

    LoginPageLayoutModule
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
    OrderConfirmationPageLayoutComponent,
    OrderHistoryPageLayoutComponent,
    OrderDetailsPageLayoutComponent
  ],
  exports: [
    MainComponent,
    LandingPageLayoutComponent,
    ProductListPageLayoutComponent,
    ProductDetailsPageLayoutComponent,
    CartPageLayoutComponent,
    CategoryPageLayoutComponent,
    MultiStepCheckoutPageLayoutComponent,
    OrderConfirmationPageLayoutComponent,
    OrderHistoryPageLayoutComponent,
    OrderDetailsPageLayoutComponent
  ]
})
export class LayoutModule {}
