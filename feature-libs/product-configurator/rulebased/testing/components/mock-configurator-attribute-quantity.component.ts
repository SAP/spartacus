/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../components/attribute/quantity/configurator-attribute-quantity.component';

/** Stand-in for {@link ConfiguratorAttributeQuantityComponent} in unit tests. */
@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
  imports: [I18nTestingModule],
})
export class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<number>();
}
