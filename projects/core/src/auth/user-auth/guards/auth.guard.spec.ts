import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { AuthGuard } from './auth.guard';

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
  saveCurrentNavigationUrl = jasmine.createSpy('saveCurrentNavigationUrl');
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
      ],
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    authRedirectService = TestBed.inject(AuthRedirectService);
  });

  describe(', when user is NOT authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    });

    it('should return login url to redirect', () => {
      let result: boolean | UrlTree;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result.toString()).toBe('/login');
    });

    it('should notify AuthRedirectService with the current navigation', () => {
      guard.canActivate().subscribe().unsubscribe();
      expect(authRedirectService.saveCurrentNavigationUrl).toHaveBeenCalled();
    });
  });

  describe(', when user is authorized,', () => {
    beforeEach(() => {
      spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    });

    it('should return true', () => {
      let result: boolean | UrlTree;
      guard
        .canActivate()
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toBe(true);
    });
  });
});
