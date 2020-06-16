import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ActiveCartService,
  GenericConfigurator,
  GenericConfigUtilsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import * as ConfiguratorActions from '../state/actions/configurator-textfield.action';
import { StateWithConfigurationTextfield } from '../state/configuration-textfield-state';
import * as ConfiguratorSelectors from '../state/selectors/configurator-textfield.selector';

const SUCCESS_STATUS = 'SUCCESS';

@Injectable()
export class ConfiguratorTextfieldService {
  constructor(
    protected store: Store<StateWithConfigurationTextfield>,
    protected activeCartService: ActiveCartService,
    protected configuratorUtils: GenericConfigUtilsService
  ) {}

  /**
   * Creates a textfield configuration, specified by the configuration owner.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<ConfiguratorTextfield.Configuration>}
   */
  public createConfiguration(
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    this.store.dispatch(
      new ConfiguratorActions.CreateConfiguration({
        productCode: owner.id, //owner Id is the product code in this case
        owner: owner,
      })
    );

    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }

  /**
   * Updates a textfiled configuration, specified by the changed attribute.
   *
   * @param changedAttribute - Changed attribute
   */
  public updateConfiguration(
    changedAttribute: ConfiguratorTextfield.ConfigurationInfo
  ): void {
    this.store
      .pipe(select(ConfiguratorSelectors.getConfigurationContent), take(1))
      .subscribe((oldConfiguration) => {
        this.store.dispatch(
          new ConfiguratorActions.UpdateConfiguration(
            this.createNewConfigurationWithChange(
              changedAttribute,
              oldConfiguration
            )
          )
        );
      });
  }

  /**
   * Adds the textfield configuration to the cart, specified by its product code.
   *
   * @param productCode - Product code
   */
  public addToCart(productCode: string) {
    this.activeCartService.requireLoadedCart().subscribe((cartState) => {
      const addToCartParameters: ConfiguratorTextfield.AddToCartParameters = {
        userId: this.configuratorUtils.getUserId(cartState.value),
        cartId: this.configuratorUtils.getCartId(cartState.value),
        productCode: productCode,
        quantity: 1,
      };
      this.callAddToCartActionWithConfigurationData(addToCartParameters);
    });
  }

  /**
   * Updates a cart entry, specified by its cart entry number.
   *
   * @param cartEntryNumber - Cart entry number
   */
  public updateCartEntry(cartEntryNumber: string) {
    this.activeCartService.requireLoadedCart().subscribe((cartState) => {
      const updateCartParameters: ConfiguratorTextfield.UpdateCartEntryParameters = {
        userId: this.configuratorUtils.getUserId(cartState.value),
        cartId: this.configuratorUtils.getCartId(cartState.value),
        cartEntryNumber: cartEntryNumber,
      };
      this.callUpdateCartEntryActionWithConfigurationData(updateCartParameters);
    });
  }

  /**
   * Returns a textfield configuration from a cart entry.
   *
   * @param owner - Configuration owner
   *
   * @returns {Observable<ConfiguratorTextfield.Configuration>}
   */
  public readConfigurationForCartEntry(
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    this.activeCartService.requireLoadedCart().subscribe((cartState) => {
      const readFromCartEntryParameters: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
        userId: this.configuratorUtils.getUserId(cartState.value),
        cartId: this.configuratorUtils.getCartId(cartState.value),
        cartEntryNumber: owner.id,
        owner: owner,
      };
      this.store.dispatch(
        new ConfiguratorActions.ReadCartEntryConfiguration(
          readFromCartEntryParameters
        )
      );
    });
    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }

  ////
  // Helper methods
  ////
  callAddToCartActionWithConfigurationData(
    addToCartParameters: ConfiguratorTextfield.AddToCartParameters
  ): void {
    this.store
      .pipe(select(ConfiguratorSelectors.getConfigurationContent), take(1))
      .subscribe((configuration) => {
        addToCartParameters.configuration = configuration;
        this.store.dispatch(
          new ConfiguratorActions.AddToCart(addToCartParameters)
        );
      });
  }

  callUpdateCartEntryActionWithConfigurationData(
    updateCartEntryParameters: ConfiguratorTextfield.UpdateCartEntryParameters
  ): void {
    this.store
      .pipe(select(ConfiguratorSelectors.getConfigurationContent), take(1))
      .subscribe((configuration) => {
        updateCartEntryParameters.configuration = configuration;
        this.store.dispatch(
          new ConfiguratorActions.UpdateCartEntryConfiguration(
            updateCartEntryParameters
          )
        );
      });
  }

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
        changedAttribute.status = SUCCESS_STATUS;
        newConfiguration.configurationInfos.push(changedAttribute);
      } else {
        newConfiguration.configurationInfos.push(info);
      }
    });
    return newConfiguration;
  }
}
