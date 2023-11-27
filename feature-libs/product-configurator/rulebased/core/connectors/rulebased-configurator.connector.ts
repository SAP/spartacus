/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCoreConfig } from '../config/configurator-core.config';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';

//Not provided in root, as this would break lazy loading
@Injectable()
export class RulebasedConfiguratorConnector {
  static CONFIGURATOR_ADAPTER_LIST = new InjectionToken<
    RulebasedConfiguratorAdapter[]
  >('ConfiguratorAdapterList');

  // TODO(CXSPA-3392): make config a required dependency
  constructor(
    adapters: RulebasedConfiguratorAdapter[],
    configUtilsService: CommonConfiguratorUtilsService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    config: ConfiguratorCoreConfig
  );

  /**
   * @deprecated since 6.3
   */
  constructor(
    adapters: RulebasedConfiguratorAdapter[],
    configUtilsService: CommonConfiguratorUtilsService
  );

  constructor(
    @Inject(RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST)
    protected adapters: RulebasedConfiguratorAdapter[],
    protected configUtilsService: CommonConfiguratorUtilsService,
    @Optional() protected config?: ConfiguratorCoreConfig
  ) {}

  createConfiguration(
    owner: CommonConfigurator.Owner,
    configIdTemplate?: string,
    forceReset: boolean = false
  ): Observable<Configurator.Configuration> {
    return this.getAdapter(owner.configuratorType).createConfiguration(
      owner,
      configIdTemplate,
      forceReset
    );
  }

  readConfiguration(
    configId: string,
    groupId: string,
    configurationOwner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.getAdapter(
      configurationOwner.configuratorType
    ).readConfiguration(configId, groupId, configurationOwner);
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.getAdapter(
      configuration.owner.configuratorType
    ).updateConfiguration(configuration);
  }

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    return this.getAdapter(parameters.owner.configuratorType).addToCart(
      parameters
    );
  }

  readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.getAdapter(
      parameters.owner.configuratorType
    ).readConfigurationForCartEntry(parameters);
  }

  updateConfigurationForCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    return this.getAdapter(
      parameters.configuration.owner.configuratorType
    ).updateConfigurationForCartEntry(parameters);
  }

  readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.getAdapter(
      parameters.owner.configuratorType
    ).readConfigurationForOrderEntry(parameters);
  }

  readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.getAdapter(
      configuration.owner.configuratorType
    ).readPriceSummary(configuration);
  }

  getConfigurationOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Overview> {
    return this.getAdapter(
      configuration.owner.configuratorType
    ).getConfigurationOverview(configuration.configId);
  }

  updateConfigurationOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Overview> {
    const overview = configuration.overview;

    return overview
      ? this.getAdapter(
          configuration.owner.configuratorType
        ).updateConfigurationOverview(overview)
      : this.getAdapter(
          configuration.owner.configuratorType
        ).getConfigurationOverview(configuration.configId);
  }

  searchVariants(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Variant[]> {
    return this.getAdapter(configuration.owner.configuratorType).searchVariants(
      configuration.configId
    );
  }

  protected getAdapter(configuratorType: string): RulebasedConfiguratorAdapter {
    const adapterResult = this.adapters.find((adapter) =>
      this.isAdapterMatching(adapter, configuratorType)
    );
    if (adapterResult) {
      return adapterResult;
    } else {
      throw new Error(
        'No adapter found for configurator type: ' + configuratorType
      );
    }
  }

  protected isAdapterMatching(
    adapter: RulebasedConfiguratorAdapter,
    configuratorType: string
  ): boolean {
    let matching = adapter.getConfiguratorType() === configuratorType;
    if (matching && ConfiguratorType.CPQ === configuratorType) {
      const isCpqOverOccRequested =
        this.config?.productConfigurator?.cpqOverOcc ?? false;
      const isCpqOverOccSupported =
        !!adapter.supportsCpqOverOcc && adapter.supportsCpqOverOcc();
      matching = isCpqOverOccRequested === isCpqOverOccSupported;
    }
    return matching;
  }
}
