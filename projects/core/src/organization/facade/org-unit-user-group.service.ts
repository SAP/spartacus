import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { OrgUnitUserGroupActions } from '../store/actions/index';
import { B2BSearchConfig } from '../model/search-config';
import { OrgUnitUserGroup } from '../../model';
import {
  getOrgUnitUserGroupState,
  getOrgUnitUserGroupList,
} from '../store/selectors/org-unit-user-group.selector';

@Injectable()
export class OrgUnitUserGroupService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadOrgUnitUserGroup(orgUnitUserGroupCode: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupCode,
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

  private getOrgUnitUserGroupState(orgUnitUserGroupCode: string) {
    return this.store.select(getOrgUnitUserGroupState(orgUnitUserGroupCode));
  }

  private getOrgUnitUserGroupList(
    params
  ): Observable<LoaderState<EntitiesModel<OrgUnitUserGroup>>> {
    return this.store.select(getOrgUnitUserGroupList(params));
  }

  get(orgUnitUserGroupCode: string): Observable<OrgUnitUserGroup> {
    return this.getOrgUnitUserGroupState(orgUnitUserGroupCode).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadOrgUnitUserGroup(orgUnitUserGroupCode);
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

  update(orgUnitUserGroupCode: string, orgUnitUserGroup: OrgUnitUserGroup) {
    this.withUserId(userId =>
      this.store.dispatch(
        new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
          userId,
          orgUnitUserGroupCode,
          orgUnitUserGroup,
        })
      )
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
