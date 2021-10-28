import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CheckoutFacade } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  OCC_USER_ID_CURRENT,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { delayWhen, filter, map, take, tap } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors/index';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorCartService {
  constructor(
    protected store: Store<StateWithConfigurator>,
    protected activeCartService: ActiveCartService,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected checkoutFacade: CheckoutFacade,
    protected userIdService: UserIdService,
    protected configuratorUtilsService: ConfiguratorUtilsService
  ) {}

  /**
   * Reads a configuratiom that is attached to a cart entry, dispatching the respective action
   * @param owner Configuration owner
   * @returns Observable of product configurations
   */
  readConfigurationForCartEntry(
    owner: CommonConfigurator.Owner
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
        this.checkoutFacade.isLoading().pipe(filter((loading) => !loading))
      ),
      tap((configurationState) => {
        if (this.configurationNeedsReading(configurationState)) {
          this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cartState) => {
              this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                  const readFromCartEntryParameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
                    {
                      userId: userId,
                      cartId: this.commonConfigUtilsService.getCartId(
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
            });
        }
      }),
      filter(
        (configurationState) =>
          configurationState.value !== undefined &&
          this.isConfigurationCreated(configurationState.value)
      ),
      //save to assume configuration is defined after previous filter
      map((configurationState) =>
        this.configuratorUtilsService.getConfigurationFromState(
          configurationState
        )
      )
    );
  }
  /**
   * Reads a configuratiom that is attached to an order entry, dispatching the respective action
   * @param owner Configuration owner
   * @returns Observable of product configurations
   */
  readConfigurationForOrderEntry(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(
        ConfiguratorSelectors.getConfigurationProcessLoaderStateFactory(
          owner.key
        )
      ),
      tap((configurationState) => {
        if (this.configurationNeedsReading(configurationState)) {
          const ownerIdParts = this.commonConfigUtilsService.decomposeOwnerId(
            owner.id
          );
          const readFromOrderEntryParameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
            {
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
      filter(
        (configurationState) =>
          configurationState.value !== undefined &&
          this.isConfigurationCreated(configurationState.value)
      ),
      //save to assume configuration is defined after previous filter
      map((configurationState) =>
        this.configuratorUtilsService.getConfigurationFromState(
          configurationState
        )
      )
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
    owner: CommonConfigurator.Owner
  ): void {
    this.activeCartService
      .requireLoadedCart()
      .pipe(take(1))
      .subscribe((cartState) => {
        this.userIdService
          .getUserId()
          .pipe(take(1))
          .subscribe((userId) => {
            const addToCartParameters: Configurator.AddToCartParameters = {
              userId: userId,
              cartId: this.commonConfigUtilsService.getCartId(cartState.value),
              productCode: productCode,
              quantity: 1,
              configId: configId,
              owner: owner,
            };
            this.store.dispatch(
              new ConfiguratorActions.AddToCart(addToCartParameters)
            );
          });
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
        this.userIdService
          .getUserId()
          .pipe(take(1))
          .subscribe((userId) => {
            const parameters: Configurator.UpdateConfigurationForCartEntryParameters =
              {
                userId: userId,
                cartId: this.commonConfigUtilsService.getCartId(
                  cartState.value
                ),
                cartEntryNumber: configuration.owner.id,
                configuration: configuration,
              };

            this.store.dispatch(
              new ConfiguratorActions.UpdateCartEntry(parameters)
            );
          });
      });
  }
  /**
   * Can be used to check if the active cart has any product configuration issues.
   * @returns True if and only if there is at least one cart entry with product configuration issues
   */
  activeCartHasIssues(): Observable<boolean> {
    return this.activeCartService.requireLoadedCart().pipe(
      map((cartState) => {
        return cartState.value ? cartState.value.entries : [];
      }),
      map((entries) =>
        entries
          ? entries.filter((entry) =>
              this.commonConfigUtilsService.getNumberOfIssues(entry)
            )
          : []
      ),
      map((entries) => entries.length > 0)
    );
  }

  /**
   * Remove all configurations that are linked to cart entries
   */
  removeCartBoundConfigurations(): void {
    this.store.dispatch(
      new ConfiguratorActions.RemoveCartBoundConfigurations()
    );
  }

  protected isConfigurationCreated(
    configuration: Configurator.Configuration
  ): boolean {
    const configId: String = configuration.configId;
    return configId.length !== 0;
  }

  protected configurationNeedsReading(
    configurationState: StateUtils.LoaderState<Configurator.Configuration>
  ): boolean {
    const configuration = configurationState.value;
    return (
      configuration === undefined ||
      (!this.isConfigurationCreated(configuration) &&
        !configurationState.loading &&
        !configurationState.error)
    );
  }
}
