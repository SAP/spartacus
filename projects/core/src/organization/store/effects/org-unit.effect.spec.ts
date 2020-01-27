import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import createSpy = jasmine.createSpy;

import { B2BUnitNode } from '../../../model/org-unit.model';
import { defaultOccOrganizationConfig } from '../../../occ/adapters/organization/default-occ-organization-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { OrgUnitConnector } from '../../connectors/org-unit/org-unit.connector';
import { OrgUnitActions } from '../actions/index';
import * as fromEffects from './org-unit.effect';

const error = 'error';
const orgUnitId = 'orgUnit1ID';
const userId = 'testUser';
const orgUnit: B2BUnitNode = {
  active: true,
  children: [],
  id: orgUnitId,
  name: 'orgUnit1 name',
  parent: 'orgUnit1 parent',
};

class MockOrgUnitConnector {
  get = createSpy().and.returnValue(of(orgUnit));
  getList = createSpy().and.returnValue(of({ values: [orgUnit] }));
  create = createSpy().and.returnValue(of(orgUnit));
  update = createSpy().and.returnValue(of(orgUnit));
}

describe('OrgUnit Effects', () => {
  let actions$: Observable<OrgUnitActions.OrgUnitAction>;
  let orgUnitConnector: OrgUnitConnector;
  let effects: fromEffects.OrgUnitEffects;
  let expected: TestColdObservable;

  const mockOrgUnitState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: orgUnit },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ orgUnit: () => mockOrgUnitState }),
      ],
      providers: [
        { provide: OrgUnitConnector, useClass: MockOrgUnitConnector },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.OrgUnitEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(fromEffects.OrgUnitEffects as Type<
      fromEffects.OrgUnitEffects
    >);
    orgUnitConnector = TestBed.get(OrgUnitConnector as Type<OrgUnitConnector>);
    expected = null;
  });

  describe('loadOrgUnit$', () => {
    it('should return LoadOrgUnitSuccess action', () => {
      const action = new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId });
      const completion = new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnit$).toBeObservable(expected);
      expect(orgUnitConnector.get).toHaveBeenCalledWith(userId, orgUnitId);
    });

    it('should return LoadOrgUnitFail action if orgUnit not updated', () => {
      orgUnitConnector.get = createSpy().and.returnValue(throwError(error));
      const action = new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId });
      const completion = new OrgUnitActions.LoadOrgUnitFail(orgUnitId, error);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnit$).toBeObservable(expected);
      expect(orgUnitConnector.get).toHaveBeenCalledWith(userId, orgUnitId);
    });
  });

  describe('loadOrgUnits$', () => {
    it('should return LoadOrgUnitSuccess action', () => {
      const action = new OrgUnitActions.LoadOrgUnits({ userId });
      const completion = new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]);
      const completion2 = new OrgUnitActions.LoadOrgUnitsSuccess({
        orgUnitPage: { ids: [orgUnitId] },
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadOrgUnits$).toBeObservable(expected);
      expect(orgUnitConnector.getList).toHaveBeenCalledWith(userId);
    });

    it('should return LoadOrgUnitsFail action if orgUnits not loaded', () => {
      orgUnitConnector.getList = createSpy().and.returnValue(throwError(error));
      const action = new OrgUnitActions.LoadOrgUnits({ userId });
      const completion = new OrgUnitActions.LoadOrgUnitsFail({ error });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnits$).toBeObservable(expected);
      expect(orgUnitConnector.getList).toHaveBeenCalledWith(userId);
    });
  });
});
