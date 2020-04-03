import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { OrgUnitUserGroup } from '../../../model/index';
import { UserGroupActions } from '../actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  UserGroupManagement,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import {
  EntityLoaderState,
  LoaderState,
  UserGroupSelectors,
} from '@spartacus/core';

describe('OrgUnitUserGroup Selectors', () => {
  let store: Store<StateWithOrganization>;

  const uid = 'testUid';
  const orgUnitUserGroup: OrgUnitUserGroup = {
    uid,
    name: 'testOrgUnitUserGroup',
  };
  const orgUnitUserGroup2: OrgUnitUserGroup = {
    uid: 'testUid2',
    name: 'testOrgUnitUserGroup2',
  };

  const entities = {
    testUid: {
      loading: false,
      error: false,
      success: true,
      value: orgUnitUserGroup,
    },
    testUid2: {
      loading: false,
      error: false,
      success: true,
      value: orgUnitUserGroup2,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store as Type<Store<StateWithOrganization>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getUserGroupManagementState ', () => {
    it('should return UserGroups state', () => {
      let result: UserGroupManagement;
      store
        .pipe(select(UserGroupSelectors.getUserGroupManagementState))
        .subscribe(value => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([
          orgUnitUserGroup,
          orgUnitUserGroup2,
        ])
      );
      expect(result).toEqual({
        entities: { entities },
        list: { entities: {} },
        permissions: { entities: {} },
        customers: { entities: {} },
      });
    });
  });

  describe('getUserGroups', () => {
    it('should return UserGroups', () => {
      let result: EntityLoaderState<OrgUnitUserGroup>;
      store
        .pipe(select(UserGroupSelectors.getUserGroupsState))
        .subscribe(value => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([
          orgUnitUserGroup,
          orgUnitUserGroup2,
        ])
      );
      expect(result).toEqual({ entities });
    });
  });

  describe('getUserGroup', () => {
    it('should return orgUnitUserGroup by id', () => {
      let result: LoaderState<OrgUnitUserGroup>;
      store
        .pipe(select(UserGroupSelectors.getUserGroupState(uid)))
        .subscribe(value => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([
          orgUnitUserGroup,
          orgUnitUserGroup2,
        ])
      );
      expect(result).toEqual(entities.testUid);
    });
  });
});
