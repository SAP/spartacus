import { Inject, Injectable } from '@angular/core';
import {
  CartModification,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';
import { CONFIGURATOR_ADAPTER_LIST } from './rulebased-configurator.converters';

//Not provided in root, as this would break lazy loading
@Injectable()
export class RulebasedConfiguratorConnector {
  constructor(
    @Inject(CONFIGURATOR_ADAPTER_LIST)
    protected adapters: RulebasedConfiguratorAdapter[],
    protected configUtilsService: GenericConfiguratorUtilsService
  ) {}

  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    const owner: GenericConfigurator.Owner = {
      id: productCode,
      type: GenericConfigurator.OwnerType.PRODUCT,
    };
    this.configUtilsService.setOwnerKey(owner);
    return this.getAdapter(owner.configuratorType).createConfiguration(owner);
  }

  readConfiguration(
    configId: string,
    groupId: string,
    configurationOwner: GenericConfigurator.Owner
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
    parameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters
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
    parameters: GenericConfigurator.ReadConfigurationFromOrderEntryParameters
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
    return this.adapters.find(
      (adapter) => adapter.getConfiguratorType() === configuratorType
    );
  }
}
