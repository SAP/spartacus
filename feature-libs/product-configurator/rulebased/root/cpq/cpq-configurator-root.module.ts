import { ModuleWithProviders, NgModule } from '@angular/core';
import { CpqConfiguratorInteractiveModule } from './cpq-configurator-interactive.module';
import { CpqConfiguratorOverviewModule } from './cpq-configurator-overview.module';
import { CpqConfiguratorInterceptorModule } from './interceptor/cpq-configurator-interceptor.module';

/**
 * Exposes the CPQ aspects that we need to load eagerly, like page mappings, routing
 * and interceptor related entities
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
