import { Injectable } from '@angular/core';
import {
  CartModification,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';

//Not provided in root, as this would break lazy loading
@Injectable()
export class RulebasedConfiguratorConnector {
  constructor(
    protected adapter: RulebasedConfiguratorAdapter,
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
    return this.adapter.createConfiguration(owner);
  }

  readConfiguration(
    configId: string,
    groupId: string,
    configurationOwner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.adapter.readConfiguration(
      configId,
      groupId,
      configurationOwner
    );
  }

  updateConfiguration(
    Configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.adapter.updateConfiguration(Configuration);
  }

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    return this.adapter.addToCart(parameters);
  }

  readConfigurationForCartEntry(
    parameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.adapter.readConfigurationForCartEntry(parameters);
  }

  updateConfigurationForCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    return this.adapter.updateConfigurationForCartEntry(parameters);
  }

  readConfigurationForOrderEntry(
    parameters: GenericConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.adapter.readConfigurationForOrderEntry(parameters);
  }

  readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.adapter.readPriceSummary(configuration);
  }

  getConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    return this.adapter.getConfigurationOverview(configId);
  }
}
