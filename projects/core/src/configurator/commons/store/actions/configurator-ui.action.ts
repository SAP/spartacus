import { StateUtils } from '../../../../state/utils';
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

export class SetUiState implements StateUtils.EntityAction {
  readonly type = SET_UI_STATE;
  readonly meta: StateUtils.EntityMeta;
  constructor(entityKey: string | string[], public payload: any) {
    this.meta = StateUtils.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetCurrentGroup implements StateUtils.EntityAction {
  readonly type = SET_CURRENT_GROUP;
  readonly meta: StateUtils.EntityMeta;
  constructor(entityKey: string | string[], public payload: any) {
    this.meta = StateUtils.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetMenuParentGroup implements StateUtils.EntityAction {
  readonly type = SET_MENU_PARENT_GROUP;
  readonly meta: StateUtils.EntityMeta;
  constructor(entityKey: string | string[], public payload: any) {
    this.meta = StateUtils.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class CreateUiState implements StateUtils.EntityAction {
  readonly type = CREATE_UI_STATE;
  readonly meta: StateUtils.EntityMeta;
  constructor(entityKey: string | string[]) {
    this.meta = StateUtils.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class RemoveUiState extends StateUtils.EntityRemoveAction {
  readonly type = REMOVE_UI_STATE;
  constructor(entityKey: string | string[]) {
    super(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetGroupsVisited implements StateUtils.EntityAction {
  readonly type = SET_GROUPS_VISITED;
  readonly meta: StateUtils.EntityMeta;
  constructor(entityKey: string, public payload: string[]) {
    this.meta = StateUtils.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetGroupsCompleted implements StateUtils.EntityAction {
  readonly type = SET_GROUPS_COMPLETED;
  readonly meta: StateUtils.EntityMeta;
  constructor(entityKey: string, public completedGroups: string[]) {
    this.meta = StateUtils.entityMeta(CONFIGURATION_UI_DATA, entityKey);
  }
}

export class SetGroupsError implements StateUtils.EntityAction {
  readonly type = SET_GROUPS_ERROR;
  readonly meta: StateUtils.EntityMeta;
  constructor(entityKey: string, public errorGroups: string[]) {
    this.meta = StateUtils.entityMeta(CONFIGURATION_UI_DATA, entityKey);
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
