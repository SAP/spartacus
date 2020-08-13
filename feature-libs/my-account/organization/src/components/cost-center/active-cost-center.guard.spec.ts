import { CostCenter, RoutingService, CostCenterService } from "@spartacus/core";
import { of, Observable } from "rxjs";
import { ActiveCostCenterGuard } from "./active-cost-center.guard";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";


const COST_CENTER_NOT_ACTIVE = Object.freeze({ active: false });
const COST_CENTER_ACTIVE = Object.freeze({ active: true });

class CostCenterServiceStub {
  get(): Observable<CostCenter> {
    return of();
  }
}

const mockRoutingService = { go: () => {} };

describe('ActiveCostCenterGuard', () => {
  let activeCostCenterGuard: ActiveCostCenterGuard;
  let routingService: RoutingService;
  let costCenterService: CostCenterService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: CostCenterService,
          useClass: CostCenterServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'costCenterCode' } } }
        },
      ],
      imports: [RouterTestingModule],
    });

    activeCostCenterGuard = TestBed.inject(ActiveCostCenterGuard);
    routingService = TestBed.inject(RoutingService);
    costCenterService = TestBed.inject(CostCenterService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when costCenter is loaded', () => {
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(costCenterService, 'get').and.returnValue(
            of(COST_CENTER_NOT_ACTIVE)
          );
        });

        it('then Router should redirect to costCenters page', () => {
          activeCostCenterGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'costCenter',
          });
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

        it('then Router should not redirect', () => {
          activeCostCenterGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(routingService.go).not.toHaveBeenCalled()
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
