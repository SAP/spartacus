import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SemanticPathService } from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ActiveBudgetGuard } from './active-budget.guard';

const BUDGET_NOT_ACTIVE = Object.freeze({ active: false });
const BUDGET_ACTIVE = Object.freeze({ active: true });

class BudgetServiceStub {
  get(): Observable<Budget> {
    return of();
  }
}

class SemanticPathServiceStub {
  get(): string {
    return 'budgets';
  }
  transform(): string[] {
    return ['organization', 'budgets'];
  }
}

const mockRouter = { parseUrl: () => {} };

describe('ActiveBudgetGuard', () => {
  let activeBudgetGuard: ActiveBudgetGuard;
  let router: Router;
  let budgetService: BudgetService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: BudgetService,
          useClass: BudgetServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'budgetCode' } } },
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    activeBudgetGuard = TestBed.inject(ActiveBudgetGuard);
    router = TestBed.inject(Router);
    budgetService = TestBed.inject(BudgetService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
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

          expect(router.parseUrl).toHaveBeenCalledWith('organization/budgets');
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

          expect(router.parseUrl).not.toHaveBeenCalled();
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
  });
});
