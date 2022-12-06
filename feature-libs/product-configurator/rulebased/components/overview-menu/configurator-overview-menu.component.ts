/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-menu',
  templateUrl: './configurator-overview-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewMenuComponent {
  @Input() config: Configurator.ConfigurationWithOverview;

  constructor(
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
  ) {}

  /**
   * Retrieves the styling for the group levels.
   *
   * @param {number} level - Group level. 1 is top level.
   * @return {string} - corresponding style classes
   */
  getGroupLevelStyleClasses(level: number): string {
    return 'cx-menu-group' + ' groupLevel' + level;
  }

  /**
   * Navigates to group in OV form
   *
   * @param {string} id - Group id
   */
  navigateToGroup(prefix: string, id: string): void {
    const ovGroupId = this.configuratorStorefrontUtilsService.createOvGroupId(
      prefix,
      id
    );
    this.configuratorStorefrontUtilsService.scrollToConfigurationElement(
      '#' + ovGroupId
    );
  }
}
