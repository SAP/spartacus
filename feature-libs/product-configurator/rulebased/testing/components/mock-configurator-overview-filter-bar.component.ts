/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';

/** Stand-in for {@link ConfiguratorOverviewFilterBarComponent} in unit tests. */
@Component({
  selector: 'cx-configurator-overview-filter-bar',
  template: '',
  imports: [I18nTestingModule],
})
export class MockConfiguratorOverviewFilterBarComponent {
  @Input() config: Configurator.ConfigurationWithOverview;
}
