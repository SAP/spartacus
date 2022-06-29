import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors/index';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorVariantSearchService {
  constructor(
    protected store: Store<StateWithConfigurator>,

    protected commonConfigUtilsService: CommonConfiguratorUtilsService,

    protected configuratorUtilsService: ConfiguratorUtilsService
  ) {}

  searchVariants(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
      ),
      filter((config) =>
        this.configuratorUtilsService.isConfigurationCreated(config)
      ),
      tap((configurationState) => {
        if (!this.hasVariants(configurationState)) {
          this.store.dispatch(
            new ConfiguratorActions.SearchVariants(configuration)
          );
        }
      }),
      filter((config) => this.hasVariants(config))
    );
  }

  protected hasVariants(configuration: Configurator.Configuration): boolean {
    return configuration.variants !== undefined;
  }
}
