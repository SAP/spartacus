import { Routes } from '@angular/router';
import { RoutingMigrationService } from './routing-migration.service';

export function migrationRoutesFactory(
  service: RoutingMigrationService
): Routes {
  return service.getMigrationRoutes();
}
