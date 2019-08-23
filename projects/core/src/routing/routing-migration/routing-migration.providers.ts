import { RoutingMigrationService } from './routing-migration.service';

export function addMigrationRoutesFactory(service: RoutingMigrationService) {
  const result = () => {
    service.addMigrationRoutes();
  };
  return result;
}
