import { NgModule } from '@angular/core';
import { provideDefaultConfig, RoutingConfig } from '@spartacus/core';

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig({
      featureModules: {
        cartQuickOrder: {
          cmsComponents: [
            'QuickOrderComponent',
            // TODO remove
            'CartApplyCouponComponent',
          ],
        },
      },
    }),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          quickOrder: {
            paths: ['my-account/quick-order'],
          },
        },
      },
    }),
  ],
})
export class QuickOrderRootModule {}
