import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { EntitiesModel } from '../../model/misc.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { OrgUnitUserGroupActions } from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { B2BSearchConfig } from '../model/search-config';
import {
  AuthService,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  OrgUnitUserGroup,
  OrgUnitUserGroupService,
} from '@spartacus/core';

const userId = 'current';
const orgUnitUserGroupUid = 'testOrgUnitUserGroup';
const orgUnitUserGroup = {
  uid: orgUnitUserGroupUid,
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const orgUnitUserGroup2 = {
  uid: 'testOrgUnitUserGroup2',
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'byName' }];
const orgUnitUserGroupList: EntitiesModel<OrgUnitUserGroup> = {
  values: [orgUnitUserGroup, orgUnitUserGroup2],
  pagination,
  sorts,
};

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

describe('OrgUnitUserGroupService', () => {
  let service: OrgUnitUserGroupService;
  let authService: AuthService;
  let store: Store<StateWithOrganization>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        OrgUnitUserGroupService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.inject(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.inject(
      OrgUnitUserGroupService as Type<OrgUnitUserGroupService>
    );
    authService = TestBed.inject(AuthService as Type<AuthService>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should OrgUnitUserGroupService is injected', inject(
    [OrgUnitUserGroupService],
    (orgUnitUserGroupService: OrgUnitUserGroupService) => {
      expect(orgUnitUserGroupService).toBeTruthy();
    }
  ));

  describe('get orgUnitUserGroup', () => {
    it('get() should trigger load orgUnitUserGroup details when they are not present in the store', () => {
      let orgUnitUserGroupDetails: OrgUnitUserGroup;
      service
        .get(orgUnitUserGroupUid)
        .subscribe(data => {
          orgUnitUserGroupDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(orgUnitUserGroupDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      );
    });

    it('get() should be able to get orgUnitUserGroup details when they are present in the store', () => {
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess([
          orgUnitUserGroup,
          orgUnitUserGroup2,
        ])
      );
      let orgUnitUserGroupDetails: OrgUnitUserGroup;
      service
        .get(orgUnitUserGroupUid)
        .subscribe(data => {
          orgUnitUserGroupDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(orgUnitUserGroupDetails).toEqual(orgUnitUserGroup);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      );
    });
  });

  describe('get orgUnitUserGroups', () => {
    const params: B2BSearchConfig = { sort: 'byName' };

    it('getList() should trigger load orgUnitUserGroups when they are not present in the store', () => {
      let orgUnitUserGroups: EntitiesModel<OrgUnitUserGroup>;
      service
        .getList(params)
        .subscribe(data => {
          orgUnitUserGroups = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(orgUnitUserGroups).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({ userId, params })
      );
    });

    it('getList() should be able to get orgUnitUserGroups when they are present in the store', () => {
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess([
          orgUnitUserGroup,
          orgUnitUserGroup2,
        ])
      );
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsSuccess({
          params,
          page: {
            ids: [orgUnitUserGroup.uid, orgUnitUserGroup2.uid],
            pagination,
            sorts,
          },
        })
      );
      let orgUnitUserGroups: EntitiesModel<OrgUnitUserGroup>;
      service
        .getList(params)
        .subscribe(data => {
          orgUnitUserGroups = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(orgUnitUserGroups).toEqual(orgUnitUserGroupList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({ userId, params })
      );
    });
  });

  describe('create orgUnitUserGroup', () => {
    it('create() should should dispatch CreateOrgUnitUserGroup action', () => {
      service.create(orgUnitUserGroup);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroup({
          userId,
          orgUnitUserGroup,
        })
      );
    });
  });

  describe('update orgUnitUserGroup', () => {
    it('update() should should dispatch UpdateOrgUnitUserGroup action', () => {
      service.update(orgUnitUserGroupUid, orgUnitUserGroup);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
          orgUnitUserGroup,
        })
      );
    });
  });

  describe('delete orgUnitUserGroup', () => {
    it('delete() should should dispatch UpdateOrgUnitUserGroup action', () => {
      service.delete(orgUnitUserGroupUid);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      );
    });
  });
});
