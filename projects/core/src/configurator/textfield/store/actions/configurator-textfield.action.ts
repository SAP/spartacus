import { Action } from '@ngrx/store';
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
  | RemoveConfiguration;
