import { StateEntityActions } from '../../../../state/utils/index';
import { CONFIGURATION_UI_DATA } from '../configuration-state';

export const SET_UI_STATE = '[Configurator] Set UI State';
export const CREATE_UI_STATE = '[Configurator] Create UI State';
export const REMOVE_UI_STATE = '[Configurator] Remove UI State';

export const SET_CURRENT_GROUP = '[Configurator] Set current group to UI State';
export const SET_MENU_PARENT_GROUP =
  '[Configurator] Set current parent group for menu to UI State';

export const SET_GROUPS_VISITED = '[Configurator] Set groups to visited';
export const SET_GROUPS_COMPLETED = '[Configurator] Set groups complete status';
export const SET_GROUPS_ERROR = '[Configurator] Set groups error status';

export class SetUiState implements StateEntityActions.EntityAction {
  readonly type = SET_UI_STATE;
  readonly meta: StateEntityActions.EntityMeta;
  constructor(entityKey: string | string[], public payload: any) {
    this.meta = StateEntityActions.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetCurrentGroup implements StateEntityActions.EntityAction {
  readonly type = SET_CURRENT_GROUP;
  readonly meta: StateEntityActions.EntityMeta;
  constructor(entityKey: string | string[], public payload: any) {
    this.meta = StateEntityActions.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetMenuParentGroup implements StateEntityActions.EntityAction {
  readonly type = SET_MENU_PARENT_GROUP;
  readonly meta: StateEntityActions.EntityMeta;
  constructor(entityKey: string | string[], public payload: any) {
    this.meta = StateEntityActions.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class CreateUiState implements StateEntityActions.EntityAction {
  readonly type = CREATE_UI_STATE;
  readonly meta: StateEntityActions.EntityMeta;
  constructor(entityKey: string | string[]) {
    this.meta = StateEntityActions.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class RemoveUiState extends StateEntityActions.EntityRemoveAction {
  readonly type = REMOVE_UI_STATE;
  constructor(entityKey: string | string[]) {
    super(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetGroupsVisited implements StateEntityActions.EntityAction {
  readonly type = SET_GROUPS_VISITED;
  readonly meta: StateEntityActions.EntityMeta;
  constructor(entityKey: string, public payload: string[]) {
    this.meta = StateEntityActions.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetGroupsCompleted implements StateEntityActions.EntityAction {
  readonly type = SET_GROUPS_COMPLETED;
  readonly meta: StateEntityActions.EntityMeta;
  constructor(entityKey: string, public completedGroups: string[]) {
    this.meta = StateEntityActions.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetGroupsError implements StateEntityActions.EntityAction {
  readonly type = SET_GROUPS_ERROR;
  readonly meta: StateEntityActions.EntityMeta;
  constructor(entityKey: string, public errorGroups: string[]) {
    this.meta = StateEntityActions.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

// action types
export type ConfiguratorUiAction =
  | SetUiState
  | SetMenuParentGroup
  | RemoveUiState
  | CreateUiState
  | SetCurrentGroup
  | SetGroupsVisited
  | SetGroupsCompleted
  | SetGroupsError;
