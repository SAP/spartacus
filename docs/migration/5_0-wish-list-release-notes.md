# Wish List Feature Moved to the Wish List Library

Starting from Spartacus 5.0, the Wish List feature is extraced to the cart library.  The Wish List feature related code is moved out of `@spartacus/core` and `@spartacus/storefrontlib` into one of the cart lib's entry points.  The Wish List feature is placed inside de `wish-list` sub feature in the cart lib. The series of entry point that contain the Wish List feature start with `@spartacus/cart/wish-list/*`.  These entry points are:


## @spartacus/cart/wish-list/assets 
The Wish List i18n keys are moved here.

## @spartacus/cart/wish-list/components
Wish List related UI code is moved here. This includes components, guards and ui services.

## @spartacus/cart/wish-list/core
The Wish List facade API implementations are moved here, as well as connectors, event builder, event listener, models, other services, and state management.

## @spartacus/cart/wish-list/occ
The Wish List related OCC code is moved here. This includes the checkout related adapters and converters.

## @spartacus/cart/wish-list/root
The root entry point is, by convention, meant to always be eager loaded.  It contains the config, events, facades, http interceptors and models.

## @spartacus/cart/wish-list/styles
The Wish List related scss styles are moved here.


# The Wish List Feature is now lazy loadable

The Wish List Feature is now lazy loadable.  To that end, the Wish List feature needs to be imported in your storefront application via a feature module that properly applies standard imports and dynamic imports for the correct entry points.  Your application then needs to import that feature module.

If you use the Spartacus schematics to install the Wish List feature, the feature module is automatically generated.  If you upgrade an existing application to Spartacus 5, you need to add the feature module manually.  To get the source code for the `WishListFeatureModule`, you can create a vanilla Spartacus application and retrieve the `WishListFeatureModule` source from there.  Otherwise, here is a template source code for `WishListFeatureModule` that you can use and should closely ressemble what is generated from the Spartacus schematics installer:

```
import { NgModule } from '@angular/core';
import { wishListTranslationChunksConfig, wishListTranslations } from "@spartacus/cart/wish-list/assets";
import { ADD_TO_WISHLIST_FEATURE, CART_WISH_LIST_FEATURE, WishListRootModule } from "@spartacus/cart/wish-list/root";
import { CmsConfig, I18nConfig, provideConfig } from "@spartacus/core";

@NgModule({
  declarations: [],
  imports: [
    WishListRootModule
  ],
  providers: [provideConfig(<CmsConfig>{
    featureModules: {
      [CART_WISH_LIST_FEATURE]: {
        module: () =>
          import('@spartacus/cart/wish-list').then((m) => m.WishListModule),
      },
    }
  }),
  provideConfig(<CmsConfig>{
    featureModules: {
      [ADD_TO_WISHLIST_FEATURE]: {
        module: () =>
          import('@spartacus/cart/wish-list/components/add-to-wishlist').then((m) => m.AddToWishListModule),
      },
    }
  }),
  provideConfig(<I18nConfig>{
    i18n: {
      resources: wishListTranslations,
      chunks: wishListTranslationChunksConfig,
    },
  })
  ]
})
export class WishListFeatureModule { }

```
