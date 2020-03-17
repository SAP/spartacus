import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel, User } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { OrgUnitUserGroupActions } from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import { OrgUnitUserGroup } from '../../model/org-unit-user-group.model';
import { Permission } from '../../model/permission.model';
import {
  getOrgUnitUserGroupState,
  getOrgUnitUserGroupList,
  getOrgUnitUserGroupAvailableOrgCustomers,
  getOrgUnitUserGroupAvailableOrderApprovalPermissions,
} from '../store/selectors/org-unit-user-group.selector';

@Injectable()
export class OrgUnitUserGroupService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadOrgUnitUserGroup(orgUnitUserGroupUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  loadOrgUnitUserGroups(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({ userId, params })
      )
    );
  }

  private getOrgUnitUserGroupState(
    orgUnitUserGroupUid: string
  ): Observable<LoaderState<OrgUnitUserGroup>> {
    return this.store.select(getOrgUnitUserGroupState(orgUnitUserGroupUid));
  }

  private getOrgUnitUserGroupList(
    params
  ): Observable<LoaderState<EntitiesModel<OrgUnitUserGroup>>> {
    return this.store.select(getOrgUnitUserGroupList(params));
  }

  private getOrgUnitUserGroupAvailableOrgCustomersList(
    orgUnitUserGroupUid: string,
    params
  ): Observable<LoaderState<EntitiesModel<User>>> {
    return this.store.select(
      getOrgUnitUserGroupAvailableOrgCustomers(orgUnitUserGroupUid, params)
    );
  }

  private getOrgUnitUserGroupAvailableOrderApprovalPermissionsList(
    orgUnitUserGroupUid: string,
    params
  ): Observable<LoaderState<EntitiesModel<Permission>>> {
    return this.store.select(
      getOrgUnitUserGroupAvailableOrderApprovalPermissions(
        orgUnitUserGroupUid,
        params
      )
    );
  }

  get(orgUnitUserGroupUid: string): Observable<OrgUnitUserGroup> {
    return this.getOrgUnitUserGroupState(orgUnitUserGroupUid).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadOrgUnitUserGroup(orgUnitUserGroupUid);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(
    params: B2BSearchConfig
  ): Observable<EntitiesModel<OrgUnitUserGroup>> {
    return this.getOrgUnitUserGroupList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<OrgUnitUserGroup>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrgUnitUserGroups(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<OrgUnitUserGroup>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  create(orgUnitUserGroup: OrgUnitUserGroup) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroup({
          userId,
          orgUnitUserGroup,
        })
      )
    );
  }

  update(orgUnitUserGroupUid: string, orgUnitUserGroup: OrgUnitUserGroup) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
          orgUnitUserGroup,
        })
      )
    );
  }

  delete(orgUnitUserGroupUid: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      )
    );
  }

  loadOrgUnitUserGroupAvailableOrgCustomers(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers({
          userId,
          orgUnitUserGroupUid,
          params,
        })
      )
    );
  }

  loadOrgUnitUserGroupAvailableOrderApprovalPermissions(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions(
          {
            userId,
            orgUnitUserGroupUid,
            params,
          }
        )
      )
    );
  }

  getOrgUnitUserGroupAvailableOrgCustomers(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<any>> {
    return this.getOrgUnitUserGroupAvailableOrgCustomersList(
      orgUnitUserGroupUid,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<any>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrgUnitUserGroupAvailableOrgCustomers(
            orgUnitUserGroupUid,
            params
          );
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<any>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  getOrgUnitUserGroupAvailableOrderApprovalPermissions(
    orgUnitUserGroupUid: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<any>> {
    return this.getOrgUnitUserGroupAvailableOrderApprovalPermissionsList(
      orgUnitUserGroupUid,
      params
    ).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<any>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadOrgUnitUserGroupAvailableOrderApprovalPermissions(
            orgUnitUserGroupUid,
            params
          );
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<any>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  // assignMember(orgUnitUserGroupUid: string, budgetCode: string) {
  //   this.withUserId(userId =>
  //     this.store.dispatch(
  //       new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMember({
  //         userId,
  //         orgUnitUserGroupUid,
  //         budgetCode,
  //       })
  //     )
  //   );
  // }

  // unassignMember(costCenterCode: string, budgetCode: string) {
  //   this.withUserId(userId =>
  //     this.store.dispatch(
  //       new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMember({
  //         userId,
  //         costCenterCode,
  //         budgetCode,
  //       })
  //     )
  //   );
  // }

  // unassignAllMembers(costCenterCode: string, budgetCode: string) {
  //   this.withUserId(userId =>
  //     this.store.dispatch(
  //       new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembers({
  //         userId,
  //         costCenterCode,
  //         budgetCode,
  //       })
  //     )
  //   );
  // }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
