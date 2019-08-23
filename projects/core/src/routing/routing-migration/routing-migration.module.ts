import { NgModule } from '@angular/core';
import { ROUTES } from '@angular/router';
import { Config } from '../../config/config.module';
import { RoutingMigrationConfig } from './routing-migration-config';
import { migrationRoutesFactory } from './routing-migration.providers';
import { RoutingMigrationService } from './routing-migration.service';

@NgModule({
  providers: [
    RoutingMigrationService,
    { provide: RoutingMigrationConfig, useExisting: Config },
    {
      provide: ROUTES,
      multi: true,
      useFactory: migrationRoutesFactory,
      deps: [RoutingMigrationService],
    },
  ],
})
export class RoutingMigrationModule {}
