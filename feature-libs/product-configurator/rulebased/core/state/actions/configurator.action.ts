import { StateUtils } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '../../model/configurator.model';
import { CONFIGURATOR_DATA } from '../configurator-state';

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

export const REMOVE_CONFIGURATION = '[Configurator] Remove configuration';

export const UPDATE_PRICE_SUMMARY =
  '[Configurator] Update Configuration Summary Price';
export const UPDATE_PRICE_SUMMARY_FAIL =
  '[Configurator] Update Configuration Price Summary fail';
export const UPDATE_PRICE_SUMMARY_SUCCESS =
  '[Configurator] Update Configuration Price Summary success';

export const GET_CONFIGURATION_OVERVIEW =
  '[Configurator] Get Configuration Overview';
export const GET_CONFIGURATION_OVERVIEW_FAIL =
  '[Configurator] Get Configuration Overview fail';
export const GET_CONFIGURATION_OVERVIEW_SUCCESS =
  '[Configurator] Get Configuration Overview success';

export const SET_INTERACTION_STATE = '[Configurator] Set interaction state';
export const SET_CURRENT_GROUP = '[Configurator] Set current group to State';
export const SET_MENU_PARENT_GROUP =
  '[Configurator] Set current parent group for menu to State';

export const SET_GROUPS_VISITED = '[Configurator] Set groups to visited';

export class CreateConfiguration extends StateUtils.EntityLoadAction {
  readonly type = CREATE_CONFIGURATION;
  constructor(public payload: CommonConfigurator.Owner) {
    super(CONFIGURATOR_DATA, payload.key);
  }
}

export class CreateConfigurationFail extends StateUtils.EntityFailAction {
  readonly type = CREATE_CONFIGURATION_FAIL;
  constructor(
    public payload: {
      ownerKey: string;
      error: any;
    }
  ) {
    super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
  }
}

export class CreateConfigurationSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CREATE_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class ReadConfiguration extends StateUtils.EntityLoadAction {
  readonly type = READ_CONFIGURATION;
  constructor(
    public payload: {
      configuration: Configurator.Configuration;
      groupId: string;
    }
  ) {
    super(CONFIGURATOR_DATA, payload.configuration.owner.key);
  }
}

export class ReadConfigurationFail extends StateUtils.EntityFailAction {
  readonly type = READ_CONFIGURATION_FAIL;
  constructor(public payload: { ownerKey: string; error: any }) {
    super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
  }
}

export class ReadConfigurationSuccess extends StateUtils.EntitySuccessAction {
  readonly type = READ_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class UpdateConfiguration extends StateUtils.EntityProcessesIncrementAction {
  readonly type = UPDATE_CONFIGURATION;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
    this.meta.loader = {
      load: true,
    };
  }
}

export class UpdateConfigurationFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = UPDATE_CONFIGURATION_FAIL;
  constructor(
    public payload: { configuration: Configurator.Configuration; error: any }
  ) {
    super(CONFIGURATOR_DATA, payload.configuration.owner.key);
    this.meta.loader = {
      error: payload.error,
    };
  }
}

export class UpdateConfigurationSuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = UPDATE_CONFIGURATION_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class UpdateConfigurationFinalizeSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_CONFIGURATION_FINALIZE_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class UpdateConfigurationFinalizeFail extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_CONFIGURATION_FINALIZE_FAIL;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class UpdatePriceSummary extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_PRICE_SUMMARY;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}
export class UpdatePriceSummaryFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_PRICE_SUMMARY_FAIL;
  constructor(public payload: { ownerKey: string; error: any }) {
    super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
  }
}

export class UpdatePriceSummarySuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_PRICE_SUMMARY_SUCCESS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class ChangeGroup extends StateUtils.EntityLoadAction {
  readonly type = CHANGE_GROUP;
  constructor(
    public payload: {
      configuration: Configurator.Configuration;
      groupId: string;
      /**
       * Id of parent group. Can be undefined for groups on root level
       */
      parentGroupId?: string;
    }
  ) {
    super(CONFIGURATOR_DATA, payload.configuration.owner.key);
  }
}

export class ChangeGroupFinalize extends StateUtils.EntityLoadAction {
  readonly type = CHANGE_GROUP_FINALIZE;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class RemoveConfiguration extends StateUtils.EntityLoaderResetAction {
  readonly type = REMOVE_CONFIGURATION;
  constructor(public payload: { ownerKey: string | string[] }) {
    super(CONFIGURATOR_DATA, payload.ownerKey);
  }
}

export class GetConfigurationOverview extends StateUtils.EntityLoadAction {
  readonly type = GET_CONFIGURATION_OVERVIEW;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class GetConfigurationOverviewFail extends StateUtils.EntityFailAction {
  readonly type = GET_CONFIGURATION_OVERVIEW_FAIL;
  constructor(public payload: { ownerKey: string; error: any }) {
    super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
  }
}

export class GetConfigurationOverviewSuccess extends StateUtils.EntitySuccessAction {
  readonly type = GET_CONFIGURATION_OVERVIEW_SUCCESS;
  constructor(
    public payload: { ownerKey: string; overview: Configurator.Overview }
  ) {
    super(CONFIGURATOR_DATA, payload.ownerKey);
  }
}

export class SetInteractionState extends StateUtils.EntitySuccessAction {
  readonly type = SET_INTERACTION_STATE;

  constructor(
    public payload: {
      entityKey: string | string[];
      interactionState: Configurator.InteractionState;
    }
  ) {
    super(CONFIGURATOR_DATA, payload.entityKey, payload.interactionState);
  }
}

export class SetCurrentGroup extends StateUtils.EntitySuccessAction {
  readonly type = SET_CURRENT_GROUP;

  constructor(
    public payload: { entityKey: string | string[]; currentGroup: string }
  ) {
    super(CONFIGURATOR_DATA, payload.entityKey, payload.currentGroup);
  }
}

export class SetMenuParentGroup extends StateUtils.EntitySuccessAction {
  readonly type = SET_MENU_PARENT_GROUP;

  constructor(
    public payload: {
      entityKey: string | string[];
      /**
       * Id of parent group. Can be undefined for groups on root level
       */
      menuParentGroup?: string;
    }
  ) {
    super(CONFIGURATOR_DATA, payload.entityKey, payload.menuParentGroup);
  }
}

export class SetGroupsVisited extends StateUtils.EntitySuccessAction {
  readonly type = SET_GROUPS_VISITED;
  constructor(public payload: { entityKey: string; visitedGroups: string[] }) {
    super(CONFIGURATOR_DATA, payload.entityKey, payload.visitedGroups);
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
  | ChangeGroupFinalize
  | GetConfigurationOverview
  | GetConfigurationOverviewFail
  | GetConfigurationOverviewSuccess
  | RemoveConfiguration
  | SetInteractionState
  | SetMenuParentGroup
  | SetCurrentGroup
  | SetGroupsVisited;
