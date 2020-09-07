import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Permission, SemanticPathService } from '@spartacus/core';
import { PermissionService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { ExistPermissionGuard } from './exist-permission.guard';

const PERMISSION_VALID = Object.freeze({ code: 'permissionCode' });
const PERMISSION_INVALID = Object.freeze({});

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

describe('ExistPermissionGuard', () => {
  let existPermissionGuard: ExistPermissionGuard;
  let router: Router;
  let permissionService: PermissionService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PermissionService,
          useClass: PermissionServiceStub,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },

        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'permissionCode' } } },
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
      ],
      imports: [RouterTestingModule],
    });

    existPermissionGuard = TestBed.inject(ExistPermissionGuard);
    router = TestBed.inject(Router);
    permissionService = TestBed.inject(PermissionService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(router, 'parseUrl');
    });

    describe('when permission is loaded', () => {
      beforeEach(() => {
        spyOn(permissionService, 'get').and.returnValue(of(PERMISSION_VALID));
      });

      it('then router should not redirect', () => {
        existPermissionGuard
          .canActivate(route.snapshot)
          .subscribe()
          .unsubscribe();

        expect(router.parseUrl).not.toHaveBeenCalled();
      });

      it('then returned observable should emit true', () => {
        let emittedValue;

        existPermissionGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(true);
      });
    });

    describe('when permission is not loaded', () => {
      beforeEach(() => {
        spyOn(permissionService, 'get').and.returnValue(of(PERMISSION_INVALID));
      });

      it('then router should redirect to permission list page', () => {
        existPermissionGuard
          .canActivate(route.snapshot)
          .subscribe()
          .unsubscribe();

        expect(router.parseUrl).toHaveBeenCalledWith('purchase-limits');
      });
    });
  });
});
