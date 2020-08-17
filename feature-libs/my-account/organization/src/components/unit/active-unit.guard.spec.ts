import { Unit, RoutingService, UnitService } from "@spartacus/core";
import { of, Observable } from "rxjs";
import { ActiveUnitGuard } from "./active-unit.guard";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from "@angular/router";


const PERMISSION_NOT_ACTIVE = Object.freeze({ active: false });
const PERMISSION_ACTIVE = Object.freeze({ active: true });
const PERMISSION_INVALID = Object.freeze({});

class UnitServiceStub {
  get(): Observable<Unit> {
    return of();
  }
}

const mockRoutingService = { go: () => {} };

fdescribe('ActiveUnitGuard', () => {
  let activeUnitGuard: ActiveUnitGuard;
  let routingService: RoutingService;
  let unitService: UnitService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: UnitService,
          useClass: UnitServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'unitCode' } } }
        },
      ],
      imports: [RouterTestingModule],
    });

    activeUnitGuard = TestBed.inject(ActiveUnitGuard);
    routingService = TestBed.inject(RoutingService);
    unitService = TestBed.inject(UnitService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
    });

    describe('when unit is loaded', () => {
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(unitService, 'get').and.returnValue(
            of(PERMISSION_NOT_ACTIVE)
          );
        });

        it('then router should redirect to units page', () => {
          activeUnitGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'orgUnits',
          });
        });

      });
    });

    describe('when unit is loaded', () => {
      describe('and is active', () => {
        beforeEach(() => {
          spyOn(unitService, 'get').and.returnValue(
            of(PERMISSION_ACTIVE)
          );
        });

        it('then router should not redirect', () => {
          activeUnitGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(routingService.go).not.toHaveBeenCalled()
        });

        it('then returned observable should emit true', () => {
          let emittedValue;

          activeUnitGuard
            .canActivate(route.snapshot)
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();

          expect(emittedValue).toBe(true);
        });

      });
    });

    describe('when unit is not loaded', () => {
      beforeEach(() => {
        spyOn(unitService, 'get').and.returnValue(
          of(PERMISSION_INVALID)
        );
      });

      it('then router should redirect to units page', () => {
        activeUnitGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'orgUnits',
        });
      });

      it('then returned observable should emit false', () => {
        let emittedValue;

        activeUnitGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(false);
      });
    });

  });
});
