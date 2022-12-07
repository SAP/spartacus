import { StoreModule } from '@ngrx/store';
import { inject, TestBed } from '@angular/core/testing';
import { MultisiteIsolationAuthService } from './multisite-isolation-auth.service';
import { BaseSiteService, OAuthLibWrapperService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

class MockOAuthLibWrapperService {
  revokeAndLogout = jasmine.createSpy().and.returnValue(Promise.resolve());
  initLoginFlow = jasmine.createSpy();

  authorizeWithPasswordFlow = () => new Promise(() => {});
}

class MockBaseSiteService {
  getActive(): Observable<string> {
    return of();
  }
}

const mockDecorator = '|';

const mockBaseSite = 'test-site';

const mockCredentials = {
  userId: 'test@example.com',
  password: 'myPassword',
};

fdescribe('MultisiteIsolationAuthService', () => {
  let service: MultisiteIsolationAuthService;
  let oAuthLibWrapperService: OAuthLibWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        MultisiteIsolationAuthService,
        {
          provide: BaseSiteService,
          useClass: MockBaseSiteService,
        },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
      ],
    });

    service = TestBed.inject(MultisiteIsolationAuthService);
    oAuthLibWrapperService = TestBed.inject(OAuthLibWrapperService);
  });

  it('should be injected', inject(
    [MultisiteIsolationAuthService],
    (multisiteIsolationAuthService: MultisiteIsolationAuthService) => {
      expect(multisiteIsolationAuthService).toBeTruthy();
    }
  ));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('loginWithCredentials()', () => {
    it('should authorize user by using `uid` decorator', () => {
      spyOn<any>(service, 'getUidDecorator').and.returnValue(
        of(mockDecorator + mockBaseSite)
      );
      spyOn(
        oAuthLibWrapperService,
        'authorizeWithPasswordFlow'
      ).and.callThrough();
      service.loginWithCredentials(
        mockCredentials.userId,
        mockCredentials.password
      );

      expect(
        oAuthLibWrapperService.authorizeWithPasswordFlow
      ).toHaveBeenCalledWith(
        mockCredentials.userId + mockDecorator + mockBaseSite,
        mockCredentials.password
      );
    });
  });
});
