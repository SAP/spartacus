export enum INPUT_TYPE {
  TEXT = 'text',
  DATE_TIME = 'datetime',
  DATE = 'date',
  NG_SELECT = 'ngSelect',
  CHECKBOX = 'checkbox',
}
export const DEFAULT_SORT_LABEL = 'name';
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
}

export interface TestListOptions {
  trigger?: Function;
  nested?: {
    expandAll?: boolean;
    collapseAll?: boolean;
  };
}
