import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, GlobalMessageService, GlobalMessageType, SemanticPathService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ActiveUnitGuard } from './active-unit.guard';
import createSpy = jasmine.createSpy;

const UNIT_NOT_ACTIVE = Object.freeze({ active: false });
const UNIT_ACTIVE = Object.freeze({ active: true });

class UnitServiceStub {
  get(): Observable<B2BUnit> {
    return of();
  }
}

class SemanticPathServiceStub {
  get(): string {
    return 'units';
  }
  transform(): string[] {
    return ['organization', 'units'];
  }
}

const mockRouter = { parseUrl: () => {} };

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

describe('ActiveUnitGuard', () => {
  let activeUnitGuard: ActiveUnitGuard;
  let router: Router;
  let unitService: OrgUnitService;
  let route: ActivatedRoute;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: OrgUnitService,
          useClass: UnitServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'unitUid' } } },
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
      imports: [RouterTestingModule],
    });

    activeUnitGuard = TestBed.inject(ActiveUnitGuard);
    router = TestBed.inject(Router);
    unitService = TestBed.inject(OrgUnitService);
    route = TestBed.inject(ActivatedRoute);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when unit is loaded', () => {
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(unitService, 'get').and.returnValue(of(UNIT_NOT_ACTIVE));
        });

        it('then router should redirect to units page', () => {
          activeUnitGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(router.parseUrl).toHaveBeenCalledWith('organization/units');
          expect(globalMessageService.add).toHaveBeenCalledWith(
            {
              key: 'organization.notification.disabled',
              params: { item: 'Unit' },
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        });
      });
    });

    describe('when unit is loaded', () => {
      describe('and is active', () => {
        beforeEach(() => {
          spyOn(unitService, 'get').and.returnValue(of(UNIT_ACTIVE));
        });

        it('then router should not redirect', () => {
          activeUnitGuard.canActivate(route.snapshot).subscribe().unsubscribe();

          expect(router.parseUrl).not.toHaveBeenCalled();
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
  });
});
