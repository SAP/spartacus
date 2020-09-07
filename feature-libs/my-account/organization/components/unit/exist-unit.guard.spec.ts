import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, SemanticPathService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ExistUnitGuard } from './exist-unit.guard';

const UNIT_VALID = Object.freeze({ uid: 'unitUid' });
const UNIT_INVALID = Object.freeze({});

class OrgUnitServiceStub {
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

describe('ExistUnitGuard', () => {
  let existUnitGuard: ExistUnitGuard;
  let router: Router;
  let unitService: OrgUnitService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OrgUnitService,
          useClass: OrgUnitServiceStub,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },

        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'unitUid' } } },
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    existUnitGuard = TestBed.inject(ExistUnitGuard);
    router = TestBed.inject(Router);
    unitService = TestBed.inject(OrgUnitService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when unit is loaded', () => {
      beforeEach(() => {
        spyOn(unitService, 'get').and.returnValue(of(UNIT_VALID));
      });

      it('then router should not redirect', () => {
        existUnitGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(router.parseUrl).not.toHaveBeenCalled();
      });

      it('then returned observable should emit true', () => {
        let emittedValue;

        existUnitGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(true);
      });
    });

    describe('when unit is not loaded', () => {
      beforeEach(() => {
        spyOn(unitService, 'get').and.returnValue(of(UNIT_INVALID));
      });

      it('then router should redirect to unit list page', () => {
        existUnitGuard.canActivate(route.snapshot).subscribe().unsubscribe();

        expect(router.parseUrl).toHaveBeenCalledWith('units');
      });
    });
  });
});
