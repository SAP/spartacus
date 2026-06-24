import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  FeatureToggles,
  provideMockFeatureToggles,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { CdcLoginAsGuestGuard } from './cdc-login-as-guest.guard';

const mockFeatureToggles: FeatureToggles = {
  authorizationCodeFlowByDefault: true,
};

const mockWindowRef = {
  localStorage: {
    getItem: jasmine.createSpy().and.returnValue('true'),
    removeItem: jasmine.createSpy(),
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
    mockWindowRef.localStorage.removeItem.calls.reset();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should use overridden login route', (done) => {
    spyOn(semanticPathService, 'get');
    guard.canActivate().subscribe(() => {
      expect(semanticPathService.get).toHaveBeenCalledWith('login');
      done();
    });
  });
});
