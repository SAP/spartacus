import { Injectable, isDevMode } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActiveCartService } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { filter, map, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors/index';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorCommonsService {
  constructor(
    protected store: Store<StateWithConfigurator>,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configuratorCartService: ConfiguratorCartService,
    protected activeCartService: ActiveCartService,
    protected configuratorUtils: ConfiguratorUtilsService
  ) {}

  /**
   * Verifies whether there are any pending configuration changes.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<boolean>} Returns true if there are any pending changes, otherwise false
   */
  hasPendingChanges(owner: CommonConfigurator.Owner): Observable<boolean> {
    return this.store.pipe(
      select(ConfiguratorSelectors.hasPendingChanges(owner.key))
    );
  }

  /**
   * Verifies whether the configuration is loading.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<boolean>} Returns true if the configuration is loading, otherwise false
   */
  isConfigurationLoading(owner: CommonConfigurator.Owner): Observable<boolean> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),
      map((configurationState) => configurationState.loading ?? false)
    );
  }

  /**
   * Returns a configuration for an owner. Emits only if there are valid configurations
   * available for the requested owner, does not trigger the re-read or
   * creation of the configuration in case it's not there
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<Configurator.Configuration>}
   */
  getConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(owner.key)),
      filter((configuration) =>
        this.configuratorUtils.isConfigurationCreated(configuration)
      )
    );
  }

  /**
   * Returns a configuration if it exists or creates a new one.
   * Emits if there is a valid configuration available and triggers
   * the configuration creation or read from backend in case it is not
   * available
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<Configurator.Configuration>}
   */
  getOrCreateConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    switch (owner.type) {
      case CommonConfigurator.OwnerType.PRODUCT: {
        return this.getOrCreateConfigurationForProduct(owner);
      }
      case CommonConfigurator.OwnerType.CART_ENTRY: {
        return this.configuratorCartService.readConfigurationForCartEntry(
          owner
        );
      }
      case CommonConfigurator.OwnerType.ORDER_ENTRY: {
        return this.configuratorCartService.readConfigurationForOrderEntry(
          owner
        );
      }
    }
  }

  /**
   * Updates a configuration, specified by the configuration owner key, group ID and a changed attribute.
   *
   * @param ownerKey - Configuration owner key
   * @param changedAttribute - Changes attribute
   */
  updateConfiguration(
    ownerKey: string,
    changedAttribute: Configurator.Attribute,
    updateType?: Configurator.UpdateType
  ): void {
    if (!updateType) {
      updateType = Configurator.UpdateType.ATTRIBUTE;
    }
    // in case cart updates pending: Do nothing, because an addToCart might
    // be in progress. Can happen if on slow networks addToCart was hit and
    // afterwards an attribute was changed before the OV navigation has
    // taken place
    this.activeCartService
      .getActive()
      .pipe(
        take(1),
        switchMap((cart) =>
          this.activeCartService.isStable().pipe(
            take(1),
            tap((stable) => {
              if (isDevMode() && cart.code && !stable) {
                console.warn('Cart is busy, no configuration updates possible');
              }
            }),
            filter((stable) => !cart.code || stable),
            switchMapTo(
              this.store.pipe(
                select(ConfiguratorSelectors.getConfigurationFactory(ownerKey)),
                take(1)
              )
            )
          )
        )
      )
      .subscribe((configuration) => {
        this.store.dispatch(
          new ConfiguratorActions.UpdateConfiguration(
            this.configuratorUtils.createConfigurationExtract(
              changedAttribute,
              configuration,
              updateType
            )
          )
        );
      });
  }

  /**
   * Returns a configuration with an overview. Emits valid configurations which
   * include the overview aspect
   *
   * @param configuration - Configuration
   * @returns Observable of configurations including the overview
   */
  getConfigurationWithOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
      ),
      filter((config) => this.configuratorUtils.isConfigurationCreated(config)),
      tap((configurationState) => {
        if (!this.hasConfigurationOverview(configurationState)) {
          this.store.dispatch(
            new ConfiguratorActions.GetConfigurationOverview(configuration)
          );
        }
      }),
      filter((config) => this.hasConfigurationOverview(config))
    );
  }

  /**
   * Removes a configuration.
   *
   * @param owner - Configuration owner
   */
  removeConfiguration(owner: CommonConfigurator.Owner): void {
    this.store.dispatch(
      new ConfiguratorActions.RemoveConfiguration({ ownerKey: owner.key })
    );
  }

  /**
   * Checks if the configuration contains conflicts
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<boolean>} - Returns true if the configuration has conflicts, otherwise false
   */
  hasConflicts(owner: CommonConfigurator.Owner): Observable<boolean> {
    return this.getConfiguration(owner).pipe(
      map(
        (configuration) =>
          //We expect that the first group must always be the conflict group
          configuration.groups[0]?.groupType ===
          Configurator.GroupType.CONFLICT_HEADER_GROUP
      )
    );
  }

  protected getOrCreateConfigurationForProduct(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),
      tap((configurationState) => {
        if (
          (configurationState.value === undefined ||
            !this.configuratorUtils.isConfigurationCreated(
              configurationState.value
            )) &&
          configurationState.loading !== true &&
          configurationState.error !== true
        ) {
          this.store.dispatch(
            new ConfiguratorActions.CreateConfiguration(owner)
          );
        }
      }),
      filter(
        (configurationState) =>
          configurationState.value !== undefined &&
          this.configuratorUtils.isConfigurationCreated(
            configurationState.value
          )
      ),
      //save to assume configuration is defined after previous filter
      map((configurationState) =>
        this.configuratorUtils.getConfigurationFromState(configurationState)
      )
    );
  }

  protected hasConfigurationOverview(
    configuration: Configurator.Configuration
  ): boolean {
    return configuration.overview !== undefined;
  }
}
