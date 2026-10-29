/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { ConfiguratorAttributeProductCardComponentOptions } from '../../components/attribute/product-card/configurator-attribute-product-card.component';

/** Stand-in for {@link ConfiguratorAttributeProductCardComponent} in unit tests. */
@Component({
  selector: 'cx-configurator-attribute-product-card',
  template: '',
  imports: [I18nTestingModule],
})
export class MockConfiguratorAttributeProductCardComponent {
  @Input() productCardOptions: ConfiguratorAttributeProductCardComponentOptions;
}
