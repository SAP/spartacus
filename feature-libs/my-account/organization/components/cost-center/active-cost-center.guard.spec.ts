import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, SemanticPathService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ActiveCostCenterGuard } from './active-cost-center.guard';

const COST_CENTER_NOT_ACTIVE = Object.freeze({ active: false });
const COST_CENTER_ACTIVE = Object.freeze({ active: true });

class CostCenterServiceStub {
  get(): Observable<CostCenter> {
    return of();
  }
}

class SemanticPathServiceStub {
  get(): string {
    return 'costCenters';
  }
  transform(): string[] {
    return ['organization', 'cost-centers'];
  }
}

const mockRouter = { parseUrl: () => {} };

describe('ActiveCostCenterGuard', () => {
  let activeCostCenterGuard: ActiveCostCenterGuard;
  let router: Router;
  let costCenterService: CostCenterService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: CostCenterService,
          useClass: CostCenterServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'costCenterCode' } } },
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    activeCostCenterGuard = TestBed.inject(ActiveCostCenterGuard);
    router = TestBed.inject(Router);
    costCenterService = TestBed.inject(CostCenterService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when costCenter is loaded', () => {
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(costCenterService, 'get').and.returnValue(
            of(COST_CENTER_NOT_ACTIVE)
          );
        });

        it('then router should redirect to costCenters page', () => {
          activeCostCenterGuard
            .canActivate(route.snapshot)
            .subscribe()
            .unsubscribe();

          expect(router.parseUrl).toHaveBeenCalledWith(
            'organization/cost-centers'
          );
        });
      });
    });

    describe('when costCenter is loaded', () => {
      describe('and is active', () => {
        beforeEach(() => {
          spyOn(costCenterService, 'get').and.returnValue(
            of(COST_CENTER_ACTIVE)
          );
        });

        it('then router should not redirect', () => {
          activeCostCenterGuard
            .canActivate(route.snapshot)
            .subscribe()
            .unsubscribe();

          expect(router.parseUrl).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue;

          activeCostCenterGuard
            .canActivate(route.snapshot)
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();

          expect(emittedValue).toBe(true);
        });
      });
    });
  });
});
