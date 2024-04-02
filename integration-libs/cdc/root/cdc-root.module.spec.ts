import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  BaseSiteService,
  GlobalMessageService,
  LanguageService,
} from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { CdcRootModule } from './cdc-root.module';
import { CdcConfig } from './config';

const sampleCdcConfig: CdcConfig = {
  cdc: [
    {
      baseSite: 'electronics-spa',
      javascriptUrl: 'sample-url',
      sessionExpiration: 120,
    },
  ],
};

class BaseSiteServiceStub implements Partial<BaseSiteService> {
  getActive(): Observable<string> {
    return EMPTY;
  }
}
class LanguageServiceStub implements Partial<LanguageService> {
  getActive(): Observable<string> {
    return EMPTY;
  }
}

declare var window: Window;

interface Window {
  gigya?: any;
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return EMPTY;
  }
}

const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};

describe('CdcRootModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CdcRootModule],
      providers: [
        { provide: CdcConfig, useValue: sampleCdcConfig },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
        { provide: LanguageService, useClass: LanguageServiceStub },
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useValue: mockedGlobalMessageService },
      ],
    });
  });

  it('initializes', () => {
    const cdcRootModule = TestBed.inject(CdcRootModule);
    expect(cdcRootModule).toBeTruthy();
  });
});
