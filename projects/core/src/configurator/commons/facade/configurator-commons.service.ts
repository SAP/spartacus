import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Configurator } from '../../../model/configurator.model';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration } from '../store/configuration-state';
import * as ConfiguratorSelectors from '../store/selectors/configurator.selector';

@Injectable()
export class ConfiguratorCommonsService {
  constructor(protected store: Store<StateWithConfiguration>) {}

  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    this.store.dispatch(
      new ConfiguratorActions.CreateConfiguration({
        productCode: productCode,
      })
    );

    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }

  readConfiguration(configId: string): Observable<Configurator.Configuration> {
    this.store.dispatch(
      new ConfiguratorActions.ReadConfiguration({
        configId: configId,
      })
    );

    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    this.store.dispatch(
      new ConfiguratorActions.UpdateConfiguration(configuration)
    );

    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }
}
