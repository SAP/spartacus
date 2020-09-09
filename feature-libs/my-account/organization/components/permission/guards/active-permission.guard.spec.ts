import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  Permission,
  SemanticPathService,
} from '@spartacus/core';
import { PermissionService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ActivePermissionGuard } from './active-permission.guard';
import createSpy = jasmine.createSpy;

const PERMISSION_NOT_ACTIVE = Object.freeze({ active: false });
const PERMISSION_ACTIVE = Object.freeze({ active: true });

class PermissionServiceStub {
  get(): Observable<Permission> {
    return of();
  }
}

class SemanticPathServiceStub {
  get(): string {
    return 'purchase-limits';
  }
  transform(): string[] {
    return ['organization', 'purchase-limits'];
  }
}

const mockRouter = { parseUrl: () => {} };

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

describe('ActivePermissionGuard', () => {
  let activePermissionGuard: ActivePermissionGuard;
  let router: Router;
  let permissionService: PermissionService;
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
          provide: PermissionService,
          useClass: PermissionServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'permissionCode' } } },
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

    activePermissionGuard = TestBed.inject(ActivePermissionGuard);
    router = TestBed.inject(Router);
    permissionService = TestBed.inject(PermissionService);
    route = TestBed.inject(ActivatedRoute);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when permission is loaded', () => {
      describe('and is not active', () => {
        beforeEach(() => {
          spyOn(permissionService, 'get').and.returnValue(
            of(PERMISSION_NOT_ACTIVE)
          );
        });

        it('then router should redirect to permissions page', () => {
          activePermissionGuard
            .canActivate(route.snapshot)
            .subscribe()
            .unsubscribe();

          expect(router.parseUrl).toHaveBeenCalledWith(
            'organization/purchase-limits'
          );
          expect(globalMessageService.add).toHaveBeenCalledWith(
            {
              key: 'organization.notification.disabled',
              params: { item: 'Purchase limit' },
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        });
      });
    });

    describe('when permission is loaded', () => {
      describe('and is active', () => {
        beforeEach(() => {
          spyOn(permissionService, 'get').and.returnValue(
            of(PERMISSION_ACTIVE)
          );
        });

        it('then router should not redirect', () => {
          activePermissionGuard
            .canActivate(route.snapshot)
            .subscribe()
            .unsubscribe();

          expect(router.parseUrl).not.toHaveBeenCalled();
        });

        it('then returned observable should emit true', () => {
          let emittedValue;

          activePermissionGuard
            .canActivate(route.snapshot)
            .subscribe((result) => (emittedValue = result))
            .unsubscribe();

          expect(emittedValue).toBe(true);
        });
      });
    });
  });
});
