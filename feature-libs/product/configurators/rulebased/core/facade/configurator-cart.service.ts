import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  CheckoutService,
  OCC_USER_ID_CURRENT,
  StateUtils,
  StateWithMultiCart,
} from '@spartacus/core';
import {
  GenericConfigurator,
  GenericConfiguratorUtilsService,
} from '@spartacus/product/configurators/common';
import { Observable } from 'rxjs';
import { delayWhen, filter, map, take, tap } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors/index';

@Injectable({ providedIn: 'root' })
export class ConfiguratorCartService {
  constructor(
    protected cartStore: Store<StateWithMultiCart>,
    protected store: Store<StateWithConfigurator>,
    protected activeCartService: ActiveCartService,
    protected genericConfigUtilsService: GenericConfiguratorUtilsService,
    protected checkoutService: CheckoutService
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
      delayWhen(() =>
        this.checkoutService.isLoading().pipe(filter((loading) => !loading))
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
   * @param owner Configuration owner
   */
  addToCart(
    productCode: string,
    configId: string,
    owner: GenericConfigurator.Owner
  ): void {
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
          owner: owner,
        };
        this.store.dispatch(
          new ConfiguratorActions.AddToCart(addToCartParameters)
        );
      });
  }

  /**
   * Updates a cart entry, specified by the configuration.
   * The cart entry number for the entry that owns the configuration can be told
   * from the configuration's owner ID
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
  /**
   * Can be used to check if the active cart has any product configuration issues.
   * @returns True if and only if there is at least one cart entry with product configuration issues
   */
  activeCartHasIssues(): Observable<boolean> {
    return this.activeCartService.requireLoadedCart().pipe(
      map((cartState) => cartState.value.entries),
      map((entries) =>
        entries
          ? entries.filter((entry) =>
              this.genericConfigUtilsService.getNumberOfIssues(entry)
            )
          : []
      ),
      map((entries) => entries.length > 0)
    );
  }

  protected isConfigurationCreated(
    configuration: Configurator.Configuration
  ): boolean {
    const configId: String = configuration?.configId;
    return configId !== undefined && configId.length !== 0;
  }

  protected configurationNeedsReading(
    configurationState: StateUtils.LoaderState<Configurator.Configuration>
  ): boolean {
    return (
      !this.isConfigurationCreated(configurationState.value) &&
      !configurationState.loading &&
      !configurationState.error
    );
  }
}
