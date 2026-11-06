/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { ConfiguratorTextfieldAddToCartButtonComponent } from '../add-to-cart-button/configurator-textfield-add-to-cart-button.component';
import { ConfiguratorTextfieldInputFieldReadonlyComponent } from '../input-field-readonly/configurator-textfield-input-field-readonly.component';
import { ConfiguratorTextfieldInputFieldComponent } from '../input-field/configurator-textfield-input-field.component';

@Component({
  selector: 'cx-configurator-textfield-form',
  templateUrl: './configurator-textfield-form.component.html',
  imports: [
    NgIf,
    NgFor,
    ConfiguratorTextfieldInputFieldComponent,
    ConfiguratorTextfieldAddToCartButtonComponent,
    ConfiguratorTextfieldInputFieldReadonlyComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ConfiguratorTextfieldFormComponent {
  configuration$: Observable<ConfiguratorTextfield.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) => {
        switch (routerData.owner.type) {
          case CommonConfigurator.OwnerType.CART_ENTRY: {
            return this.configuratorTextfieldService.readConfigurationForCartEntry(
              routerData.owner
            );
          }
          case CommonConfigurator.OwnerType.ORDER_ENTRY: {
            return this.configuratorTextfieldService.readConfigurationForOrderEntry(
              routerData.owner
            );
          }
          default: {
            return this.configuratorTextfieldService.createConfiguration(
              routerData.owner
            );
          }
        }
      })
    );

  isEditable$: Observable<boolean> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      map(
        (routerData) =>
          routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION
      )
    );

  constructor(
    protected configuratorTextfieldService: ConfiguratorTextfieldService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  /**
   * Updates a configuration attribute
   * @param attribute - Configuration attribute, always containing a string typed value
   */
  updateConfiguration(
    attribute: ConfiguratorTextfield.ConfigurationInfo
  ): void {
    this.configuratorTextfieldService.updateConfiguration(attribute);
  }
}
