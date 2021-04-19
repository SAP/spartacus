import { ModuleWithProviders, NgModule } from '@angular/core';
import { CpqConfiguratorInteractiveModule } from './cpq-configurator-interactive.module';
import { CpqConfiguratorOverviewModule } from './cpq-configurator-overview.module';
import { CpqConfiguratorInterceptorModule } from './interceptor/cpq-configurator-interceptor.module';

/**
 * Exposes the root modules that we need to load statically. Contains page mappings, route configurations
 * and feature configuration
 */
@NgModule({
  imports: [
    CpqConfiguratorInteractiveModule,
    CpqConfiguratorOverviewModule,
    CpqConfiguratorInterceptorModule,
  ],
})
export class CpqConfiguratorRootModule {
  static forRoot(): ModuleWithProviders<CpqConfiguratorRootModule> {
    return {
      ngModule: CpqConfiguratorRootModule,
    };
  }
}
