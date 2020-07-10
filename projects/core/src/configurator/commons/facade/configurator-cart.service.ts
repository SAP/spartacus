import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { MultiCartSelectors } from '../../../cart/store/index';
import { StateWithMultiCart } from '../../../cart/store/multi-cart-state';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { GenericConfigUtilsService } from '../../generic/utils/config-utils.service';
import { ConfiguratorActions } from '../store/actions/index';
import { StateWithConfiguration } from '../store/configuration-state';

@Injectable()
export class ConfiguratorCartService {
  constructor(
    protected cartStore: Store<StateWithMultiCart>,
    protected store: Store<StateWithConfiguration>,
    protected activeCartService: ActiveCartService,
    protected genericConfigUtilsService: GenericConfigUtilsService
  ) {}
  /**
   * Checks if there are no updates for the active cart pending
   * @returns Observable emitting that no changes are pending
   */
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
}
