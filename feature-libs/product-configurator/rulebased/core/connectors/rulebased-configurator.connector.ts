import { Inject, Injectable, InjectionToken } from '@angular/core';
import { CartModification } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';

//Not provided in root, as this would break lazy loading
@Injectable()
export class RulebasedConfiguratorConnector {
  static CONFIGURATOR_ADAPTER_LIST = new InjectionToken<
    RulebasedConfiguratorAdapter[]
  >('ConfiguratorAdapterList');

  constructor(
    @Inject(RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST)
    protected adapters: RulebasedConfiguratorAdapter[],
    protected configUtilsService: CommonConfiguratorUtilsService
  ) {}

  createConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.getAdapter(owner.configuratorType).createConfiguration(owner);
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

  protected getAdapter(configuratorType: string): RulebasedConfiguratorAdapter {
    const adapterResult = this.adapters.find(
      (adapter) => adapter.getConfiguratorType() === configuratorType
    );
    if (adapterResult) {
      return adapterResult;
    } else {
      throw new Error(
        'No adapter found for configurator type: ' + configuratorType
      );
    }
  }
}
