import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import createSpy = jasmine.createSpy;

import { defaultOccOrganizationConfig } from '../../../occ/adapters/organization/default-occ-organization-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { OrgUnitUserGroupActions } from '../actions/index';
import * as fromEffects from './user-group.effect';
import { B2BSearchConfig } from '../../model/search-config';
import { OrgUnitUserGroup, OrgUnitUserGroupConnector } from '@spartacus/core';

const error = 'error';
const orgUnitUserGroupUid = 'testUid';
const userId = 'testUser';
const orgUnitUserGroup: OrgUnitUserGroup = {
  uid: orgUnitUserGroupUid,
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'uid' }];

class MockOrgUnitUserGroupConnector
  implements Partial<OrgUnitUserGroupConnector> {
  get = createSpy().and.returnValue(of(orgUnitUserGroup));
  getList = createSpy().and.returnValue(
    of({ values: [orgUnitUserGroup], pagination, sorts })
  );
  create = createSpy().and.returnValue(of(orgUnitUserGroup));
  update = createSpy().and.returnValue(of(orgUnitUserGroup));
  delete = createSpy().and.returnValue(of(orgUnitUserGroup));
}

describe('OrgUnitUserGroup Effects', () => {
  let actions$: Observable<OrgUnitUserGroupActions.OrgUnitUserGroupAction>;
  let orgUnitUserGroupConnector: OrgUnitUserGroupConnector;
  let effects: fromEffects.OrgUnitUserGroupEffects;
  let expected: TestColdObservable;

  const mockOrgUnitUserGroupState = {
    details: {
      entities: {
        testLoadedUid: { loading: false, value: orgUnitUserGroup },
        testLoadingUid: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          orgUnitUserGroup: () => mockOrgUnitUserGroupState,
        }),
      ],
      providers: [
        {
          provide: OrgUnitUserGroupConnector,
          useClass: MockOrgUnitUserGroupConnector,
        },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.OrgUnitUserGroupEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(
      fromEffects.OrgUnitUserGroupEffects as Type<
        fromEffects.OrgUnitUserGroupEffects
      >
    );
    orgUnitUserGroupConnector = TestBed.inject(
      OrgUnitUserGroupConnector as Type<OrgUnitUserGroupConnector>
    );
    expected = null;
  });

  describe('loadOrgUnitUserGroup$', () => {
    it('should return LoadOrgUnitUserGroupSuccess action', () => {
      const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess(
        [orgUnitUserGroup]
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.get).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return LoadOrgUnitUserGroupFail action if orgUnitUserGroup not updated', () => {
      orgUnitUserGroupConnector.get = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.get).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });

  describe('loadOrgUnitUserGroups$', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('should return LoadOrgUnitUserGroupSuccess action', () => {
      const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({
        userId,
        params,
      });
      const completion = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess(
        [orgUnitUserGroup]
      );
      const completion2 = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsSuccess(
        {
          page: { ids: [orgUnitUserGroupUid], pagination, sorts },
          params,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadOrgUnitUserGroups$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });

    it('should return LoadOrgUnitUserGroupsFail action if orgUnitUserGroups not loaded', () => {
      orgUnitUserGroupConnector.getList = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({
        userId,
        params,
      });
      const completion = new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsFail({
        error,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnitUserGroups$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });
  });

  describe('createOrgUnitUserGroup$', () => {
    it('should return CreateOrgUnitUserGroupSuccess action', () => {
      const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroup({
        userId,
        orgUnitUserGroup,
      });
      const completion = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.create).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroup
      );
    });

    it('should return CreateOrgUnitUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.create = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new OrgUnitUserGroupActions.CreateOrgUnitUserGroup({
        userId,
        orgUnitUserGroup,
      });
      const completion = new OrgUnitUserGroupActions.CreateOrgUnitUserGroupFail(
        {
          orgUnitUserGroupUid,
          error,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.create).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroup
      );
    });
  });

  describe('updateOrgUnitUserGroup$', () => {
    it('should return UpdateOrgUnitUserGroupSuccess action', () => {
      const action = new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup,
      });
      const completion = new OrgUnitUserGroupActions.UpdateOrgUnitUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup
      );
    });

    it('should return UpdateOrgUnitUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.update = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup,
      });
      const completion = new OrgUnitUserGroupActions.UpdateOrgUnitUserGroupFail(
        {
          orgUnitUserGroupUid,
          error,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup
      );
    });
  });

  describe('deleteOrgUnitUserGroup$', () => {
    it('should return DeleteOrgUnitUserGroupSuccess action', () => {
      const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.deleteOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return DeleteOrgUnitUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.delete = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupFail(
        {
          orgUnitUserGroupUid,
          error,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.deleteOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });
});
