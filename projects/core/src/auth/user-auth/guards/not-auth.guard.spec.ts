import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { NotAuthGuard } from './not-auth.guard';

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  reportNotAuthGuard = jasmine.createSpy('reportNotAuthGuard');
}

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;
  let authService: AuthServiceStub;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SemanticPathService, useClass: SemanticPathServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
      ],
      imports: [RouterTestingModule],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(NotAuthGuard);
    authRedirectService = TestBed.inject(AuthRedirectService);
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    });

    it('should return homepage url to redirect to', () => {
      let result: boolean | UrlTree;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result.toString()).toBe('/home');
    });
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    });

    it('should return true', () => {
      let result: boolean | UrlTree;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();

      expect(result).toBe(true);
    });

    it('should notify AuthRedirectService with the current navigation', () => {
      guard.canActivate().subscribe().unsubscribe();
      expect(authRedirectService.reportNotAuthGuard).toHaveBeenCalled();
    });
  });
});
