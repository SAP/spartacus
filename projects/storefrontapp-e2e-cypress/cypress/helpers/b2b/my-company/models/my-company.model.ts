export enum INPUT_TYPE {
  TEXT = 'text',
  DATE_TIME = 'datetime',
  DATE = 'date',
  NG_SELECT = 'ngSelect',
  CHECKBOX = 'checkbox',
}
export const DEFAULT_SORT_LABEL = 'Name';
export const MAX_PAGES = 2;
export const ENTITY_UID_COOKIE_KEY = 'spartacus-entity-uid';

export enum ASSIGNMENT_LABELS {
  MANAGE = 'Manage',
  ASSIGN = 'assign',
  UNASSIGN = 'unassign',
  UNASSIGN_ALL = 'Unassign All',
  DONE = 'done',
  ASSIGNED_SUCCESS = ' assigned successfully',
  UNASSIGNED_SUCCESS = ' unassigned successfully',
  CREATE = 'Create',
  EDIT = 'Edit',
  UPDATE_SUCCESS = ' updated successfully',
  ROLES = 'Roles',
  ROLE_UPDATED_SUCCESS = 'Roles successfully updated for ',
}

export interface TestListOptions {
  trigger?: Function;
  nested?: {
    expandAll?: boolean;
    collapseAll?: boolean;
  };
}

export enum MY_COMPANY_FEATURE {
  LIST = 'list',
  NESTED_LIST = 'nestedList',
  CREATE = 'create',
  UPDATE = 'update',
  DISABLE = 'disable',
  ASSIGNMENTS = 'assignments',
  USER_PASSWORD = 'userPassword',
}

export enum CONFIRMATION_LABELS {
  CONFIRM = 'CONFIRM',
  CANCEL = 'CANCEL',
  DISABLE = 'DISABLE',
}
