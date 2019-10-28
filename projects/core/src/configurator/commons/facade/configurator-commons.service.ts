import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, mergeMap, take, tap } from 'rxjs/operators';
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
    productCode: string,
    groupId: string,
    changedAttribute: Configurator.Attribute
  ): void {
    this.store
      .pipe(
        select(ConfiguratorSelectors.getConfigurationFactory(productCode)),
        take(1)
      )
      .subscribe(configuration => {
        this.store.dispatch(
          new ConfiguratorActions.UpdateConfiguration(
            this.mergeChangesToNewObject(
              groupId,
              changedAttribute,
              configuration
            )
          )
        );
      });
  }

  getUiState(productCode: string): Observable<UiState> {
    return this.store.pipe(
      select(UiSelectors.getUiStateForProduct(productCode)),
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

  mergeChangesToNewObject(
    groupId: string,
    changedAttribute: Configurator.Attribute,
    configuration: Configurator.Configuration
  ): Configurator.Configuration {
    const newConfiguration: Configurator.Configuration = JSON.parse(
      JSON.stringify(configuration)
    );

    newConfiguration.groups.forEach(group => {
      if (group.id !== groupId) {
        return;
      }

      group.attributes.forEach(attribute => {
        if (attribute.name !== changedAttribute.name) {
          return;
        }

        switch (attribute.uiType) {
          case Configurator.UiType.RADIOBUTTON:
          case Configurator.UiType.DROPDOWN:
            attribute.selectedSingleValue =
              changedAttribute.selectedSingleValue;
            break;
          case Configurator.UiType.STRING:
            attribute.userInput = changedAttribute.userInput;
            break;
        }
      });
    });

    return newConfiguration;
  }
}
