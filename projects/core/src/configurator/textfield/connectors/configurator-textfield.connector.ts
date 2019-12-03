import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartModification } from '../../../model/cart.model';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorTextfieldConnector {
  constructor(protected adapter: ConfiguratorTextfieldAdapter) {}

  createConfiguration(
    productCode: string
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.adapter.createConfiguration(productCode);
  }

  addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification> {
    return this.adapter.addToCart(parameters);
  }
}
