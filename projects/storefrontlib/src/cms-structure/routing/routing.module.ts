import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  RoutingModule as CoreRoutingModule,
} from '@spartacus/core';
import { CmsRouteModule } from './cms-route/cms-route.module';
import { defaultRoutingConfig } from './default-routing-config';

@NgModule({
  imports: [CoreRoutingModule.forRoot(), CmsRouteModule],
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [provideDefaultConfig(defaultRoutingConfig)],
    };
  }
}
