/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';

/** Stand-in for show-more child components in attribute unit tests. */
@Component({
  selector: 'cx-configurator-show-more',
  template: '',
  imports: [I18nTestingModule],
})
export class MockConfiguratorShowMoreComponent {
  @Input() text: string;
  @Input() textSize = 60;
  @Input() productName: string;
  @Input() attributeLabel?: string;
  @Input() valueLabel?: string;
  @Input() itemLabel?: string;
}
