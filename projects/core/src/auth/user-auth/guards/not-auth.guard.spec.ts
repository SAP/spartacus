import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import { NotAuthGuard } from './not-auth.guard';

class AuthServiceStub implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return EMPTY;
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;
  let authService: AuthServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SemanticPathService, useClass: SemanticPathServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
      imports: [RouterTestingModule],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(NotAuthGuard);
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
  });
});
