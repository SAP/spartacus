import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from '../../auth/user-auth/guards/auth.guard';
import { ProtectedRoutesGuard } from './protected-routes.guard';
import { ProtectedRoutesService } from './protected-routes.service';

class MockAuthGuard {
  canActivate = jasmine
    .createSpy('AuthGuard.canActivate')
    .and.returnValue(of('authGuard-result'));
}

class MockProtectedRoutesService {
  isUrlProtected() {}
}

describe('ProtectedRoutesGuard', () => {
  let guard: ProtectedRoutesGuard;
  let service: ProtectedRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProtectedRoutesGuard,
        {
          provide: ProtectedRoutesService,
          useClass: MockProtectedRoutesService,
        },
        {
          provide: AuthGuard,
          useClass: MockAuthGuard,
        },
      ],
    });

    guard = TestBed.inject(ProtectedRoutesGuard);
    service = TestBed.inject(ProtectedRoutesService);
  });

  describe('canActivate', () => {
    describe('when anticipated url is NOT protected', () => {
      beforeEach(() => {
        spyOn(service, 'isUrlProtected').and.returnValue(false);
      });

      it('should emit true', () => {
        let result;
        guard
          .canActivate({ url: [] } as ActivatedRouteSnapshot)
          .subscribe((res) => (result = res));
        expect(result).toBe(true);
      });
    });

    describe('when anticipated url is protected', () => {
      beforeEach(() => {
        spyOn(service, 'isUrlProtected').and.returnValue(true);
      });

      it('should emit result of AuthGuard.canActivate', () => {
        let result;
        guard
          .canActivate({ url: [] } as ActivatedRouteSnapshot)
          .subscribe((res) => (result = res))
          .unsubscribe();
        expect(result).toBe('authGuard-result');
      });

      it('should call service.isUrlProtected with segments of anticipated url', () => {
        guard
          .canActivate({
            url: [{ path: 'hello' }, { path: 'world' }],
          } as ActivatedRouteSnapshot)
          .subscribe()
          .unsubscribe();
        expect(service.isUrlProtected).toHaveBeenCalledWith(['hello', 'world']);
      });

      it('should call service.isUrlProtected with array of empty string when the anticipated url is the root path', () => {
        guard
          .canActivate({ url: [] } as ActivatedRouteSnapshot)
          .subscribe()
          .unsubscribe();
        expect(service.isUrlProtected).toHaveBeenCalledWith(['']);
      });
    });
  });
});
