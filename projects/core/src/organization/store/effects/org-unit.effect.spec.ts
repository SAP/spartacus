import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import createSpy = jasmine.createSpy;

import { B2BUnit, B2BUnitNode } from '../../../model/org-unit.model';
import { defaultOccOrganizationConfig } from '../../../occ/adapters/organization/default-occ-organization-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { OrgUnitConnector } from '../../connectors/org-unit/org-unit.connector';
import { OrgUnitActions } from '../actions/index';
import * as fromEffects from './org-unit.effect';

const error = 'error';
const userId = 'testUser';

const orgUnitId = 'testOrgUnitId';
const orgUnit: Partial<B2BUnit> = { uid: orgUnitId };

const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };

const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

class MockOrgUnitConnector {
  get = createSpy().and.returnValue(of(orgUnit));
  getList = createSpy().and.returnValue(of(orgUnitList));
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

    effects = TestBed.get(
      fromEffects.OrgUnitEffects as Type<fromEffects.OrgUnitEffects>
    );
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
      const completion = new OrgUnitActions.LoadOrgUnitFail({
        orgUnitId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnit$).toBeObservable(expected);
      expect(orgUnitConnector.get).toHaveBeenCalledWith(userId, orgUnitId);
    });
  });

  describe('loadOrgUnits$', () => {
    it('should return LoadOrgUnitNodesSuccess action', () => {
      const action = new OrgUnitActions.LoadOrgUnitNodes({ userId });
      const completion = new OrgUnitActions.LoadOrgUnitNodesSuccess(
        orgUnitList
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrgUnits$).toBeObservable(expected);
      expect(orgUnitConnector.getList).toHaveBeenCalledWith(userId);
    });

    it('should return LoadOrgUnitNodesFail action if orgUnits not loaded', () => {
      orgUnitConnector.getList = createSpy().and.returnValue(throwError(error));
      const action = new OrgUnitActions.LoadOrgUnitNodes({ userId });
      const completion = new OrgUnitActions.LoadOrgUnitNodesFail({ error });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrgUnits$).toBeObservable(expected);
      expect(orgUnitConnector.getList).toHaveBeenCalledWith(userId);
    });
  });
});
