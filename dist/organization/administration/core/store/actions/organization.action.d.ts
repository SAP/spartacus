import { Action } from '@ngrx/store';
export declare const CLEAR_ORGANIZATION_DATA = "[Organization] Clear Data";
export declare class OrganizationClearData implements Action {
    readonly type = "[Organization] Clear Data";
}
export type OrganizationAction = OrganizationClearData;
