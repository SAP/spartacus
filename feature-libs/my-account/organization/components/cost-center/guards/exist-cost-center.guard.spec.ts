import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CostCenter,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { CostCenterService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ExistCostCenterGuard } from './exist-cost-center.guard';
import createSpy = jasmine.createSpy;

const COST_CENTER_VALID = Object.freeze({ code: 'costCenterCode' });
const COST_CENTER_INVALID = Object.freeze({});

class CostCenterServiceStub {
  get(): Observable<CostCenter> {
    return of();
  }
}

class SemanticPathServiceStub {
  get(): string {
    return 'cost-centers';
  }
  transform(): string[] {
    return ['organization', 'cost-centers'];
  }
}

const mockRouter = { parseUrl: () => {} };

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

describe('ExistCostCenterGuard', () => {
  let existCostCenterGuard: ExistCostCenterGuard;
  let router: Router;
  let costCenterService: CostCenterService;
  let route: ActivatedRoute;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CostCenterService,
          useClass: CostCenterServiceStub,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },

        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'costCenterCode' } } },
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

    existCostCenterGuard = TestBed.inject(ExistCostCenterGuard);
    router = TestBed.inject(Router);
    costCenterService = TestBed.inject(CostCenterService);
    route = TestBed.inject(ActivatedRoute);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when costCenter is loaded', () => {
      beforeEach(() => {
        spyOn(costCenterService, 'get').and.returnValue(of(COST_CENTER_VALID));
      });

      it('then router should not redirect', () => {
        existCostCenterGuard
          .canActivate(route.snapshot)
          .subscribe()
          .unsubscribe();

        expect(router.parseUrl).not.toHaveBeenCalled();
      });

      it('then returned observable should emit true', () => {
        let emittedValue;

        existCostCenterGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(true);
      });
    });

    describe('when costCenter is not loaded', () => {
      beforeEach(() => {
        spyOn(costCenterService, 'get').and.returnValue(
          of(COST_CENTER_INVALID)
        );
      });

      it('then router should redirect to costCenter list page', () => {
        existCostCenterGuard
          .canActivate(route.snapshot)
          .subscribe()
          .unsubscribe();

        expect(router.parseUrl).toHaveBeenCalledWith('cost-centers');
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'organization.notification.notExist',
            params: { item: 'Cost Center' },
          },
          GlobalMessageType.MSG_TYPE_WARNING
        );
      });
    });
  });
});
