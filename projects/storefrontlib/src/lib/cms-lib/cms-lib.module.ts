import { NgModule } from '@angular/core';
import { CartComponentModule } from '../../cms-components/checkout/cart/cart.module';
import {
  BannerModule,
  CmsParagraphModule,
  LinkModule,
  TabParagraphContainerModule,
} from '../../cms-components/content/index';
import { SiteContextSelectorModule } from '../../cms-components/misc/site-context-selector/site-context-selector.module';
import {
  AddressBookModule,
  CloseAccountModule,
  OrderDetailsModule,
  OrderHistoryModule,
  PaymentMethodsModule,
  UpdateEmailModule,
  UpdatePasswordModule,
  UpdateProfileModule,
} from '../../cms-components/myaccount/index';
import {
  BreadcrumbModule,
  CategoryNavigationModule,
  FooterNavigationModule,
  NavigationModule,
  SearchBoxModule,
} from '../../cms-components/navigation/index';
import {
  ProductCarouselModule,
  ProductListModule,
  ProductTabsModule,
} from '../../cms-components/product/index';
import { HamburgerMenuModule, SkipLinkModule } from '../../layout/index';

@NgModule({
  imports: [
    SkipLinkModule,
    HamburgerMenuModule,
    CmsParagraphModule,
    LinkModule,
    BannerModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,
    SearchBoxModule,
    SiteContextSelectorModule,
    AddressBookModule,
    OrderHistoryModule,
    ProductListModule,
    ProductTabsModule,
    ProductCarouselModule,
    OrderDetailsModule,
    PaymentMethodsModule,
    UpdateEmailModule,
    UpdatePasswordModule,
    UpdateProfileModule,
    CartComponentModule,
    CloseAccountModule,
    TabParagraphContainerModule,
  ],
})
export class CmsLibModule {}
