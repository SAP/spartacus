import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartDetailsModule } from '../cart/cart-details/cart-details.module';
import { CartTotalsModule } from '../cart/cart-totals/cart-totals.module';
import { OrderDetailsModule } from '../my-account/order/order-details/order-details.module';
import { OrderHistoryModule } from '../my-account/order/order-history/order-history.module';
import { PaymentMethodsModule } from '../my-account/payment-methods/payment-methods.module';
import { UpdatePasswordModule } from '../my-account/update-password/update-password.module';
import { UpdateProfileModule } from '../my-account/update-profile/update-profile.module';
import { ProductListModule } from '../product/components/product-list/product-list.module';
import { ProductTabsModule } from '../product/components/product-tabs/product-tabs.module';
import { AddressBookModule } from './address-book/address-book.module';
import { BannerModule } from './banner/banner.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { CategoryNavigationModule } from './category-navigation/category-navigation.module';
import { FooterNavigationModule } from './footer-navigation/footer-navigation.module';
import { LinkModule } from './link/link.module';
import { MiniCartModule } from './mini-cart/mini-cart.module';
import { NavigationModule } from './navigation/navigation.module';
import { CmsParagraphModule } from './paragraph/paragraph.module';
import { ProductCarouselModule } from './product-carousel/product-carousel.module';
import { SearchBoxModule } from './search-box/search-box.module';
import { SiteContextSelectorModule } from './site-context-selector/site-context-selector.module';

// import { ProductReferencesModule } from './product-references/product-references.module';
// import { TabParagraphContainerModule } from './tab-paragraph-container/tab-paragraph-container.module';

@NgModule({
  imports: [
    CommonModule,

    CmsParagraphModule,
    LinkModule,
    BannerModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    BreadcrumbModule,
    ProductCarouselModule,
    SearchBoxModule,
    MiniCartModule,
    // ProductReferencesModule,
    // TabParagraphContainerModule
    SiteContextSelectorModule,
    AddressBookModule,
    OrderHistoryModule,
    ProductListModule,
    ProductTabsModule,
    CartDetailsModule,
    CartTotalsModule,
    OrderDetailsModule,
    PaymentMethodsModule,
    UpdatePasswordModule,
    UpdateProfileModule,
  ],
})
export class CmsLibModule {}
