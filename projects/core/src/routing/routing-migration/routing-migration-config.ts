export abstract class RoutingMigrationConfig {
  routing?: {
    migration?: {
      //spike todo remove type & paths
      type?: RoutingMigrationConfigType;
      paths?: string[];
      internalUrls?: string[];
    };
  };
}

export enum RoutingMigrationConfigType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}
