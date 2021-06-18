import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import {
  CART_VALIDATION_FEATURE,
  CART_VALIDATION_FEATURE_CORE,
} from './feature-name';
import { defaultCartSavedCartComponentsConfig } from '../../saved-cart/root';

export function defaultCartValidationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CART_VALIDATION_FEATURE]: {},
      // by default core is bundled together with components
      [CART_VALIDATION_FEATURE_CORE]: CART_VALIDATION_FEATURE,
    },
  };
  return config;
}
@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultCartSavedCartComponentsConfig),
  ],
})
export class CartValidationRootModule {}
