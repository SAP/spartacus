import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { GenericConfigUtilsService } from '../../generic/utils/config-utils.service';
import * as UiActions from '../store/actions/configurator-ui.action';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration, UiState } from '../store/configuration-state';
import * as UiSelectors from '../store/selectors/configurator-ui.selector';
import * as ConfiguratorSelectors from '../store/selectors/configurator.selector';

@Injectable()
export class ConfiguratorCommonsService {
  constructor(
    protected store: Store<StateWithConfiguration>,
    protected activeCartService: ActiveCartService,
    protected genericConfigUtilsService: GenericConfigUtilsService
  ) {}

  /**
   * Verifies whether there are any pending configuration changes.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<Boolean>} Returns true if there are any pending changes, otherwise false
   */
  public hasPendingChanges(
    owner: GenericConfigurator.Owner
  ): Observable<Boolean> {
    return this.store.pipe(
      select(ConfiguratorSelectors.hasPendingChanges(owner.key))
    );
  }

  /**
   * Verifies whether the configuration is loading.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<Boolean>} Returns true if the configuration is loading, otherwise false
   */
  public isConfigurationLoading(
    owner: GenericConfigurator.Owner
  ): Observable<Boolean> {
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
  public getConfiguration(
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
  public getOrCreateConfiguration(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    const localOwner: GenericConfigurator.Owner = {
      hasObsoleteState: owner.hasObsoleteState,
    };

    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),
      tap((configurationState) => {
        if (
          (!this.isConfigurationCreated(configurationState.value) ||
            localOwner.hasObsoleteState === true) &&
          configurationState.loading !== true &&
          configurationState.error !== true
        ) {
          if (owner.type === GenericConfigurator.OwnerType.PRODUCT) {
            this.store.dispatch(
              new ConfiguratorActions.CreateConfiguration(owner)
            );
          } else if (owner.type === GenericConfigurator.OwnerType.CART_ENTRY) {
            localOwner.hasObsoleteState = false;
            this.readConfigurationForCartEntry(owner);
          } else {
            this.readConfigurationForOrderEntry(owner);
          }
        }
      }),
      filter((configurationState) =>
        this.isConfigurationCreated(configurationState.value)
      ),
      map((configurationState) => configurationState.value)
    );
  }

  public readConfigurationForOrderEntry(owner: GenericConfigurator.Owner) {
    const ownerIdParts = this.genericConfigUtilsService.decomposeOwnerId(
      owner.id
    );
    const readFromOrderEntryParameters: GenericConfigurator.ReadConfigurationFromOrderEntryParameters = {
      userId: OCC_USER_ID_CURRENT,
      orderId: ownerIdParts.documentId,
      orderEntryNumber: ownerIdParts.entryNumber,
      owner: owner,
    };
    this.store.dispatch(
      new ConfiguratorActions.ReadOrderEntryConfiguration(
        readFromOrderEntryParameters
      )
    );
  }

