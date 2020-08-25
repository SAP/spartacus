import { Injectable, isDevMode } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  Configurator,
  ConfiguratorActions,
  ConfiguratorSelectors,
  GenericConfigurator,
  GenericConfigUtilsService,
  StateWithConfiguration,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMapTo, take, tap } from 'rxjs/operators';
import { ConfiguratorCartService } from './configurator-cart.service';

@Injectable()
export class ConfiguratorCommonsService {
  constructor(
    protected store: Store<StateWithConfiguration>,
    protected genericConfigUtilsService: GenericConfigUtilsService,
    protected configuratorCartService: ConfiguratorCartService,
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Verifies whether there are any pending configuration changes.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<boolean>} Returns true if there are any pending changes, otherwise false
   */
  hasPendingChanges(owner: GenericConfigurator.Owner): Observable<boolean> {
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
  isConfigurationLoading(
    owner: GenericConfigurator.Owner
  ): Observable<boolean> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),
      map((configurationState) => configurationState.loading)
    );
  }

  /**
   * Returns the configuration.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<Configurator.Configuration>}
   */
  getConfiguration(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(owner.key)),
      filter((configuration) => this.isConfigurationCreated(configuration))
    );
  }

  /**
   * Returns a configuration if it exists or creates a new one.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<Configurator.Configuration>}
   */
  getOrCreateConfiguration(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    switch (owner.type) {
      case GenericConfigurator.OwnerType.PRODUCT: {
        return this.getOrCreateConfigurationForProduct(owner);
      }
      case GenericConfigurator.OwnerType.CART_ENTRY: {
        return this.configuratorCartService.readConfigurationForCartEntry(
          owner
        );
      }
      case GenericConfigurator.OwnerType.ORDER_ENTRY: {
        return this.configuratorCartService.readConfigurationForOrderEntry(
          owner
        );
      }
    }
  }

  getOrCreateConfigurationForProduct(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),

      tap((configurationState) => {
        if (
          !this.isConfigurationCreated(configurationState.value) &&
          configurationState.loading !== true &&
          configurationState.error !== true
        ) {
          this.store.dispatch(
            new ConfiguratorActions.CreateConfiguration(owner)
          );
        }
      }),
      filter((configurationState) =>
        this.isConfigurationCreated(configurationState.value)
      ),
      map((configurationState) => configurationState.value)
    );
  }
  /**
   * Updates a configuration, specified by the configuration owner key, group ID and a changed attribute.
   *
   * @param ownerKey - Configuration owner key
   * @param changedAttribute - Changes attribute
   */
  updateConfiguration(
    ownerKey: string,
    changedAttribute: Configurator.Attribute
  ): void {
    // in case cart updates pending: Do nothing
    this.activeCartService
      .isStable()
      .pipe(
        take(1),
        tap((stable) => {
          if (isDevMode() && !stable) {
            console.warn('Cart is busy, no configuration updates possible');
          }
        }),
        filter((stable) => stable),
        switchMapTo(
          this.store.pipe(
            select(ConfiguratorSelectors.getConfigurationFactory(ownerKey)),
            take(1)
          )
        )
      )
      .subscribe((configuration) => {
        this.store.dispatch(
          new ConfiguratorActions.UpdateConfiguration(
            this.createConfigurationExtract(changedAttribute, configuration)
          )
        );
      });
  }

  /**
   * Returns a configuration with an overview.
   *
   * @param configuration - Configuration
   */
  getConfigurationWithOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
      ),
      filter((config) => this.isConfigurationCreated(config)),
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
  removeConfiguration(owner: GenericConfigurator.Owner) {
    this.store.dispatch(
      new ConfiguratorActions.RemoveConfiguration({ ownerKey: owner.key })
    );
  }

  /**
   * Verifies weather the configuration contains conflicts
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<boolean>} - Returns true if the configuration has conflicts, otherwise false
   */
  hasConflicts(owner: GenericConfigurator.Owner): Observable<boolean> {
    return this.getConfiguration(owner).pipe(
      map(
        (configuration) =>
          //We expect that the first group must always be the conflict group
          configuration.groups[0]?.groupType ===
          Configurator.GroupType.CONFLICT_HEADER_GROUP
      )
    );
  }

  ////
  // Helper methods
  ////

  isConfigurationCreated(configuration: Configurator.Configuration): boolean {
    const configId: String = configuration?.configId;
    return configId !== undefined && configId.length !== 0;
  }

  createConfigurationExtract(
    changedAttribute: Configurator.Attribute,
    configuration: Configurator.Configuration
  ): Configurator.Configuration {
    const newConfiguration: Configurator.Configuration = {
      configId: configuration.configId,
      groups: [],
      owner: configuration.owner,
      productCode: configuration.productCode,
    };

    const groupPath: Configurator.Group[] = [];
    this.buildGroupPath(
      changedAttribute.groupId,
      configuration.groups,
      groupPath
    );
    const groupPathLength = groupPath.length;
    if (groupPathLength === 0) {
      throw new Error(
        'At this point we expect that group is available in the configuration: ' +
          changedAttribute.groupId +
          ', ' +
          JSON.stringify(configuration.groups.map((cGroup) => cGroup.id))
      );
    }
    let currentGroupInExtract: Configurator.Group = this.buildGroupForExtract(
      groupPath[groupPathLength - 1]
    );
    let currentLeafGroupInExtract: Configurator.Group = currentGroupInExtract;
    newConfiguration.groups.push(currentGroupInExtract);

    for (let index = groupPath.length - 1; index > 0; index--) {
      currentLeafGroupInExtract = this.buildGroupForExtract(
        groupPath[index - 1]
      );
      currentGroupInExtract.subGroups = [currentLeafGroupInExtract];
      currentGroupInExtract = currentLeafGroupInExtract;
    }

    currentLeafGroupInExtract.attributes = [changedAttribute];
    return newConfiguration;
  }

  buildGroupPath(
    groupId: string,
    groupList: Configurator.Group[],
    groupPath: Configurator.Group[]
  ): boolean {
    let haveFoundGroup = false;
    const group: Configurator.Group = groupList.find(
      (currentGroup) => currentGroup.id === groupId
    );

    if (group) {
      groupPath.push(group);
      haveFoundGroup = true;
    } else {
      groupList
        .filter((currentGroup) => currentGroup.subGroups)
        .forEach((currentGroup) => {
          if (this.buildGroupPath(groupId, currentGroup.subGroups, groupPath)) {
            groupPath.push(currentGroup);
            haveFoundGroup = true;
          }
        });
    }
    return haveFoundGroup;
  }

  protected buildGroupForExtract(
    group: Configurator.Group
  ): Configurator.Group {
    const changedGroup: Configurator.Group = {
      groupType: group.groupType,
      id: group.id,
    };
    return changedGroup;
  }

  protected hasConfigurationOverview(
    configuration: Configurator.Configuration
  ): boolean {
    return configuration.overview !== undefined;
  }
}
