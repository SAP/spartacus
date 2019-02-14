import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsParagraphModule } from './paragraph/paragraph.module';
import { LinkModule } from './link/link.module';
import { BannerModule } from './banner/banner.module';
import { CategoryNavigationModule } from './category-navigation/category-navigation.module';
import { NavigationModule } from './navigation/navigation.module';
import { FooterNavigationModule } from './footer-navigation/footer-navigation.module';
// import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ProductCarouselModule } from './product-carousel/product-carousel.module';
import { SearchBoxModule } from './search-box/search-box.module';
import { MiniCartModule } from './mini-cart/mini-cart.module';
import { SiteContextSelectorModule } from './site-context-selector/site-context-selector.module';
import { AddressBookModule } from './address-book/address-book.module';
// import { ProductReferencesModule } from './product-references/product-references.module';
// import { TabParagraphContainerModule } from './tab-paragraph-container/tab-paragraph-container.module';
import { ProductListModule } from '../product/components/product-list/product-list.module';

@NgModule({
  imports: [
    CommonModule,

    CmsParagraphModule,
    LinkModule,
    BannerModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    // BreadcrumbModule,
    ProductCarouselModule,
    SearchBoxModule,
    MiniCartModule,
    // ProductReferencesModule,
    // TabParagraphContainerModule
    SiteContextSelectorModule,
    AddressBookModule,
    ProductListModule
  ]
})
export class CmsLibModule {}
