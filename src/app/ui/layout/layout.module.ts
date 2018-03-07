import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CmsModule } from '../../cms/cms.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { LandingPageLayoutComponent } from './landing-page-layout/landing-page-layout.component';

// import { ComponentsModule } from '../components/components.module';

import { CookieConfirmationModule } from '../../cms-lib/cookie-confirmation/cookie-confirmation.module';
import { LanguageSelectorModule } from '../../site-context/language-selector/language-selector.module';
import { CurrencySelectorModule } from '../../site-context/currency-selector/currency-selector.module';

import { ProductListPageLayoutComponent } from './product-list-page-layout/product-list-page-layout.component';
import { ProductDetailsPageLayoutComponent } from './product-details-page-layout/product-details-page-layout.component';
import { LoginModule } from '../../auth/components/login/login.module';
import { CartPageLayoutComponent } from './cart-page-layout/cart-page-layout.component';
import { CartDetailsModule } from '../../cart/components/cart-details/cart-details.module';
import { ProductModule } from '../../product/product.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,

    // ComponentsModule,
    ProductModule,

    CookieConfirmationModule,
    LoginModule,
    LanguageSelectorModule,
    CurrencySelectorModule,
    CartDetailsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LandingPageLayoutComponent,
    ProductListPageLayoutComponent,
    ProductDetailsPageLayoutComponent,
    CartPageLayoutComponent
  ],
  exports: [
    MainComponent,
    LandingPageLayoutComponent,
    ProductListPageLayoutComponent,
    ProductDetailsPageLayoutComponent,
    CartPageLayoutComponent
  ]
})
export class LayoutModule {}
