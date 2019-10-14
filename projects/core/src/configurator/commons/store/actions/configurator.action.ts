import { StateLoaderActions } from '../../../../state/utils/index';
import { CONFIGURATION_DATA } from '../configuration-state';

export const CREATE_CONFIGURATION = '[Configurator] Create Configuration';
export const CREATE_CONFIGURATION_FAIL =
  '[Configurator] Create Configuration Fail';
export const CREATE_CONFIGURATION_SUCCESS =
  '[Configurator] Create Configuration Sucess';
export const READ_CONFIGURATION = '[Configurator] Read Configuration';
export const READ_CONFIGURATION_FAIL = '[Configurator] Read Configuration Fail';
export const READ_CONFIGURATION_SUCCESS =
  '[Configurator] Read Configuration Sucess';
export const UPDATE_CONFIGURATION = '[Configurator] Update Configuration';
export const UPDATE_CONFIGURATION_FAIL =
  '[Configurator] Update Configuration Fail';
export const UPDATE_CONFIGURATION_SUCCESS =
  '[Configurator] Update Configuration Sucess';

export class CreateConfiguration extends StateLoaderActions.LoaderLoadAction {
  readonly type = CREATE_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA);
  }
}

export class CreateConfigurationFail extends StateLoaderActions.LoaderFailAction {
  readonly type = CREATE_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA, payload);
  }
}

export class CreateConfigurationSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = CREATE_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA);
  }
}

export class ReadConfiguration extends StateLoaderActions.LoaderLoadAction {
  readonly type = READ_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA);
  }
}

export class ReadConfigurationFail extends StateLoaderActions.LoaderFailAction {
  readonly type = READ_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA, payload);
  }
}

export class ReadConfigurationSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = READ_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA);
  }
}

export class UpdateConfiguration extends StateLoaderActions.LoaderLoadAction {
  readonly type = UPDATE_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA);
  }
}

export class UpdateConfigurationFail extends StateLoaderActions.LoaderFailAction {
  readonly type = UPDATE_CONFIGURATION_FAIL;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA, payload);
  }
}

export class UpdateConfigurationSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = UPDATE_CONFIGURATION_SUCCESS;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA);
  }
}

export type ConfiguratorAction =
  | CreateConfiguration
  | CreateConfigurationFail
  | CreateConfigurationSuccess
  | ReadConfiguration
  | ReadConfigurationFail
  | ReadConfigurationSuccess
  | UpdateConfiguration
  | UpdateConfigurationFail
  | UpdateConfigurationSuccess;
