import { Permission, RoutingService, PermissionService } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { ActivePermissionGuard } from './active-permission.guard';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

const PERMISSION_NOT_ACTIVE = Object.freeze({ active: false });
const PERMISSION_ACTIVE = Object.freeze({ active: true });
const PERMISSION_INVALID = Object.freeze({});

class PermissionServiceStub {
  get(): Observable<Permission> {
    return of();
  }
}

const mockRoutingService = { go: () => {} };

fdescribe('ActivePermissionGuard', () => {
  let activePermissionGuard: ActivePermissionGuard;
  let routingService: RoutingService;
  let permissionService: PermissionService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: mockRoutingService,
        },
        {
          provide: PermissionService,
          useClass: PermissionServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { code: 'permissionCode' } } },
        },
      ],
      imports: [RouterTestingModule],
    });

    activePermissionGuard = TestBed.inject(ActivePermissionGuard);
    routingService = TestBed.inject(RoutingService);
    permissionService = TestBed.inject(PermissionService);
    route = TestBed.inject(ActivatedRoute);
  });

  describe('canActivate:', () => {
    beforeEach(() => {
      spyOn(routingService, 'go');
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

          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'permission',
          });
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

          expect(routingService.go).not.toHaveBeenCalled();
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

    describe('when permission is not loaded', () => {
      beforeEach(() => {
        spyOn(permissionService, 'get').and.returnValue(of(PERMISSION_INVALID));
      });

      it('then router should redirect to permissions page', () => {
        activePermissionGuard
          .canActivate(route.snapshot)
          .subscribe()
          .unsubscribe();

        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'permission',
        });
      });

      it('then returned observable should emit false', () => {
        let emittedValue;

        activePermissionGuard
          .canActivate(route.snapshot)
          .subscribe((result) => (emittedValue = result))
          .unsubscribe();

        expect(emittedValue).toBe(false);
      });
    });
  });
});
