import { TestBed } from '@angular/core/testing';
import { CdcLoginGuard } from './cdc-login.guard';
import { AuthService, AuthConfigService } from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';
import { firstValueFrom } from 'rxjs';

describe('CdcLoginGuard', () => {
  let guard: CdcLoginGuard;
  let mockAuthService: any;
  let mockCmsPageGuard: any;

  beforeEach(() => {
    mockAuthService = { loginWithRedirect: vi.fn() };
    mockCmsPageGuard = { canActivate: vi.fn() };

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

  it('shouldRenderCMSPage should return true', async () => {
    const result = await firstValueFrom(guard['shouldRenderCMSPage']());
    expect(result).toEqual(true);
  });
});
