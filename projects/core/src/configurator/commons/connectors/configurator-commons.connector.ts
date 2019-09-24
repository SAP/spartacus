import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configurator } from '../../../model/configurator.model';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorCommonsConnector {
  constructor(protected adapter: ConfiguratorCommonsAdapter) {}

  public createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.adapter.createConfiguration(productCode);
  }
}
