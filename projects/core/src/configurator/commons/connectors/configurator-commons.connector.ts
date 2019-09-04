import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductConfiguration } from '../../../model/configurator.model';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorCommonsConnector {
  constructor(protected adapter: ConfiguratorCommonsAdapter) {}

  public createConfiguration(
    productCode: string
  ): Observable<ProductConfiguration> {
    return this.adapter.createConfiguration(productCode);
  }
}
