import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  CostCenter,
  UserCostCenterAdapter,
  UserCostCenterConnector,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { UserActions } from '../actions/index';
import { UserCostCenterEffects } from './user-cost-center.effect';
import { EntitiesModel } from '../../../model/misc.model';

const mockCostCenters: EntitiesModel<CostCenter> = {
  values: [
    {
      code: 'test',
      name: 'test name',
    },
  ],
};

describe('Payment Types effect', () => {
  let service: UserCostCenterConnector;
  let effect: UserCostCenterEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserCostCenterEffects,
        { provide: UserCostCenterAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.inject(
      UserCostCenterEffects as Type<UserCostCenterEffects>
    );
    service = TestBed.inject(
      UserCostCenterConnector as Type<UserCostCenterConnector>
    );

    spyOn(service, 'getActiveList').and.returnValue(of(mockCostCenters));
  });

  describe('loadActiveCostCenters$', () => {
    it('should load the cost centers of user', () => {
      const action = new UserActions.LoadActiveCostCenters('user');
      const completion = new UserActions.LoadActiveCostCentersSuccess(
        mockCostCenters.values
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadActiveCostCenters$).toBeObservable(expected);
    });
  });
});
