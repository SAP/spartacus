import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActiveCartService } from '@spartacus/core';
import {
  GenericConfigurator,
  GenericConfiguratorUtilsService,
} from '@spartacus/product/configurators/common';
import { Observable } from 'rxjs';
import { filter, map, switchMapTo, take, tap } from 'rxjs/operators';
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
    protected configuratorUtils: GenericConfiguratorUtilsService
  ) {}

  /**
   * Creates a default textfield configuration for a product specified by the configuration owner.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<ConfiguratorTextfield.Configuration>}
   */
  createConfiguration(
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.store.pipe(
      select(ConfiguratorTextFieldSelectors.getConfigurationsState),
      tap((configurationState) => {
        const isAvailableForProduct =
          configurationState.loaderState.value?.owner.type ===
          GenericConfigurator.OwnerType.PRODUCT;
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
      filter((configuration) => !this.isConfigurationInitial(configuration))
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
        this.store.dispatch(
          new ConfiguratorTextfieldActions.UpdateConfiguration(
            this.createNewConfigurationWithChange(
              changedAttribute,
              oldConfiguration
            )
          )
        );
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
        const addToCartParameters: ConfiguratorTextfield.AddToCartParameters = {
          userId: this.configuratorUtils.getUserId(cartState.value),
          cartId: this.configuratorUtils.getCartId(cartState.value),
          productCode: productCode,
          configuration: configuration,
          quantity: 1,
        };
        this.store.dispatch(
          new ConfiguratorTextfieldActions.AddToCart(addToCartParameters)
        );
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
        const updateCartParameters: ConfiguratorTextfield.UpdateCartEntryParameters = {
          userId: this.configuratorUtils.getUserId(cartState.value),
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
  }

  /**
   * Returns a textfield configuration for a cart entry.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<ConfiguratorTextfield.Configuration>}
   */
  readConfigurationForCartEntry(
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.activeCartService.requireLoadedCart().pipe(
      map((cartState) => ({
        userId: this.configuratorUtils.getUserId(cartState.value),
        cartId: this.configuratorUtils.getCartId(cartState.value),
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
      filter((configuration) => !this.isConfigurationInitial(configuration))
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
    configuration: ConfiguratorTextfield.Configuration
  ): boolean {
    return configuration?.owner?.type === undefined;
  }
}
