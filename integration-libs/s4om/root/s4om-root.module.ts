import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
// import { ScheduleLinesModule } from '@spartacus/s4om';
// import {
//   OutletPosition,
//   provideOutlet,
// } from '@spartacus/storefront';
// import { ScheduleLinesComponent } from '@spartacus/s4om/components';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { S4OM_FEATURE } from './feature-name';

export function defaultOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [S4OM_FEATURE]: {
        dependencies: [CART_BASE_FEATURE],
        cmsComponents: ['ScheduleLinesComponent'],
      },
    },
  };
  return config;
}
@NgModule({
  providers: [provideDefaultConfigFactory(defaultOrderComponentsConfig)],
})
export class S4omRootModule {}
