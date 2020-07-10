import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { MultiCartSelectors } from '../../../cart/store/index';
import { StateWithMultiCart } from '../../../cart/store/multi-cart-state';
import { Cart } from '../../../model/cart.model';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../../occ/utils/occ-constants';
import { GenericConfigUtilsService } from '../../generic/utils/config-utils.service';
import { ConfiguratorActions } from '../store/actions/index';
import { StateWithConfiguration } from '../store/configuration-state';
import * as ConfiguratorSelectors from '../store/selectors/configurator.selector';

@Injectable()
export class ConfiguratorCommonsService {
  constructor(
    protected store: Store<StateWithConfiguration>,
    protected cartStore: Store<StateWithMultiCart>,
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
  hasPendingChanges(owner: GenericConfigurator.Owner): Observable<Boolean> {
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
  isConfigurationLoading(
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
    return this.checkForActiveCartUpdateDone().pipe(
      switchMapTo(this.getOrCreateConfigurationWhenCartUpdatesDone(owner))
    );
  }

  getOrCreateConfigurationWhenCartUpdatesDone(
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
          if (owner.type === GenericConfigurator.OwnerType.PRODUCT) {
            this.store.dispatch(
              new ConfiguratorActions.CreateConfiguration(owner)
            );
          } else if (owner.type === GenericConfigurator.OwnerType.CART_ENTRY) {
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

  /**
   * Reads a configuratiom that is attached to an order entry, dispatching the respective action
   * @param owner Configuration owner
   */
  readConfigurationForOrderEntry(owner: GenericConfigurator.Owner) {
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

  /**
   * Reads a configuratiom that is attached to a cart entry, dispatching the respective action
   * @param owner Configuration owner
   */
  readConfigurationForCartEntry(owner: GenericConfigurator.Owner): void {
    this.activeCartService
      .requireLoadedCart()
      .pipe(take(1))
      .subscribe((cartState) => {
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
  updateConfiguration(
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
   * Adds a configuration to the cart, specified by the product code, a configuration ID and configuration owner key.
   *
   * @param productCode - Product code
   * @param configId - Configuration ID
   * @param ownerKey Configuration owner key
   */
  addToCart(productCode: string, configId: string, ownerKey: string): void {
    this.activeCartService
      .requireLoadedCart()
      .pipe(take(1))
      .subscribe((cartState) => {
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
  updateCartEntry(configuration: Configurator.Configuration): void {
    this.activeCartService
      .requireLoadedCart()
      .pipe(take(1))
      .subscribe((cartState) => {
        const cartId = this.genericConfigUtilsService.getCartId(
          cartState.value
        );
        const parameters: Configurator.UpdateConfigurationForCartEntryParameters = {
          userId: this.genericConfigUtilsService.getUserId(cartState.value),
          cartId: cartId,
          cartEntryNumber: configuration.owner.id,
          configuration: configuration,
        };
        this.store.dispatch(
          new ConfiguratorActions.UpdateCartEntry(parameters)
        );
      });
  }

  checkForActiveCartUpdateDone(): Observable<boolean> {
    return this.activeCartService.requireLoadedCart().pipe(
      take(1),
      switchMap((cartState) =>
        this.cartStore.pipe(
          select(
            MultiCartSelectors.getCartHasPendingProcessesSelectorFactory(
              this.genericConfigUtilsService.getCartId(cartState.value)
            )
          ),
          filter((hasPendingChanges) => !hasPendingChanges)
        )
      )
    );
  }

  checkForUpdateDone(cartId: string): Observable<boolean> {
    return this.cartStore.pipe(
      select(
        MultiCartSelectors.getCartHasPendingProcessesSelectorFactory(cartId)
      ),
      filter((hasPendingChanges) => !hasPendingChanges)
    );
  }

  ////
  // Helper methods
  ////
  getCartId(cart: Cart): string {
    return cart.user.uid === OCC_USER_ID_ANONYMOUS ? cart.guid : cart.code;
  }

  getUserId(cart: Cart): string {
    return cart.user.uid === OCC_USER_ID_ANONYMOUS
      ? cart.user.uid
      : OCC_USER_ID_CURRENT;
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
