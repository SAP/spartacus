import { Budget, RoutingService, BudgetService } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { ActiveBudgetGuard } from './active-budget.guard';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

const BUDGET_NOT_ACTIVE = Object.freeze({ active: false });
const BUDGET_ACTIVE = Object.freeze({ active: true });
const BUDGET_INVALID = Object.freeze({});

class BudgetServiceStub {
  get(): Observable<Budget> {
    return of();
  }
}

const mockRoutingService = { go: () => {} };

describe('ActiveBudgetGuard', () => {
  let activeBudgetGuard: ActiveBudgetGuard;
  let routingService: RoutingService;
  let budgetService: BudgetService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: BudgetService,
          useClass: BudgetServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'budgetCode' } } },
        },
      ],
      imports: [RouterTestingModule],
    });

    activeBudgetGuard = TestBed.inject(ActiveBudgetGuard);
    routingService = TestBed.inject(RoutingService);
    budgetService = TestBed.inject(BudgetService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when budget is loaded', () => {
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(budgetService, 'get').and.returnValue(of(BUDGET_NOT_ACTIVE));
        });

        it('then router should redirect to budgets page', () => {
          activeBudgetGuard
            .canActivate(route.snapshot)
            .subscribe()
            .unsubscribe();

          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'budget',
          });
        });
      });
    });

    describe('when budget is loaded', () => {
      describe('and is active', () => {
        beforeEach(() => {
          spyOn(budgetService, 'get').and.returnValue(of(BUDGET_ACTIVE));
        });

        it('then router should not redirect', () => {
          activeBudgetGuard
            .canActivate(route.snapshot)
            .subscribe()
            .unsubscribe();

          expect(routingService.go).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue;

          activeBudgetGuard
            .canActivate(route.snapshot)
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();

          expect(emittedValue).toBe(true);
        });
      });
    });

    describe('when budget is not loaded', () => {
      beforeEach(() => {
        spyOn(budgetService, 'get').and.returnValue(of(BUDGET_INVALID));
      });

      it('then router should redirect to budgets page', () => {
        activeBudgetGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'budget',
        });
      });

      it('then returned observable should emit false', () => {
        let emittedValue;

        activeBudgetGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(false);
      });
    });
  });
});
