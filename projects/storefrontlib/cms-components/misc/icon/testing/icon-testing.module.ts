/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, NgModule } from '@angular/core';
import { IconLoaderService } from '../icon-loader.service';

// PRIVATE TESTING UTIL
@Component({
  selector: 'cx-icon,[cxIcon]',
  template: `{{ type || cxIcon }}`,
})
export class MockIconComponent {
  @Input() cxIcon: any;
  @Input() type: any;
}

const mockComponents = [MockIconComponent];

export class MockIconLoaderService {
  getHtml() {
    // Intentional empty method
  }
  getStyleClasses() {
    // Intentional empty method
  }
  addStyleClasses() {
    // Intentional empty method
  }
  addLinkResource() {
    // Intentional empty method
  }
}

@NgModule({
  declarations: mockComponents,
  exports: mockComponents,
  providers: [
    {
      provide: IconLoaderService,
      useClass: MockIconLoaderService,
    },
  ],
})
export class IconTestingModule {}
