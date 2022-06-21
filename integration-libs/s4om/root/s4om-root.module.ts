import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import { ScheduleLinesModule } from '@spartacus/s4om/components';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { S4OM_FEATURE } from './feature-name';

export function defaultOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [S4OM_FEATURE]: {
        dependencies: [CART_BASE_FEATURE],
      },
    },
  };
  return config;
}
@NgModule({
  imports: [ScheduleLinesModule],
  providers: [provideDefaultConfigFactory(defaultOrderComponentsConfig)],
})
export class S4omRootModule {}
