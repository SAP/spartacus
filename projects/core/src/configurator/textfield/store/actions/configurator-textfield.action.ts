import { StateLoaderActions } from '../../../../state/utils/index';
import { CONFIGURATION_TEXTFIELD_DATA } from '../configuration-textfield-state';

export const CREATE_CONFIGURATION =
  '[Configurator] Create Configuration Textfield';
export const CREATE_CONFIGURATION_FAIL =
  '[Configurator] Create Configuration Textfield Fail';
export const CREATE_CONFIGURATION_SUCCESS =
  '[Configurator] Create Configuration Textfield Success';

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

export type ConfiguratorAction =
  | CreateConfiguration
  | CreateConfigurationFail
  | CreateConfigurationSuccess;
