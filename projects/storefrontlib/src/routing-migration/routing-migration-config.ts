export abstract class RoutingMigrationConfig {
  routing?: {
    migration?: {
      type?: 'internal' | 'external';
      paths?: string[];
    };
  };
}
