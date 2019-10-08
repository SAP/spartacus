import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { PageType } from '../../../model/cms.model';
import { Budget } from '../../../model/budget.model';
import { defaultOccProductConfig } from '../../../occ/adapters/product/default-occ-product-config';
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
const budget: Budget = {
  code: 'testCode',
};

class MockProductConnector {
  get = createSpy().and.returnValue(of(budget));
}

describe('Budget Effects', () => {
  let actions$: Observable<BudgetActions.BudgetAction>;
  let effects: fromEffects.BudgetEffects;

  const mockProductState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: product },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ product: () => mockProductState }),
      ],
      providers: [
        { provide: BudgetConnector, useClass: MockProductConnector },
        { provide: OccConfig, useValue: defaultOccProductConfig },
        fromEffects.BudgetEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    effects = TestBed.get(fromEffects.BudgetEffects as Type<
      fromEffects.BudgetEffects
    >);
  });

  describe('loadProduct$', () => {
    it('should return loadProductStart action if product not loaded', () => {
      const action = new BudgetActions.LoadBudget(budgetCode);
      const completion = new BudgetActions.LoadBudgetSuccess(budget);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.$loadBudget).toBeObservable(expected);
    });
  });
});
