import { TestBed } from '@angular/core/testing';
import { CdcLoginGuard } from './cdc-login.guard';
import { AuthService, AuthConfigService } from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';

describe('CdcLoginGuard', () => {
  let guard: CdcLoginGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockCmsPageGuard: jasmine.SpyObj<CmsPageGuard>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', [
      'loginWithRedirect',
    ]);
    mockCmsPageGuard = jasmine.createSpyObj('CmsPageGuard', ['canActivate']);

    TestBed.configureTestingModule({
      providers: [
        CdcLoginGuard,
        AuthConfigService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: CmsPageGuard, useValue: mockCmsPageGuard },
      ],
    });

    guard = TestBed.inject(CdcLoginGuard);
  });

  it('shouldRenderCMSPage should return true', (done) => {
    guard['shouldRenderCMSPage']().subscribe((result) => {
      expect(result).toEqual(true);
      done();
    });
  });
});
