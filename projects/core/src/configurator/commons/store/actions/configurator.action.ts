import { Configurator } from '../../../../model/configurator.model';
import { StateEntityLoaderActions } from '../../../../state/utils/index';
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
  '[Configurator] Update Configuration Success';

export const UPDATE_CONFIGURATION_FINALIZE_SUCCESS =
  '[Configurator] Update Configuration finalize success';
export const UPDATE_CONFIGURATION_FINALIZE_FAIL =
  '[Configurator] Update Configuration finalize fail';
export const CHANGE_GROUP = '[Configurator] Change group';
export const CHANGE_GROUP_FINALIZE = '[Configurator] Change group finalize';

export const UPDATE_PRICE_SUMMARY =
  '[Configurator] Update Configuration Summary Price';
export const UPDATE_PRICE_SUMMARY_FAIL =
  '[Configurator] Update Configuration Price Summary fail';
export const UPDATE_PRICE_SUMMARY_SUCCESS =
  '[Configurator] Update Configuration Price Summary success';

export class CreateConfiguration extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = CREATE_CONFIGURATION;
  constructor(public productCode: string) {
    super(CONFIGURATION_DATA, productCode);
  }
}

export class CreateConfigurationFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = CREATE_CONFIGURATION_FAIL;
  constructor(productCode: string, public payload: any) {
    super(CONFIGURATION_DATA, productCode, payload);
  }
}

export class CreateConfigurationSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = CREATE_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class ReadConfiguration extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = READ_CONFIGURATION;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class ReadConfigurationFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = READ_CONFIGURATION_FAIL;
  constructor(productCode: string, public payload: any) {
    super(CONFIGURATION_DATA, productCode, payload);
  }
}

export class ReadConfigurationSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = READ_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class UpdateConfiguration extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = UPDATE_CONFIGURATION;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class UpdateConfigurationFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = UPDATE_CONFIGURATION_FAIL;
  constructor(productCode: string, public payload: any) {
    super(CONFIGURATION_DATA, productCode, payload);
  }
}

export class UpdateConfigurationSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = UPDATE_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class UpdateConfigurationFinalizeSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = UPDATE_CONFIGURATION_FINALIZE_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class UpdateConfigurationFinalizeFail extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = UPDATE_CONFIGURATION_FINALIZE_FAIL;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class UpdatePriceSummary extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = UPDATE_PRICE_SUMMARY;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}
export class UpdatePriceSummaryFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = UPDATE_PRICE_SUMMARY_FAIL;
  constructor(productCode: string, public payload: any) {
    super(CONFIGURATION_DATA, productCode, payload);
  }
}

export class UpdatePriceSummarySuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = UPDATE_PRICE_SUMMARY_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class ChangeGroup extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = CHANGE_GROUP;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA, payload.productCode);
  }
}

export class ChangeGroupFinalize extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = CHANGE_GROUP_FINALIZE;
  constructor(public payload: any) {
    super(CONFIGURATION_DATA, payload.productCode);
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
  | UpdateConfigurationSuccess
  | UpdateConfigurationFinalizeFail
  | UpdateConfigurationFinalizeSuccess
  | UpdatePriceSummary
  | UpdatePriceSummaryFail
  | UpdatePriceSummarySuccess
  | ChangeGroup
  | ChangeGroupFinalize;
