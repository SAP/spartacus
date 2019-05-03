import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponentModule } from '../../cms-components/checkout/cart/cart.module';
import { BannerModule } from '../../cms-components/content/banner/banner.module';
import { SiteContextSelectorModule } from '../../cms-components/misc/site-context-selector/site-context-selector.module';
import {
  BreadcrumbModule,
  CategoryNavigationModule,
  FooterNavigationModule,
  SearchBoxModule,
} from '../../cms-components/navigation/index';
import { NavigationModule } from '../../cms-components/navigation/navigation/navigation.module';
import { HamburgerMenuModule, SkipLinkModule } from '../../layout/index';
import { CloseAccountModule } from '../my-account/close-account/close-account.module';
import { OrderDetailsModule } from '../my-account/order/order-details/order-details.module';
import { OrderHistoryModule } from '../my-account/order/order-history/order-history.module';
import { PaymentMethodsModule } from '../my-account/payment-methods/payment-methods.module';
import { UpdateEmailModule } from '../my-account/update-email/update-email.module';
import { UpdatePasswordModule } from '../my-account/update-password/update-password.module';
import { UpdateProfileModule } from '../my-account/update-profile/update-profile.module';
import { ProductListModule } from '../product/components/product-list/product-list.module';
import { ProductTabsModule } from '../product/components/product-tabs/product-tabs.module';
import { AddressBookModule } from './address-book/address-book.module';
import { LinkModule } from './link/link.module';
import { CmsParagraphModule } from './paragraph/paragraph.module';
import { ProductCarouselModule } from './product-carousel/product-carousel.module';

@NgModule({
  imports: [
    CommonModule,
    SkipLinkModule,
    HamburgerMenuModule,
    CmsParagraphModule,
    LinkModule,
    BannerModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,
    ProductCarouselModule,
    SearchBoxModule,
    SiteContextSelectorModule,
    AddressBookModule,
    OrderHistoryModule,
    ProductListModule,
    ProductTabsModule,
    OrderDetailsModule,
    PaymentMethodsModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    CartComponentModule,
    CloseAccountModule,
  ],
})
export class CmsLibModule {}
