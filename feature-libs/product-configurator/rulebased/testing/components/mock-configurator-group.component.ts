/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model/configurator.model';

/** Stand-in for {@link ConfiguratorGroupComponent} in unit tests. */
@Component({
  selector: 'cx-configurator-group',
  template: '',
  imports: [I18nTestingModule],
})
export class MockConfiguratorGroupComponent {
  @Input() group: Configurator.Group;
  @Input() owner: CommonConfigurator.Owner;
  @Input() isNavigationToGroupEnabled = true;
  @Input() isPricingAsync?: boolean;
}
