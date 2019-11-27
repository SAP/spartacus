import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { CartService } from '../../../cart/facade/cart.service';
import { Cart } from '../../../model/cart.model';
import { Configurator } from '../../../model/configurator.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../../occ/utils/occ-constants';
import * as UiActions from '../store/actions/configurator-ui.action';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration, UiState } from '../store/configuration-state';
import * as UiSelectors from '../store/selectors/configurator-ui.selector';
import * as ConfiguratorSelectors from '../store/selectors/configurator.selector';

@Injectable()
export class ConfiguratorCommonsService {
  constructor(
    protected store: Store<StateWithConfiguration>,
    protected cartService: CartService
  ) {}

  hasConfiguration(productCode: string): Observable<Boolean> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(productCode)),
      map(configuration => this.isConfigurationCreated(configuration))
    );
  }

  getConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationFactory(productCode)),
      filter(configuration => this.isConfigurationCreated(configuration))
    );
  }

  getOrCreateConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationStateFactory(productCode)),
      tap(configurationState => {
        if (
          !this.isConfigurationCreated(configurationState.value) &&
          configurationState.loading !== true
        ) {
          this.store.dispatch(
            new ConfiguratorActions.CreateConfiguration(productCode)
          );
        }
      }),
      filter(configurationState =>
        this.isConfigurationCreated(configurationState.value)
      ),
      map(configurationState => configurationState.value)
    );
  }

  updateConfiguration(
    productCode: string,
    groupId: string,
    changedAttribute: Configurator.Attribute
  ): void {
    this.store
      .pipe(
        select(ConfiguratorSelectors.getConfigurationFactory(productCode)),
        take(1)
      )
      .subscribe(configuration => {
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

  getUiState(productCode: string): Observable<UiState> {
    return this.store.pipe(
      select(UiSelectors.getUiStateForProduct(productCode)),
      tap(uiState => {
        if (!this.isUiStateCreated(uiState)) {
          this.store.dispatch(new UiActions.CreateUiState(productCode));
        }
      }),
      filter(uiState => this.isUiStateCreated(uiState))
    );
  }

  setUiState(productCode: string, state: UiState) {
    this.store.dispatch(new UiActions.SetUiState(productCode, state));
  }

  removeUiState(productCode: string | string[]) {
    this.store.dispatch(new UiActions.RemoveUiState(productCode));
  }

  addToCart(productCode: string, configId: string) {
    const cart$ = this.cartService.getOrCreateCart();
    cart$.pipe(take(1)).subscribe(cart => {
      const addToCartParameters: Configurator.AddToCartParameters = {
        userId: this.getUserId(cart),
        cartId: this.getCartId(cart),
        productCode: productCode,
        quantity: 1,
        configId: configId,
      };

      this.store.dispatch(
        new ConfiguratorActions.AddToCart(addToCartParameters)
      );
    });
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

  isUiStateCreated(uiState: UiState): boolean {
    return uiState !== undefined;
  }

  isConfigurationCreated(configuration: Configurator.Configuration): boolean {
    return (
      configuration !== undefined &&
      configuration.configId !== undefined &&
      configuration.configId.length !== 0
    );
  }

  createConfigurationExtract(
    groupId: string,
    changedAttribute: Configurator.Attribute,
    configuration: Configurator.Configuration
  ): Configurator.Configuration {
    const newConfiguration: Configurator.Configuration = {
      configId: configuration.configId,
      groups: [],
    };

    const group = configuration.groups.find(
      currentGroup => currentGroup.id === groupId
    );
    if (group) {
      const changedGroup: Configurator.Group = {
        groupType: group.groupType,
        id: group.id,
        attributes: [changedAttribute],
      };
      newConfiguration.groups.push(changedGroup);
    }

    return newConfiguration;
  }
}
