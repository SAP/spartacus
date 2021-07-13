import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';

export function defaultQuickOrderComponentsConfig() {
  const config = {
    featureModules: {
      cartQuickOrder: {
        cmsComponents: ['QuickOrderComponent', 'CartQuickOrderFormComponent'],
      },
    },
  };
  return config;
}

export const defaultQuickOrderRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      quickOrder: {
        paths: ['my-account/quick-order'],
      },
    },
  },
};

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultQuickOrderComponentsConfig),
    provideDefaultConfig(defaultQuickOrderRoutingConfig),
  ],
})
export class QuickOrderRootModule {}
