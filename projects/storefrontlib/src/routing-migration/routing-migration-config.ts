export abstract class RoutingMigrationConfig {
  routing?: {
    migration?: {
      type?: RoutingMigrationConfigType;
      paths?: string[];
    };
  };
}

export enum RoutingMigrationConfigType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}
