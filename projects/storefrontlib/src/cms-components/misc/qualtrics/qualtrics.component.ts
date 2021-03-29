import { Component, isDevMode } from '@angular/core';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';
/**
 * @deprecated since 3.1 - moved to feature-lib
 * Please take a look at https://sap.github.io/spartacus-docs/qualtrics-integration/#page-title
 * to see how to migrate into the new feature-lib.
 * Do not import from the storefront. Instead import from the qualtrics feature-lib.
 *
 * Adds the Qualtrics deployment script whenever the component is loaded. The
 * deployment script is loaded from the global configuration (`qualtrics.scriptSource`).
 */
@Component({
  selector: 'cx-qualtrics',
  template: ``,
})
export class QualtricsComponent {
  constructor(
    protected qualtricsLoader: QualtricsLoaderService,
    protected config: QualtricsConfig
  ) {
    if (this.config.qualtrics?.scriptSource) {
      this.qualtricsLoader.addScript(this.config.qualtrics.scriptSource);
    } else if (isDevMode()) {
      console.warn(
        `We're unable to add the Qualtrics deployment code as there is no script source defined in config.qualtrics.scriptSource.`
      );
    }
  }
}
