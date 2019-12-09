import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';
import { Configurator } from '../../../model/configurator.model';
import { ConfigUtilsService } from '../utils/config-utils.service';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorCommonsConnector {
  constructor(
    protected adapter: ConfiguratorCommonsAdapter,
    protected configUtilsService: ConfigUtilsService
  ) {}

  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    const owner: Configurator.Owner = {
      id: productCode,
      type: Configurator.OwnerType.PRODUCT,
    };
    this.configUtilsService.setOwnerKey(owner);
    return this.adapter.createConfiguration(owner);
  }

  readConfiguration(
    configId: string,
    groupId: string,
    configurationOwner: Configurator.Owner
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
