/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, isDevMode } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors/index';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorCommonsService {
  protected logger = inject(LoggerService);

  constructor(
    protected store: Store<StateWithConfigurator>,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configuratorCartService: ConfiguratorCartService,
    protected activeCartService: ActiveCartFacade,
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
   * @returns {Observable<Configurator.Configuration>}
   */
  getOrCreateConfiguration(
    owner: CommonConfigurator.Owner,
    configIdTemplate?: string
  ): Observable<Configurator.Configuration> {
    switch (owner.type) {
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
      default: {
        return this.getOrCreateConfigurationForProduct(owner, configIdTemplate);
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
                this.logger.warn(
                  'Cart is busy, no configuration updates possible'
                );
              }
            }),
            filter((stable) => !cart.code || stable),
            switchMap(() =>
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
   * Updates configuration overview according to group and attribute filters
   *
   * @param configuration - Configuration. Can contain filters in its overview facet
   */
  updateConfigurationOverview(configuration: Configurator.Configuration): void {
    this.store.dispatch(
      new ConfiguratorActions.UpdateConfigurationOverview(configuration)
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
   * Dismisses conflict solver dialog
   *
   * @param owner - Configuration owner
   */
  dismissConflictSolverDialog(owner: CommonConfigurator.Owner): void {
    this.store.dispatch(
      new ConfiguratorActions.DissmissConflictDialoge(owner.key)
    );
  }

  /**
   * Check if we need to launch conflict solver dialog
   *
   * @param owner - Configuration owner
   */
  checkConflictSolverDialog(owner: CommonConfigurator.Owner): void {
    this.store.dispatch(
      new ConfiguratorActions.CheckConflictDialoge(owner.key)
    );
  }

  /**
   * Checks if the configuration contains conflicts that are displayed as conflict groups. Note
   * that in case conflicts are displayed by the conflict solver dialog, they are not taken into
   * account for this method
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
          configuration.immediateConflictResolution === false &&
          configuration.groups[0]?.groupType ===
            Configurator.GroupType.CONFLICT_HEADER_GROUP
      )
    );
  }

  /**
   * Forces the creation of a new default configuration for the given owner
   * @param owner - Configuration owner
   */
  forceNewConfiguration(owner: CommonConfigurator.Owner): void {
    this.store.dispatch(
      new ConfiguratorActions.CreateConfiguration({
        owner: owner,
        configIdTemplate: undefined,
        forceReset: true,
      })
    );
  }

  protected getOrCreateConfigurationForProduct(
    owner: CommonConfigurator.Owner,
    configIdTemplate?: string
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
            new ConfiguratorActions.CreateConfiguration({
              owner,
              configIdTemplate,
            })
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

  /**
   * Removes product bound configurations that is linked to state
   */
  removeProductBoundConfigurations(): void {
    this.store.dispatch(
      new ConfiguratorActions.RemoveProductBoundConfigurations()
    );
  }
}
