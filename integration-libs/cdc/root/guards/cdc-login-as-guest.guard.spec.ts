import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  FeatureToggles,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { CdcLoginAsGuestGuard } from './cdc-login-as-guest.guard';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { firstValueFrom } from 'rxjs';

const mockFeatureToggles: FeatureToggles = {
  authorizationCodeFlowByDefault: true,
};

const mockWindowRef = {
  localStorage: {
    getItem: vi.fn().mockReturnValue('true'),
    removeItem: vi.fn(),
  },
};

class MockSemanticPathService implements Partial<SemanticPathService> {
  get(_routeName: string) {
    return '/loginPath';
  }
}

describe('CdcLoginAsGuestGuard', () => {
  let guard: CdcLoginAsGuestGuard;
  let semanticPathService: SemanticPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Router,
        provideMockFeatureToggles({ ...mockFeatureToggles }),
        {
          provide: SemanticPathService,
          useClass: MockSemanticPathService,
        },
        {
          provide: WindowRef,
          useValue: mockWindowRef,
        },
      ],
    });
    guard = TestBed.inject(CdcLoginAsGuestGuard);
    semanticPathService = TestBed.inject(SemanticPathService);
  });

  beforeEach(() => {
    mockWindowRef.localStorage.removeItem.mockClear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should use overridden login route', async () => {
    vi.spyOn(semanticPathService, 'get');
    await firstValueFrom(guard.canActivate());
    expect(semanticPathService.get).toHaveBeenCalledWith('login');
  });
});
