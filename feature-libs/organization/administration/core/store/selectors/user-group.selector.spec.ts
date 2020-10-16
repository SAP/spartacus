import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { UserGroupActions } from '../actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  UserGroupManagement,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { UserGroupSelectors } from './index';

describe('UserGroup Selectors', () => {
  let store: Store<StateWithOrganization>;

  const uid = 'testUid';
  const userGroup: UserGroup = {
    uid,
    name: 'testUserGroup',
  };
  const userGroup2: UserGroup = {
    uid: 'testUid2',
    name: 'testUserGroup2',
  };

  const entities = {
    testUid: {
      loading: false,
      error: false,
      success: true,
      value: userGroup,
    },
    testUid2: {
      loading: false,
      error: false,
      success: true,
      value: userGroup2,
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

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getUserGroupManagementState ', () => {
    it('should return UserGroups state', () => {
      let result: UserGroupManagement;
      store
        .pipe(select(UserGroupSelectors.getUserGroupManagementState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([userGroup, userGroup2])
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
      let result: StateUtils.EntityLoaderState<UserGroup>;
      store
        .pipe(select(UserGroupSelectors.getUserGroupsState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([userGroup, userGroup2])
      );
      expect(result).toEqual({ entities });
    });
  });

  describe('getUserGroup', () => {
    it('should return userGroup by id', () => {
      let result: StateUtils.LoaderState<UserGroup>;
      store
        .pipe(select(UserGroupSelectors.getUserGroup(uid)))
        .subscribe((value) => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([userGroup, userGroup2])
      );
      expect(result).toEqual(entities.testUid);
    });
  });
});
