import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductConfiguration } from '../../../model/configurator.model';
import { ConfiguratorActions } from '../store/actions/index';
import { StateWithConfiguration } from '../store/configuration-state';
import { ConfiguratorSelectors } from '../store/selectors';

@Injectable()
export class ConfiguratorCommonsService {
  constructor(protected store: Store<StateWithConfiguration>) {}

  createConfiguration(productCode: string): Observable<ProductConfiguration> {
    this.store.dispatch(
      new ConfiguratorActions.CreateConfiguration({
        productCode: productCode,
      })
    );

    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }
}
