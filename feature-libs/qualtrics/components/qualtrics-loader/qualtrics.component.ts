/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';
/**
 * Adds the Qualtrics deployment script whenever the component is loaded. The
 * deployment script is loaded from the global configuration (`qualtrics.scriptSource`).
 */
@Component({
  selector: 'cx-qualtrics',
  template: '',
})
export class QualtricsComponent {
  protected logger = inject(LoggerService);

  constructor(
    protected qualtricsLoader: QualtricsLoaderService,
    protected config: QualtricsConfig
  ) {
    if (this.config.qualtrics?.scriptSource) {
      this.qualtricsLoader.addScript(this.config.qualtrics.scriptSource);
    } else if (isDevMode()) {
      this.logger.warn(
        `We're unable to add the Qualtrics deployment code as there is no script source defined in config.qualtrics.scriptSource.`
      );
    }
  }
}
