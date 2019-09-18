import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../../../model/configurator.model';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorCommonsConnector {
  constructor(protected adapter: ConfiguratorCommonsAdapter) {}

  public createConfiguration(productCode: string): Observable<Configuration> {
    return this.adapter.createConfiguration(productCode);
  }
}
