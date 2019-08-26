import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Config } from '../../config/config.module';
import { RoutingMigrationConfig } from './routing-migration-config';
import { addMigrationRoutesFactory } from './routing-migration.providers';
import { RoutingMigrationService } from './routing-migration.service';

/**
 * Prepends the migration route that redirects to a different storefront system for configured URLs
 */
@NgModule({
  providers: [
    RoutingMigrationService,
    { provide: RoutingMigrationConfig, useExisting: Config },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: addMigrationRoutesFactory,
      deps: [RoutingMigrationService],
    },
  ],
})
export class RoutingMigrationModule {}