  public readConfigurationForCartEntry(owner: GenericConfigurator.Owner) {
    this.activeCartService.requireLoadedCart().subscribe((cartState) => {
      const readFromCartEntryParameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
        userId: this.genericConfigUtilsService.getUserId(cartState.value),
        cartId: this.genericConfigUtilsService.getCartId(cartState.value),
        cartEntryNumber: owner.id,
        owner: owner,
      };
      this.store.dispatch(
        new ConfiguratorActions.ReadCartEntryConfiguration(
          readFromCartEntryParameters
        )
      );
    });
  }

  /**
   * Updates a configuration, specified by the configuration owner key, group ID and a changed attribute.
   *
   * @param ownerKey - Configuration owner key
   * @param groupId - Group ID
   * @param changedAttribute - Changes attribute
   */
  public updateConfiguration(
    ownerKey: string,
    groupId: string,
    changedAttribute: Configurator.Attribute
  ): void {
    this.store
      .pipe(
        select(ConfiguratorSelectors.getConfigurationFactory(ownerKey)),
        take(1)
      )
      .subscribe((configuration) => {
        this.store.dispatch(
          new ConfiguratorActions.UpdateConfiguration(
            this.createConfigurationExtract(
              groupId,
              changedAttribute,
              configuration
            )
          )
        );
      });
  }

  /**
   * Returns a configuration with an overview.
   *
   * @param configuration - Configuration
   */
  public getConfigurationWithOverview(
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
   * Returns a UI state if it exists or creates a new one.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<UiState>}
   */
  public getOrCreateUiState(
    owner: GenericConfigurator.Owner
  ): Observable<UiState> {
    return this.store.pipe(
      select(UiSelectors.getUiStateForOwner(owner.key)),
      tap((uiState) => {
        if (!this.isUiStateCreated(uiState)) {
          this.store.dispatch(new UiActions.CreateUiState(owner.key));
        }
      }),
      filter((uiState) => this.isUiStateCreated(uiState))
    );
  }

  /**
   * Returns a UI state.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<UiState>}
   */
  public getUiState(owner: GenericConfigurator.Owner): Observable<UiState> {
    return this.store.pipe(
      select(UiSelectors.getUiStateForOwner(owner.key)),
      filter((uiState) => this.isUiStateCreated(uiState))
    );
  }

  /**
   * Determines a UI state.
   *
   * @param owner - Configuration owner
   * @param state - UI state
   */
  public setUiState(owner: GenericConfigurator.Owner, state: UiState) {
    this.store.dispatch(new UiActions.SetUiState(owner.key, state));
  }

  /**
   * Removes a UI state.
   *
   * @param owner - Configuration owner
   */
  public removeUiState(owner: GenericConfigurator.Owner) {
    this.store.dispatch(new UiActions.RemoveUiState(owner.key));
  }

  /**
   * Removes a configuration.
   *
   * @param owner - Configuration owner
   */
  public removeConfiguration(owner: GenericConfigurator.Owner) {
    this.store.dispatch(
      new ConfiguratorActions.RemoveConfiguration({ ownerKey: owner.key })
    );
  }

  /**
   * Adds a configuration to the cart, specified by the product code, a configuration ID and configuration owner key.
   *
   * @param productCode - Product code
   * @param configId - Configuration ID
   * @param ownerKey Configuration owner key
   */
  public addToCart(productCode: string, configId: string, ownerKey: string) {
    this.activeCartService.requireLoadedCart().subscribe((cartState) => {
      const addToCartParameters: Configurator.AddToCartParameters = {
        userId: this.genericConfigUtilsService.getUserId(cartState.value),
        cartId: this.genericConfigUtilsService.getCartId(cartState.value),
        productCode: productCode,
        quantity: 1,
        configId: configId,
        ownerKey: ownerKey,
      };
      this.store.dispatch(
        new ConfiguratorActions.AddToCart(addToCartParameters)
      );
    });
  }

  /**
   * Updates a cart entry, specified by the configuration.
   *
   * @param configuration - Configuration
   */
  public updateCartEntry(configuration: Configurator.Configuration) {
    this.activeCartService.requireLoadedCart().subscribe((cartState) => {
      const parameters: Configurator.UpdateConfigurationForCartEntryParameters = {
        userId: this.genericConfigUtilsService.getUserId(cartState.value),
        cartId: this.genericConfigUtilsService.getCartId(cartState.value),
        cartEntryNumber: configuration.owner.id,
        configuration: configuration,
      };

      this.store.dispatch(new ConfiguratorActions.UpdateCartEntry(parameters));
      this.checkForUpdateDone(configuration).subscribe((configAfterUpdate) => {
        this.readConfigurationForCartEntry(configAfterUpdate.owner);
      });
    });
  }

  checkForUpdateDone(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationFactory(configuration.owner.key)
      ),
      filter(
        (configInUpdate) => configInUpdate.isCartEntryUpdatePending === false
      ),
      take(1)
    );
  }

  ////
  // Helper methods
  ////
  isUiStateCreated(uiState: UiState): boolean {
    return uiState !== undefined;
  }

  isConfigurationCreated(configuration: Configurator.Configuration): boolean {
    const configId: String = configuration?.configId;
    return configId !== undefined && configId.length !== 0;
  }

  protected hasConfigurationOverview(
    configuration: Configurator.Configuration
  ): boolean {
    return configuration.overview !== undefined;
  }

  createConfigurationExtract(
    groupId: string,
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
    this.buildGroupPath(groupId, configuration.groups, groupPath);
    const groupPathLength = groupPath.length;
    if (groupPathLength === 0) {
      throw new Error(
        'At this point we expect that group is available in the configuration: ' +
          groupId +
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

  buildGroupForExtract(group: Configurator.Group): Configurator.Group {
    const changedGroup: Configurator.Group = {
      groupType: group.groupType,
      id: group.id,
    };
    return changedGroup;
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
}
