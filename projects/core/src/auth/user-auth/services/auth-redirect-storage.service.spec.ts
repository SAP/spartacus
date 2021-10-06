import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';

describe('AuthRedirectStorageService', () => {
  let service: AuthRedirectStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRedirectStorageService],
    });
    service = TestBed.inject(AuthRedirectStorageService);
  });

  it('should store the redirect url', () => {
    let redirectUrl;
    service
      .getRedirectUrl()
      .pipe(take(2))
      .subscribe((url) => (redirectUrl = url));

    expect(redirectUrl).toBeUndefined();

    service.setRedirectUrl('some_url');
    expect(redirectUrl).toEqual('some_url');
  });
});
