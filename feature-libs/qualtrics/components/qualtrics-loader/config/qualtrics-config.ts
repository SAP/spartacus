import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * Configuration options for the Qualtrics integration, which allows you to
 * specify the qualtrics project and deployment script.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class QualtricsConfig {
  /**
   * Holds the qualtrics integration options.
   */
  qualtrics?: {
    /**
     * Deployment script, loaded from a resource, to integrate the deployment of the qualtrics project.
     * You would typically store the file in the local assets folder.
     *
     */
    scriptSource?: string;
  };
}

declare module '@spartacus/core' {
  interface Config extends QualtricsConfig {}
}
