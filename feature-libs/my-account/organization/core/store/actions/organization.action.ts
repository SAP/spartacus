import { Action } from '@ngrx/store';

export const CLEAR_ORGANIZATION_DATA = '[Organization] Clear Data';

export class OrganizationClearData implements Action {
  readonly type = CLEAR_ORGANIZATION_DATA;
}

export type OrganizationAction = OrganizationClearData;
