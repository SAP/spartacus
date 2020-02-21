import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideConfigFactory,
  RoutingConfig,
  RoutingModule as CoreRoutingModule,
} from '@spartacus/core';
import { CmsRouteModule } from './cms-route/cms-route.module';
import { defaultRoutingConfig } from './default-routing-config';

// workaround to provide suffix url matchers from functions
export function defaultRoutingConfigFactory(): RoutingConfig {
  return defaultRoutingConfig;
}

@NgModule({
  imports: [CoreRoutingModule.forRoot(), CmsRouteModule],
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [provideConfigFactory(defaultRoutingConfigFactory)],
    };
  }
}
