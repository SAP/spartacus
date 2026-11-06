/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';

/** Stand-in for {@link ConfiguratorOverviewFilterComponent} in unit tests. */
@Component({
  selector: 'cx-configurator-overview-filter',
  template: '',
  imports: [I18nTestingModule],
})
export class MockConfiguratorOverviewFilterComponent {
  @Input() showFilterBar = true;
  @Input() config: Configurator.ConfigurationWithOverview;
}
