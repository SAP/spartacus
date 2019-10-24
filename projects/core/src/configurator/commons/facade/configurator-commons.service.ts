import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { Configurator } from '../../../model/configurator.model';
import * as UiActions from '../store/actions/configurator-ui.action';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration, UiState } from '../store/configuration-state';
import * as UiSelectors from '../store/selectors/configurator-ui.selector';
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
        return of(this.isConfigurationCreated(configuration));
      })
    );
  }

  getConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(productCode)),
      tap(configuration => {
        if (!this.isConfigurationCreated(configuration)) {
          this.store.dispatch(
            new ConfiguratorActions.CreateConfiguration(productCode)
          );
        }
      }),
      filter(configuration => this.isConfigurationCreated(configuration))
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

  getUiState(productCode: string): Observable<UiState> {
    return this.store.pipe(
      select(UiSelectors.getUiStateFactory(productCode)),
      tap(uiState => {
        if (!this.isUiStateCreated(uiState)) {
          this.store.dispatch(new UiActions.CreateUiState(productCode));
        }
      }),
      filter(uiState => this.isUiStateCreated(uiState))
    );
  }

  setUiState(productCode: string, state: UiState) {
    this.store.dispatch(new UiActions.SetUiState(productCode, state));
  }

  removeUiState(productCode: string | string[]) {
    this.store.dispatch(new UiActions.RemoveUiState(productCode));
  }

  ////
  // Helper methods
  ////
  isUiStateCreated(uiState: UiState): boolean {
    return uiState !== undefined;
  }

  isConfigurationCreated(configuration: Configurator.Configuration): boolean {
    return configuration !== undefined;
  }
}
