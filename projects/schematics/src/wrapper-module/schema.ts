import { ExecutionOptions } from '@angular-devkit/schematics';

export interface Schema extends Partial<ExecutionOptions> {
  project: string;
  /**
   * Name of the feature module
   * for which to generate the wrapper module.
   */
  featureModuleName: string;
}
