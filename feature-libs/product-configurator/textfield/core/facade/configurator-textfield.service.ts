import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { filter, map, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldActions } from '../state/actions/index';
import { StateWithConfigurationTextfield } from '../state/configuration-textfield-state';
import { ConfiguratorTextFieldSelectors } from '../state/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorTextfieldService {
  constructor(
    protected store: Store<StateWithConfigurationTextfield>,
    protected activeCartService: ActiveCartService,
    protected configuratorUtils: CommonConfiguratorUtilsService,
    protected userIdService: UserIdService
  ) {}

  /**
   * Creates a default textfield configuration for a product specified by the configuration owner.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<ConfiguratorTextfield.Configuration>}
   */
  createConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.store.pipe(
      select(ConfiguratorTextFieldSelectors.getConfigurationsState),
      tap((configurationState) => {
        const configuration = configurationState.loaderState.value;
        const isAvailableForProduct =
          configuration !== undefined &&
          !ConfiguratorModelUtils.isInitialOwner(configuration.owner);
        const isLoading = configurationState.loaderState.loading;
        if (!isAvailableForProduct && !isLoading) {
          this.store.dispatch(
            new ConfiguratorTextfieldActions.CreateConfiguration({
              productCode: owner.id, //owner Id is the product code in this case
              owner: owner,
            })
          );
        }
      }),
      map((configurationState) => configurationState.loaderState.value),
      filter((configuration) => !this.isConfigurationInitial(configuration)),
      //save to assume configuration is defined, see previous filter
      map(
        (configuration) =>
          configuration ?? {
            configurationInfos: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
          }
      )
    );
  }

  /**
   * Updates a textfield configuration, specified by the changed attribute.
   *
   * @param changedAttribute - Changed attribute
   */
  updateConfiguration(
    changedAttribute: ConfiguratorTextfield.ConfigurationInfo
  ): void {
    this.store
      .pipe(
        select(ConfiguratorTextFieldSelectors.getConfigurationContent),
        take(1)
      )
      .subscribe((oldConfiguration) => {
        if (oldConfiguration) {
          this.store.dispatch(
            new ConfiguratorTextfieldActions.UpdateConfiguration(
              this.createNewConfigurationWithChange(
                changedAttribute,
                oldConfiguration
              )
            )
          );
        }
      });
  }

  /**
   * Adds the textfield configuration to the cart
   *
   * @param productCode - Product code of the configuration root product. Cart entry carries refers to this product
   * @param configuration Textfield configuration
   */
  addToCart(
    productCode: string,
    configuration: ConfiguratorTextfield.Configuration
  ): void {
    this.activeCartService
      .requireLoadedCart()
      .pipe(take(1))
      .subscribe((cartState) => {
        this.userIdService
          .getUserId()
          .pipe(take(1))
          .subscribe((userId) => {
            const addToCartParameters: ConfiguratorTextfield.AddToCartParameters =
              {
                userId: userId,
                cartId: this.configuratorUtils.getCartId(cartState.value),
                productCode: productCode,
                configuration: configuration,
                quantity: 1,
              };
            this.store.dispatch(
              new ConfiguratorTextfieldActions.AddToCart(addToCartParameters)
            );
          });
      });
  }

  /**
   * Updates a cart entry, specified by its cart entry number.
   *
   * @param cartEntryNumber - Cart entry number
   * @param configuration Textfield configuration (list of alphanumeric attributes)
   */
  updateCartEntry(
    cartEntryNumber: string,
    configuration: ConfiguratorTextfield.Configuration
  ): void {
    this.activeCartService
      .requireLoadedCart()
      .pipe(take(1))
      .subscribe((cartState) => {
        this.userIdService
          .getUserId()
          .pipe(take(1))
          .subscribe((userId) => {
            const updateCartParameters: ConfiguratorTextfield.UpdateCartEntryParameters =
              {
                userId: userId,
                cartId: this.configuratorUtils.getCartId(cartState.value),
                cartEntryNumber: cartEntryNumber,
                configuration: configuration,
              };
            this.store.dispatch(
              new ConfiguratorTextfieldActions.UpdateCartEntryConfiguration(
                updateCartParameters
              )
            );
          });
      });
  }

  /**
   * Returns a textfield configuration for a cart entry.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<ConfiguratorTextfield.Configuration>}
   */
  readConfigurationForCartEntry(
    owner: CommonConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.activeCartService.requireLoadedCart().pipe(
      switchMap((cartState) =>
        this.userIdService
          .getUserId()
          .pipe(
            take(1),
            map((userId) => ({ cartState, userId: userId }))
          )
          .pipe(
            map((cont) => ({
              userId: cont.userId,
              cartId: this.configuratorUtils.getCartId(cont.cartState.value),
              cartEntryNumber: owner.id,
              owner: owner,
            })),
            tap((readFromCartEntryParameters) =>
              this.store.dispatch(
                new ConfiguratorTextfieldActions.ReadCartEntryConfiguration(
                  readFromCartEntryParameters
                )
              )
            ),
            switchMapTo(
              this.store.pipe(
                select(ConfiguratorTextFieldSelectors.getConfigurationContent)
              )
            ),
            filter(
              (configuration) => !this.isConfigurationInitial(configuration)
            ),
            //save to assume that the configuration exists, see previous filter
            map((configuration) =>
              configuration
                ? configuration
                : {
                    configurationInfos: [],
                    owner: ConfiguratorModelUtils.createInitialOwner(),
                  }
            )
          )
      )
    );
  }

  /**
   * Returns the textfield configuration attached to an order entry.
   *
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   *
   * @returns {Observable<ConfiguratorTextfield.Configuration>}
   */
  readConfigurationForOrderEntry(
    owner: CommonConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    const ownerIdParts = this.configuratorUtils.decomposeOwnerId(owner.id);
    const readFromOrderEntryParameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
      {
        userId: OCC_USER_ID_CURRENT,
        orderId: ownerIdParts.documentId,
        orderEntryNumber: ownerIdParts.entryNumber,
        owner: owner,
      };
    this.store.dispatch(
      new ConfiguratorTextfieldActions.ReadOrderEntryConfiguration(
        readFromOrderEntryParameters
      )
    );
    return this.store.pipe(
      select(ConfiguratorTextFieldSelectors.getConfigurationContent),
      filter((configuration) => !this.isConfigurationInitial(configuration)),
      map((configuration) =>
        configuration
          ? configuration
          : {
              configurationInfos: [],
              owner: ConfiguratorModelUtils.createInitialOwner(),
            }
      )
    );
  }
  /**
   * Creates a textfield configuration supposed to be sent to the backend when an attribute
   * has been changed
   * @param changedAttribute Attribute changed by the end user
   * @param oldConfiguration Existing configuration to which the attribute change is applied to
   * @returns Textfield configuration (merge of existing configuration and the changed attribute)
   */
  createNewConfigurationWithChange(
    changedAttribute: ConfiguratorTextfield.ConfigurationInfo,
    oldConfiguration: ConfiguratorTextfield.Configuration
  ): ConfiguratorTextfield.Configuration {
    const newConfiguration: ConfiguratorTextfield.Configuration = {
      configurationInfos: [],
      owner: oldConfiguration.owner,
    };
    oldConfiguration.configurationInfos.forEach((info) => {
      if (info.configurationLabel === changedAttribute.configurationLabel) {
        changedAttribute.status =
          ConfiguratorTextfield.ConfigurationStatus.SUCCESS;
        newConfiguration.configurationInfos.push(changedAttribute);
      } else {
        newConfiguration.configurationInfos.push(info);
      }
    });
    return newConfiguration;
  }

  protected isConfigurationInitial(
    configuration?: ConfiguratorTextfield.Configuration
  ): boolean {
    return (
      configuration === undefined ||
      ConfiguratorModelUtils.isInitialOwner(configuration.owner)
    );
  }
}
