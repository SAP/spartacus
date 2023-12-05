import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrgUnitConnector } from '../../connectors/org-unit/org-unit.connector';
import { B2BUserActions, OrgUnitActions, OrganizationActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class OrgUnitEffects {
    private actions$;
    private orgUnitConnector;
    protected logger: LoggerService;
    loadOrgUnit$: Observable<OrgUnitActions.LoadOrgUnitSuccess | OrgUnitActions.LoadAddressSuccess | OrgUnitActions.LoadAddressesSuccess | OrgUnitActions.LoadOrgUnitFail>;
    loadAvailableOrgUnits$: Observable<OrgUnitActions.LoadOrgUnitNodesSuccess | OrgUnitActions.LoadOrgUnitNodesFail>;
    createUnit$: Observable<OrgUnitActions.CreateUnitFail | OrgUnitActions.CreateUnitSuccess | OrganizationActions.OrganizationClearData>;
    updateUnit$: Observable<OrgUnitActions.UpdateUnitSuccess | OrgUnitActions.UpdateUnitFail | OrganizationActions.OrganizationClearData>;
    loadTree$: Observable<OrgUnitActions.LoadTreeSuccess | OrgUnitActions.LoadTreeFail>;
    loadApprovalProcesses$: Observable<OrgUnitActions.LoadApprovalProcessesSuccess | OrgUnitActions.LoadApprovalProcessesFail>;
    loadUsers$: Observable<OrgUnitActions.LoadAssignedUsersSuccess | OrgUnitActions.LoadAssignedUsersFail | B2BUserActions.LoadB2BUserSuccess>;
    assignRoleToUser: Observable<OrgUnitActions.AssignRoleSuccess | OrgUnitActions.AssignRoleFail>;
    unassignRoleToUser$: Observable<OrgUnitActions.UnassignRoleSuccess | OrgUnitActions.UnassignRoleFail>;
    assignApprover: Observable<OrgUnitActions.AssignApproverSuccess | OrgUnitActions.AssignApproverFail | OrganizationActions.OrganizationClearData>;
    unassignApprover: Observable<OrgUnitActions.UnassignApproverSuccess | OrgUnitActions.UnassignApproverFail | OrganizationActions.OrganizationClearData>;
    createAddress$: Observable<OrgUnitActions.CreateAddressSuccess | OrgUnitActions.CreateAddressFail | OrganizationActions.OrganizationClearData>;
    updateAddress$: Observable<OrgUnitActions.UpdateAddressSuccess | OrgUnitActions.UpdateAddressFail | OrganizationActions.OrganizationClearData>;
    deleteAddress$: Observable<OrgUnitActions.DeleteAddressSuccess | OrgUnitActions.DeleteAddressFail | OrganizationActions.OrganizationClearData>;
    constructor(actions$: Actions, orgUnitConnector: OrgUnitConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<OrgUnitEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrgUnitEffects>;
}
