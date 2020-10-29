export enum INPUT_TYPE {
  TEXT = 'text',
  DATE_TIME = 'datetime',
  NG_SELECT = 'ngSelect',
}
export const DEFAULT_SORT_LABEL = 'name';
export const MAX_PAGES = 2;

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
  nested?: {
    expandAll?: boolean;
    collapseAll?: boolean;
  };
}
