import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
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
  //force early login
  providers: [provideDefaultConfig({ routing: { protected: true } })],
})
export class CpqConfiguratorRootModule {}
