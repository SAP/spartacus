/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-configurator-overview-menu',
  templateUrl: './configurator-overview-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewMenuComponent implements OnChanges {
  @Input() config: Configurator.ConfigurationWithOverview;

  ngOnChanges() {
    this.setHeight();
  }

  protected setHeight() {
    const ovForm = this.configuratorStorefrontUtilsService.getElement(
      'cx-configurator-overview-form'
    );

    const formHeight = ovForm?.getBoundingClientRect()?.height
      ? Math.round(ovForm?.getBoundingClientRect()?.height)
      : 0;

    if (formHeight) {
      this.configuratorStorefrontUtilsService.changeStyling(
        'cx-configurator-overview-menu',
        'height',
        formHeight + 'px'
      );
    }
  }

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
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
