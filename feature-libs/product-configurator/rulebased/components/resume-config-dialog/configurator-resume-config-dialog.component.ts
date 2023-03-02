/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-resume-config-dialog',
  templateUrl: './configurator-resume-config-dialog.component.html',
})
export class ConfiguratorResumeConfigDialogComponent implements OnInit {
  constructor(
    protected launchDialogService: LaunchDialogService,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  ngOnInit(): void {}

  /**
   * closes the  modal
   */
  closeModal(): void {
    this.launchDialogService.closeDialog('Close Resume Config Modal');
  }

  /**
   * closes the  modal
   */
  discardConfig(): void {
    this.closeModal();
    const owner: CommonConfigurator.Owner =
      ConfiguratorModelUtils.createInitialOwner();
    owner.key = 'CONF_CAMERA_SL';
    owner.id = 'CONF_CAMERA_SL';
    owner.configuratorType = ConfiguratorType.VARIANT;
    console.log('discard');
    this.configuratorCommonsService.removeProductBoundConfigurations();
    this.configuratorCommonsService.getOrCreateConfiguration(
      owner,
      undefined,
      true
    );
  }
}
