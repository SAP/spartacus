import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { UserGroup } from '../../../model/index';
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
      let result: EntityLoaderState<UserGroup>;
      store
        .pipe(select(UserGroupSelectors.getUserGroupsState))
        .subscribe(value => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([userGroup, userGroup2])
      );
      expect(result).toEqual({ entities });
    });
  });

  describe('getUserGroup', () => {
    it('should return userGroup by id', () => {
      let result: LoaderState<UserGroup>;
      store
        .pipe(select(UserGroupSelectors.getUserGroupState(uid)))
        .subscribe(value => (result = value));

      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([userGroup, userGroup2])
      );
      expect(result).toEqual(entities.testUid);
    });
  });
});
