/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  AnonymousConsentsModule,
  AuthModule,
  ExternalRoutesModule,
  ProductModule,
  ProductOccModule,
  UserModule,
  UserOccModule,
} from '@spartacus/core';
import {
  AddressBookModule,
  AnonymousConsentManagementBannerModule,
  AnonymousConsentsDialogModule,
  BannerCarouselModule,
  BannerModule,
  BreadcrumbModule,
  CategoryNavigationModule,
  CmsParagraphModule,
  ConsentManagementModule,
  FooterNavigationModule,
  HamburgerMenuModule,
  HomePageEventModule,
  JsonLdBuilderModule,
  LinkModule,
  LoginRouteModule,
  LogoutModule,
  MyCouponsModule,
  MyInterestsModule,
  NavigationEventModule,
  NavigationModule,
  NotificationPreferenceModule,
  PageTitleModule,
  PaymentMethodsModule,
  PDFModule,
  ProductCarouselModule,
  ProductDetailsPageModule,
  ProductFacetNavigationModule,
  ProductImagesModule,
  ProductIntroModule,
  ProductListingPageModule,
  ProductListModule,
  ProductPageEventModule,
  ProductReferencesModule,
  ProductSummaryModule,
  ProductTabsModule,
  ScrollToTopModule,
  SearchBoxModule,
  SiteContextSelectorModule,
  StockNotificationModule,
  TabParagraphContainerModule,
  VideoModule,
} from '@spartacus/storefront';
import { CartBaseFeatureModule } from './features/cart/cart-base-feature.module';
import { ImportExportFeatureModule } from './features/cart/cart-import-export-feature.module';
import { QuickOrderFeatureModule } from './features/cart/cart-quick-order-feature.module';
import { SavedCartFeatureModule } from './features/cart/cart-saved-cart-feature.module';
import { WishListFeatureModule } from './features/cart/wish-list-feature.module';
import { CheckoutFeatureModule } from './features/checkout/checkout-feature.module';
import { OrderFeatureModule } from './features/order/order-feature.module';
import { ImageZoomFeatureModule } from './features/product/product-image-zoom-feature.module';
import { VariantsFeatureModule } from './features/product/product-variants-feature.module';
import { SmartEditFeatureModule } from './features/smartedit/smartedit-feature.module';
import { UserFeatureModule } from './features/user/user-feature.module';

@NgModule({
  imports: [
    // Auth Core
    AuthModule.forRoot(),
    LogoutModule, // will be come part of auth package
    LoginRouteModule, // will be come part of auth package

    // Basic Cms Components
    HamburgerMenuModule,
    SiteContextSelectorModule,
    LinkModule,
    BannerModule,
    CmsParagraphModule,
    TabParagraphContainerModule,
    BannerCarouselModule,
    CategoryNavigationModule,
    NavigationModule,
    FooterNavigationModule,
    PageTitleModule,
    BreadcrumbModule,
    PDFModule,
    ScrollToTopModule,
    VideoModule,

    // User Core
    UserModule,
    UserOccModule,
    // User UI
    AddressBookModule,
    PaymentMethodsModule,
    NotificationPreferenceModule,
    MyInterestsModule,
    StockNotificationModule,
    ConsentManagementModule,
    MyCouponsModule,

    // Anonymous Consents Core
    AnonymousConsentsModule.forRoot(),
    // Anonymous Consents UI
    AnonymousConsentsDialogModule,
    AnonymousConsentManagementBannerModule,

    // Product Core
    ProductModule.forRoot(),
    ProductOccModule,

    // Product UI
    ProductDetailsPageModule,
    ProductListingPageModule,
    ProductListModule,
    SearchBoxModule,
    ProductFacetNavigationModule,
    ProductTabsModule,
    ProductCarouselModule,
    ProductReferencesModule,
    ProductImagesModule,
    ProductSummaryModule,
    ProductIntroModule,

    // Page Events
    NavigationEventModule,
    HomePageEventModule,
    ProductPageEventModule,

    /************************* Opt-in features *************************/

    ExternalRoutesModule.forRoot(), // to opt-in explicitly, is added by default schematics
    JsonLdBuilderModule,

    /************************* Feature libraries *************************/
    UserFeatureModule,

    CartBaseFeatureModule,
    WishListFeatureModule,
    SavedCartFeatureModule,
    QuickOrderFeatureModule,
    ImportExportFeatureModule,

    OrderFeatureModule,

    CheckoutFeatureModule,

    SmartEditFeatureModule,

    VariantsFeatureModule,
    ImageZoomFeatureModule,
  ],
})
export class SpartacusFeaturesModule {}
