/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginFormCDCComponent } from './login-form-cdc.component';
import {
  AuthService,
  BaseSite,
  BaseSiteService,
  CdcSiteConfig,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';

class MockBaseSiteService implements Partial<BaseSiteService> {
  baseSite: BaseSite = {};
  cdcSiteConfig: CdcSiteConfig = {
    oicdRpClientId: 'mock',
    oidcOpIssuerURI: 'mock',
    scopes: ['mock'],
  };
  getActive(): Observable<string> {
    return of('activeBaseSite');
  }
  get(): Observable<BaseSite> {
    this.baseSite.cdcSiteConfig = this.cdcSiteConfig;
    return of(this.baseSite);
  }
}

class MockOAuthService implements Partial<OAuthService> {
  oAuthEvent: OAuthEvent = { type: 'token_received' };
  events: Observable<OAuthEvent> = of(this.oAuthEvent);
  loadDiscoveryDocumentAndLogin = jasmine.createSpy(
    'loadDiscoveryDocumentAndLogin'
  );
  configure = jasmine.createSpy('configure');
}

class MockAuthService {
  afterRedirectFromCDCLogin = jasmine.createSpy('afterRedirectFromCDCLogin');
}

describe('LoginFormCDCComponent', () => {
  let component: LoginFormCDCComponent;
  let fixture: ComponentFixture<LoginFormCDCComponent>;
  let mockOAuthService: OAuthService;
  let mockAuthService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormCDCComponent],
      providers: [
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: OAuthService, useClass: MockOAuthService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormCDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockOAuthService = TestBed.inject(OAuthService);
    mockAuthService = TestBed.inject(AuthService);
  });

  it('should create and call initializeOAuthFlow', () => {
    spyOn(component, 'initializeOAuthFlow').and.stub();
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.initializeOAuthFlow).toHaveBeenCalled();
  });

  it('should call initializeOAuthFlow', () => {
    component.initializeOAuthFlow();
    expect(mockOAuthService.configure).toHaveBeenCalled();
    expect(mockOAuthService.loadDiscoveryDocumentAndLogin).toHaveBeenCalled();
  });

  it('should login and redirect user after getting token_received', () => {
    component.ngOnInit();
    expect(mockAuthService.afterRedirectFromCDCLogin).toHaveBeenCalled();
  });
});
