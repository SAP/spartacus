import { Injectable } from '@angular/core';
import { CartModification, GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorTextfieldConnector {
  constructor(protected adapter: ConfiguratorTextfieldAdapter) {}

  createConfiguration(
    productCode: string,
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.createConfiguration(productCode, owner);
  }

  readConfigurationForCartEntry(
    parameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.readConfigurationForCartEntry(parameters);
  }

  updateConfigurationForCartEntry(
    parameters: ConfiguratorTextfield.UpdateCartEntryParameters
  ): Observable<CartModification> {
    return this.adapter.updateConfigurationForCartEntry(parameters);
  }

  addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification> {
    return this.adapter.addToCart(parameters);
  }
}
