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
            // TODO replace once new sample data will be ready
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
