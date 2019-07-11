import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideConfig,
  RoutingModule as CoreRoutingModule,
} from '@spartacus/core';
import { CmsRouteModule } from './cms-route/cms-route.module';
import { defaultRoutingConfig } from './default-routing-config';
import { SuffixRoutesModule } from './suffix-routes/suffix-routes.module';

@NgModule({
  imports: [CoreRoutingModule.forRoot(), CmsRouteModule, SuffixRoutesModule],
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [provideConfig(defaultRoutingConfig)],
    };
  }
}
