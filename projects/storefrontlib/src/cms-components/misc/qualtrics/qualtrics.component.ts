import { Component } from '@angular/core';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';

/**
 * Adds the Qualtrics deloyment script whenever the component is loaded. The
 * deployment script is loaded from the global configuration (`qualtrics.scriptSource`).
 *
 * The script is added when the route `NavigationEnd` occurs, so that the script is (re)added
 * if the component is not re-rendered on the page.
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
      console.log(this.config.qualtrics?.scriptSource);
      this.qualtricsLoader.addScript(this.config.qualtrics.scriptSource);
    }
  }
}
