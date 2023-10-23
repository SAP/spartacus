/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import {
  Configurator,
  RulebasedConfiguratorAdapter,
} from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CpqConfiguratorOccService } from './cpq-configurator-occ.service';

@Injectable()
export class CpqConfiguratorOccAdapter implements RulebasedConfiguratorAdapter {
  constructor(protected cpqOccService: CpqConfiguratorOccService) {}

  getConfiguratorType(): string {
    return ConfiguratorType.CPQ;
  }

  supportsCpqOverOcc(): boolean {
    return true;
  }

  createConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    // no error handling for missing owner id needed, as it's a
    // mandatory attribute in owner
    return this.cpqOccService.createConfiguration(owner.id).pipe(
      map((configResponse) => {
        configResponse.owner = owner;
        return configResponse;
      })
    );
  }

  readConfiguration(
    configId: string,
    groupId: string,
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.cpqOccService.readConfiguration(configId, groupId).pipe(
      map((configResponse) => {
        configResponse.owner = owner;
        return configResponse;
      })
    );
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const updateMethod =
      configuration.updateType === Configurator.UpdateType.VALUE_QUANTITY
        ? this.cpqOccService.updateValueQuantity
        : this.cpqOccService.updateAttribute;
    return updateMethod.call(this.cpqOccService, configuration).pipe(
      map((configResponse: Configurator.Configuration) => {
        configResponse.owner = configuration.owner;
        return configResponse;
      })
    );
  }

  updateConfigurationOverview(): Observable<Configurator.Overview> {
    throw new Error(
      'Update the configuration overview is not supported for the CPQ configurator'
    );
  }

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    return this.cpqOccService.addToCart(parameters);
  }

  readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.cpqOccService.readConfigurationForCartEntry(parameters).pipe(
      map((configResponse) => {
        configResponse.owner = parameters.owner;
        return configResponse;
      })
    );
  }

  updateConfigurationForCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    return this.cpqOccService.updateCartEntry(parameters);
  }

  readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.cpqOccService.readConfigurationForOrderEntry(parameters).pipe(
      map((configResponse) => {
        configResponse.owner = parameters.owner;
        return configResponse;
      })
    );
  }

  readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return of(configuration); // so that UI does not run into exception
  }

  getConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    return this.cpqOccService.readConfigurationOverview(configId);
  }

  searchVariants(): Observable<Configurator.Variant[]> {
    throw new Error('searchVariants is not supported for the CPQ configurator');
  }
}
