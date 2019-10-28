import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { PageType } from '../../../model/cms.model';
import { Budget } from '../../../model/budget.model';
import { defaultOccOrganizationConfig } from '../../../occ/adapters/organization/default-occ-organization-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { RoutingService } from '../../../routing/facade/routing.service';
import { BudgetConnector } from '../../connectors/budget/budget.connector';
import { BudgetActions } from '../actions/index';
import * as fromEffects from './budget.effect';
import createSpy = jasmine.createSpy;

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false,
  },
};
class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}
const budgetCode = 'testCode';
const userId = 'testUser';
const budget: Budget = {
  code: 'testCode',
  active: false,
  budget: 2,
  currency: {},
  endDate: 'endDate',
  startDate: 'startDate',
  name: 'testName',
  orgUnit: { uid: 'ouid', name: 'ouName' },
  costCenters: [],
};

class MockBudgetConnector {
  get = createSpy().and.returnValue(of(budget));
}

describe('Budget Effects', () => {
  let actions$: Observable<BudgetActions.BudgetAction>;
  let effects: fromEffects.BudgetEffects;

  const mockBudgetState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: budget },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ budget: () => mockBudgetState }),
      ],
      providers: [
        { provide: BudgetConnector, useClass: MockBudgetConnector },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.BudgetEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    effects = TestBed.get(fromEffects.BudgetEffects as Type<
      fromEffects.BudgetEffects
    >);
  });

  describe('loadBudget$', () => {
    it('should return loadBudget action if budget not loaded', () => {
      const action = new BudgetActions.LoadBudget({ userId, budgetCode });
      const completion = new BudgetActions.LoadBudgetSuccess([budget]);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.$loadBudget).toBeObservable(expected);
    });
  });
});
