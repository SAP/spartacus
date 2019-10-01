import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configurator } from '../../../model/configurator.model';
import { ConfiguratorActions } from '../store/actions/index';
import { StateWithConfiguration } from '../store/configuration-state';
import { ConfiguratorSelectors } from '../store/selectors/index';

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
    this.store
      .pipe(
        select(ConfiguratorSelectors.getConfigurationContent),
        tap(configurationState => {
          if (!this.isCreated(configurationState)) {
            this.store.dispatch(
              new ConfiguratorActions.CreateConfiguration({
                productCode: configuration.productCode,
              })
            );
          }
        })
      )
      .subscribe(_ => {
        this.store.dispatch(
          new ConfiguratorActions.UpdateConfiguration(configuration)
        );
      });

    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }

  private isCreated(configuration: Configurator.Configuration): boolean {
    return configuration && typeof configuration.configId !== 'undefined';
  }
}
