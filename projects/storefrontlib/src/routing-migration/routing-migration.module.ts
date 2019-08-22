import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import { RoutingMigrationConfig } from './routing-migration-config';
import { addMigrationRoutesFactory } from './routing-migration.providers';
import { RoutingMigrationService } from './routing-migration.service';

@NgModule({})
export class RoutingMigrationModule {
  static forRoot(
    config?: RoutingMigrationConfig['routing']['migration']
  ): ModuleWithProviders<RoutingMigrationModule> {
    return {
      ngModule: RoutingMigrationModule,
      providers: [
        RoutingMigrationService,
        provideConfig({ routing: { migration: config } }),
        { provide: RoutingMigrationConfig, useExisting: Config },
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: addMigrationRoutesFactory,
          deps: [RoutingMigrationService],
        },
      ],
    };
  }
}
