import { Action } from '@ngrx/store';
import {
  Configurator,
  GenericConfigurator,
  MULTI_CART_DATA,
  StateUtils,
} from '@spartacus/core';
import { CONFIGURATION_DATA } from '../configuration-state';

export const READ_CART_ENTRY_CONFIGURATION =
  '[Configurator] Read Cart Entry Configuration';
export const READ_CART_ENTRY_CONFIGURATION_SUCCESS =
  '[Configurator] Read Cart Entry Configuration Success';
export const READ_CART_ENTRY_CONFIGURATION_FAIL =
  '[Configurator] Read Cart Entry Configuration Fail';
export const READ_ORDER_ENTRY_CONFIGURATION =
  '[Configurator] Read Order Entry Configuration';
export const READ_ORDER_ENTRY_CONFIGURATION_SUCCESS =
  '[Configurator] Read Order Entry Configuration Success';
export const READ_ORDER_ENTRY_CONFIGURATION_FAIL =
  '[Configurator] Read Order Entry Configuration Fail';

export const ADD_TO_CART = '[Configurator] Add to cart';
export const UPDATE_CART_ENTRY = '[Configurator] Update cart entry';
export const UPDATE_CART_ENTRY_SUCCESS =
  '[Configurator] Update cart entry success';

export const ADD_NEXT_OWNER = '[Configurator] Add next owner';
export const SET_NEXT_OWNER_CART_ENTRY =
  '[Configurator] Set next owner cart entry';

export class ReadCartEntryConfiguration extends StateUtils.EntityLoadAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION;
  constructor(
    public payload: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ReadCartEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ReadCartEntryConfigurationFail extends StateUtils.EntityFailAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_FAIL;
  constructor(public payload: { ownerKey: string; error: any }) {
    super(CONFIGURATION_DATA, payload.ownerKey, payload.error);
  }
}

export class ReadOrderEntryConfiguration extends StateUtils.EntityLoadAction {
  readonly type = READ_ORDER_ENTRY_CONFIGURATION;
  constructor(
    public payload: GenericConfigurator.ReadConfigurationFromOrderEntryParameters
  ) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ReadOrderEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
  readonly type = READ_ORDER_ENTRY_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.owner.key);
  }
}

export class ReadOrderEntryConfigurationFail extends StateUtils.EntityFailAction {
  readonly type = READ_ORDER_ENTRY_CONFIGURATION_FAIL;
  constructor(public payload: { ownerKey: string; error: any }) {
    super(CONFIGURATION_DATA, payload.ownerKey, payload.error);
  }
}

export class AddToCart extends StateUtils.EntityProcessesIncrementAction {
  readonly type = ADD_TO_CART;
  constructor(public payload: Configurator.AddToCartParameters) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class UpdateCartEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = UPDATE_CART_ENTRY;
  constructor(
    public payload: Configurator.UpdateConfigurationForCartEntryParameters
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class AddNextOwner implements Action {
  readonly type = ADD_NEXT_OWNER;
  constructor(public payload: { ownerKey: string; cartEntryNo: string }) {}
}

export class SetNextOwnerCartEntry extends StateUtils.EntitySuccessAction {
  readonly type = SET_NEXT_OWNER_CART_ENTRY;

  constructor(
    public payload: {
      configuration: Configurator.Configuration;
      cartEntryNo: string;
    }
  ) {
    super(CONFIGURATION_DATA, payload.configuration.owner.key);
  }
}

export type ConfiguratorCartAction =
  | AddNextOwner
  | SetNextOwnerCartEntry
  | ReadCartEntryConfiguration
  | ReadCartEntryConfigurationSuccess
  | ReadCartEntryConfigurationFail
  | ReadOrderEntryConfiguration
  | ReadOrderEntryConfigurationSuccess
  | ReadOrderEntryConfigurationFail
  | UpdateCartEntry;
