import { NgModule } from '@angular/core';
import { CartModule } from '@spartacus/cart/main';
import { CartRootModule, CART_FEATURE } from '@spartacus/cart/main/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [CartRootModule, CartModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/main').then((m) => m.CartModule),
        },
      },
    }),
  ],
})
export class CartFeatureModule {}
