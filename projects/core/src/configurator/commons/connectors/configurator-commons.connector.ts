import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';
import { Configurator } from '../../../model/configurator.model';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorCommonsConnector {
  constructor(protected adapter: ConfiguratorCommonsAdapter) {}

  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.adapter.createConfiguration(productCode);
  }

  readConfiguration(
    configId: string,
    groupId: string
  ): Observable<Configurator.Configuration> {
    return this.adapter.readConfiguration(configId, groupId);
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

  readPriceSummary(configId: string): Observable<Configurator.Configuration> {
    return this.adapter.readPriceSummary(configId);
  }
}
