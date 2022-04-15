import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_FUTURE_STOCK_FEATURE } from './feature-name';

export function defaultFutureStockComponentsConfig() {
  const config = {
    featureModules: {
      [PRODUCT_FUTURE_STOCK_FEATURE]: {
        cmsComponents: ['FutureStockComponent'],
      },
      [PRODUCT_FUTURE_STOCK_FEATURE]: PRODUCT_FUTURE_STOCK_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [provideDefaultConfigFactory(defaultFutureStockComponentsConfig)],
})
export class FutureStockRootModule {}
