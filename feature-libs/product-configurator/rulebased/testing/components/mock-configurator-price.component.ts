/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { ConfiguratorPriceComponentOptions } from '../../components/price/configurator-price.component';

/** Stand-in for {@link ConfiguratorPriceComponent} in unit tests. */
@Component({
  selector: 'cx-configurator-price',
  template: '',
  imports: [I18nTestingModule],
})
export class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}
