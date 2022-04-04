import { ExecutionOptions } from '@angular-devkit/schematics';

export interface Schema extends Partial<ExecutionOptions> {
  project: string;
  /**
   * The marker module for which
   * to find or generate the wrapper module.
   */
  markerModuleName: string;
  /**
   * Name of the feature module
   * which to add to the wrapper module.
   */
  featureModuleName: string;
}
