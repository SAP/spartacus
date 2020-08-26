import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delayWhen, filter, map, take, tap } from 'rxjs/operators';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { StateWithMultiCart } from '../../../cart/store/multi-cart-state';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { GenericConfigUtilsService } from '../../generic/utils/config-utils.service';
import { ConfiguratorSelectors } from '../store';
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
   * Reads a configuratiom that is attached to a cart entry, dispatching the respective action
   * @param owner Configuration owner
   * @returns Observable of product configurations
   */
  readConfigurationForCartEntry(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),
      //needed as we cannot read the cart in general and for the OV
      //in parallel, this can lead to cache issues with promotions
      delayWhen(() =>
        this.activeCartService.isStable().pipe(filter((stable) => stable))
      ),
      tap((configurationState) => {
        if (this.configurationNeedsReading(configurationState)) {
          this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cartState) => {
              const readFromCartEntryParameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
                userId: this.genericConfigUtilsService.getUserId(
                  cartState.value
                ),
                cartId: this.genericConfigUtilsService.getCartId(
                  cartState.value
                ),
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
   * @returns Observable of product configurations
   */
  readConfigurationForOrderEntry(
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),
      tap((configurationState) => {
        if (this.configurationNeedsReading(configurationState)) {
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
      }),
      filter((configurationState) =>
        this.isConfigurationCreated(configurationState.value)
      ),
      map((configurationState) => configurationState.value)
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

  protected isConfigurationCreated(
    configuration: Configurator.Configuration
  ): boolean {
    const configId: String = configuration?.configId;
    return configId !== undefined && configId.length !== 0;
  }

  protected configurationNeedsReading(
    configurationState: LoaderState<Configurator.Configuration>
  ): boolean {
    return (
      !this.isConfigurationCreated(configurationState.value) &&
      configurationState.loading !== true &&
      configurationState.error !== true
    );
  }
}
