# Base Cart Feature Moved to the Cart Library

Starting from Spartacus 5.0, the Base Cart feature is extracted to the cart library.  The Base Cart feature related code is moved out of `@spartacus/core` and `@spartacus/storefrontlib` into one of the cart lib's entry points.  The cart lib already existed prior to 5.0 and is already split in sub features.  The Base Cart feature is placed inside de `base` sub feature in the cart lib.  The series of entry point that contain the Base Cart feature start with `@spartacus/cart/base/*`.  These entry points are:

## @spartacus/cart/base/assets 
The Base Cart i18n keys are moved here.

## @spartacus/cart/base/components
Base Cart related UI code is moved here. This includes components, guards and ui services.

## @spartacus/cart/base/core
The Base Cart facade API implementations are moved here, as well as connectors, event builder, event listener, models, other services, and state management.

## @spartacus/cart/base/occ
The Base Cart related OCC code is moved here. This includes adapters and converters.

## @spartacus/cart/base/root
The root entry point is, by convention, meant to always be eager loaded.  It contains the config, events, facades, http interceptors and models.

## @spartacus/cart/base/styles
The Base Cart related scss styles are moved here.


# The Base Cart Feature is now lazy loadable

The Base Cart Feature is now lazy loadable.  To that end, the Base Cart feature needs to be imported in your storefront application via a feature module that properly applies standard imports and dynamic imports for the correct entry points.  Your application then needs to import that feature module.

If you use the Spartacus schematics to install the Base Cart feature, the feature module is automatically generated.  If you upgrade an existing application to Spartacus 5, you need to add the feature module manually.  To get the source code for the `CartBaseFeatureModule`, you can create a vanilla Spartacus application and retrieve the `CartBaseFeatureModule` source from there.  Otherwise, here is a template source code for `CartBaseFeatureModule` that you can use and should closely ressemble what is generated from the Spartacus schematics installer: 


```
import { NgModule } from '@angular/core';
import { cartBaseTranslationChunksConfig, cartBaseTranslations } from "@spartacus/cart/base/assets";
import { ADD_TO_CART_FEATURE, CartBaseRootModule, CART_BASE_FEATURE, MINI_CART_FEATURE } from "@spartacus/cart/base/root";
import { CmsConfig, I18nConfig, provideConfig } from "@spartacus/core";

@NgModule({
  declarations: [],
  imports: [
    CartBaseRootModule
  ],
  providers: [provideConfig(<CmsConfig>{
    featureModules: {
      [CART_BASE_FEATURE]: {
        module: () =>
          import('@spartacus/cart/base').then((m) => m.CartBaseModule),
      },
    }
  }),
  provideConfig(<CmsConfig>{
    featureModules: {
      [MINI_CART_FEATURE]: {
        module: () =>
          import('@spartacus/cart/base/components/mini-cart').then((m) => m.MiniCartModule),
      },
    }
  }),
  provideConfig(<CmsConfig>{
    featureModules: {
      [ADD_TO_CART_FEATURE]: {
        module: () =>
          import('@spartacus/cart/base/components/add-to-cart').then((m) => m.AddToCartModule),
      },
    }
  }),
  provideConfig(<I18nConfig>{
    i18n: {
      resources: cartBaseTranslations,
      chunks: cartBaseTranslationChunksConfig,
    },
  })
  ]
})
export class CartBaseFeatureModule { }

```
