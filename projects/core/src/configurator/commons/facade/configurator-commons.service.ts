import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
      new ConfiguratorActions.CreateConfiguration(productCode)
    );

    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(productCode))
    );
  }

  hasConfiguration(productCode: string): Observable<Boolean> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(productCode)),
      mergeMap(configuration => {
        const hasConfiguration = configuration !== undefined;
        return of(hasConfiguration);
      })
    );
  }

  getConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(productCode))
    );
  }

  readConfiguration(
    configId: string,
    productCode: string
  ): Observable<Configurator.Configuration> {
    this.store.dispatch(
      new ConfiguratorActions.ReadConfiguration({
        configId: configId,
        productCode: productCode,
      })
    );

    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(productCode))
    );
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    this.store.dispatch(
      new ConfiguratorActions.UpdateConfiguration(configuration)
    );

    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationFactory(configuration.productCode)
      )
    );
  }
}
