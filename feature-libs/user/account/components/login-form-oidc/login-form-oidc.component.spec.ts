/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginFormOidcComponent } from './login-form-oidc.component';
import {
  AuthService,
  BaseSite,
  BaseSiteService,
  CdcSiteConfig,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';

class MockBaseSiteService implements Partial<BaseSiteService> {
  get(): Observable<BaseSite> {
    return of();
  }
}

class MockOAuthService implements Partial<OAuthService> {
  events: Observable<OAuthEvent> = of();
  loadDiscoveryDocumentAndLogin = jasmine.createSpy(
    'loadDiscoveryDocumentAndLogin'
  );
  configure = jasmine.createSpy('configure');
}

class MockAuthService {
  afterRedirectFromOidcLogin = jasmine.createSpy('afterRedirectFromOidcLogin');
}

describe('LoginFormOidcComponent', () => {
  let component: LoginFormOidcComponent;
  let fixture: ComponentFixture<LoginFormOidcComponent>;
  let mockOAuthService: OAuthService;
  let mockAuthService: AuthService;
  let mockBaseSiteService: BaseSiteService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormOidcComponent],
      providers: [
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: OAuthService, useClass: MockOAuthService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormOidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockOAuthService = TestBed.inject(OAuthService);
    mockAuthService = TestBed.inject(AuthService);
    mockBaseSiteService = TestBed.inject(BaseSiteService);
  });

  it('should create and call initializeOAuthFlow', () => {
    spyOn(component, 'initializeOAuthFlow').and.stub();
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.initializeOAuthFlow).toHaveBeenCalled();
  });

  it('should call configure and loadDiscoveryDocumentAndLogin with cdcSiteConfig', () => {
    let cdcSiteConfig: CdcSiteConfig = {
      oicdRpClientId: 'mock',
      oidcOpIssuerURI: 'mock',
      scopes: ['mock'],
    };
    let baseSiteWithCdcSiteConfig: BaseSite = {
      uid: 'mock',
      cdcSiteConfig: cdcSiteConfig,
    };
    spyOn(mockBaseSiteService, 'get').and.returnValue(
      of(baseSiteWithCdcSiteConfig)
    );
    component.initializeOAuthFlow();
    expect(mockOAuthService.configure).toHaveBeenCalled();
    expect(mockOAuthService.loadDiscoveryDocumentAndLogin).toHaveBeenCalled();
  });

  it('should not call configure and loadDiscoveryDocumentAndLogin without cdcSiteConfig', () => {
    component.initializeOAuthFlow();
    expect(mockOAuthService.configure).not.toHaveBeenCalled();
    expect(
      mockOAuthService.loadDiscoveryDocumentAndLogin
    ).not.toHaveBeenCalled();
  });

  it('should login and redirect user after getting token_received', () => {
    mockOAuthService.events = new BehaviorSubject<OAuthEvent>({
      type: 'token_received',
    });
    component.ngOnInit();
    expect(mockAuthService.afterRedirectFromOidcLogin).toHaveBeenCalled();
  });

  it('should not login without token_received', () => {
    component.ngOnInit();
    expect(mockAuthService.afterRedirectFromOidcLogin).not.toHaveBeenCalled();
  });
});
