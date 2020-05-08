import { Action } from '@ngrx/store';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { StateLoaderActions } from '../../../../state/utils/index';
import { CONFIGURATION_TEXTFIELD_DATA } from '../configuration-textfield-state';

export const CREATE_CONFIGURATION =
  '[Configurator] Create Configuration Textfield';
export const CREATE_CONFIGURATION_FAIL =
  '[Configurator] Create Configuration Textfield Fail';
export const CREATE_CONFIGURATION_SUCCESS =
  '[Configurator] Create Configuration Textfield Success';
export const UPDATE_CONFIGURATION =
  '[Configurator] Update Configuration Textfield';
export const ADD_TO_CART = '[Configurator] Add to cart Textfield';
export const READ_CART_ENTRY_CONFIGURATION =
  '[Configurator] Read cart entry configuration Textfield';
export const READ_CART_ENTRY_CONFIGURATION_FAIL =
  '[Configurator] Read cart entry configuration Textfield Fail';
export const READ_CART_ENTRY_CONFIGURATION_SUCCESS =
  '[Configurator] Read cart entry configuration Textfield Success';
export const REMOVE_CONFIGURATION =
  '[Configurator] Remove Configuration Textfield';

export class CreateConfiguration extends StateLoaderActions.LoaderLoadAction {
  readonly type = CREATE_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class CreateConfigurationFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CREATE_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA, payload);
  }
}

export class CreateConfigurationSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CREATE_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class UpdateConfiguration implements Action {
  readonly type = UPDATE_CONFIGURATION;
  constructor(public payload: any) {}
}

export class AddToCart extends StateLoaderActions.LoaderLoadAction {
  readonly type = ADD_TO_CART;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class ReadCartEntryConfiguration extends StateLoaderActions.LoaderLoadAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION;
  constructor(
    public payload: GenericConfigurator.ReadConfigurationFromCartEntryParameters
  ) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class ReadCartEntryConfigurationSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class ReadCartEntryConfigurationFail extends StateLoaderActions.LoaderFailAction {
  readonly type = READ_CART_ENTRY_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export class RemoveConfiguration extends StateLoaderActions.LoaderResetAction {
  readonly type = REMOVE_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_TEXTFIELD_DATA);
  }
}

export type ConfiguratorAction =
  | CreateConfiguration
  | CreateConfigurationFail
  | CreateConfigurationSuccess
  | UpdateConfiguration
  | ReadCartEntryConfigurationFail
  | ReadCartEntryConfigurationSuccess
  | ReadCartEntryConfiguration
  | RemoveConfiguration;
