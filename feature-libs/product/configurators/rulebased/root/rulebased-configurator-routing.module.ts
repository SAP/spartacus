import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  RoutingModule as CoreRoutingModule,
} from '@spartacus/core';
import { CmsRouteModule } from '@spartacus/storefront';
import { defaultRulebasedRoutingConfig } from './default-rulebased-routing-config';

@NgModule({
  imports: [CoreRoutingModule.forRoot(), CmsRouteModule],
})
export class RulebasedConfiguratorRoutingModule {
  static forRoot(): ModuleWithProviders<RulebasedConfiguratorRoutingModule> {
    return {
      ngModule: RulebasedConfiguratorRoutingModule,
      providers: [provideDefaultConfig(defaultRulebasedRoutingConfig)],
    };
  }
}
