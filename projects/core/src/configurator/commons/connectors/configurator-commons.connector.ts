import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { GenericConfiguratorUtilsService } from '../../generic/utils/generic-configurator-utils.service';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorCommonsConnector {
  constructor(
    protected adapter: ConfiguratorCommonsAdapter,
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
