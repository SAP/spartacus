import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_FUTURE_STOCK_FEATURE } from './feature-name';

export function defaultFutureStockComponentsConfig() {
  return {
    featureModules: {
      [PRODUCT_FUTURE_STOCK_FEATURE]: {
        cmsComponents: ['FutureStockComponent'],
      },
    },
  };
}

@NgModule({
  imports: [],
  providers: [provideDefaultConfigFactory(defaultFutureStockComponentsConfig)],
})
export class FutureStockRootModule {}
