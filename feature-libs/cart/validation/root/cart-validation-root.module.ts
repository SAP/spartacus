import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import {
  CART_VALIDATION_FEATURE,
  CART_VALIDATION_CORE_FEATURE,
} from './feature-name';

export function defaultCartValidationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CART_VALIDATION_FEATURE]: {
        cmsComponents: [],
      },
      [CART_VALIDATION_CORE_FEATURE]: CART_VALIDATION_FEATURE,
    },
  };
  return config;
}
@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultCartValidationComponentsConfig),
  ],
})
export class CartValidationRootModule {}
