/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormCDCComponent } from './login-form-cdc.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { of } from 'rxjs';
import { AuthService, BaseSiteService } from '@spartacus/core';

describe('LoginFormCDCComponent', () => {
  let component: LoginFormCDCComponent;
  let fixture: ComponentFixture<LoginFormCDCComponent>;
  let mockBaseSiteService: jasmine.SpyObj<BaseSiteService>;
  let mockOAuthService: jasmine.SpyObj<OAuthService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockBaseSiteService = jasmine.createSpyObj('BaseSiteService', ['getActive', 'get']);
    mockOAuthService = jasmine.createSpyObj('OAuthService', ['events', 'loadUserProfile', 'configure', 'loadDiscoveryDocumentAndLogin']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['afterRedirectFromCDCLogin']);

    // Mock the observable values as needed
    mockBaseSiteService.getActive.and.returnValue(of('mockBaseSite'));
    mockBaseSiteService.get.and.returnValue(of({ cdcSiteConfig: { /* Mock configuration */ } }));
    mockOAuthService.events = of({ type: 'token_received' }); // Example of mocking an observable

    await TestBed.configureTestingModule({
      declarations: [ LoginFormCDCComponent ],
      providers: [
        { provide: BaseSiteService, useValue: mockBaseSiteService },
        { provide: OAuthService, useValue: mockOAuthService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormCDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should subscribe to OAuth events and load user profile when token_received', () => {
    // Since ngOnInit is called in beforeEach, we just verify the expected calls here
    expect(mockOAuthService.loadUserProfile).toHaveBeenCalled();
    expect(mockAuthService.afterRedirectFromCDCLogin).toHaveBeenCalled();
  });

  it('initializeOAuthFlow should configure OAuthService with site config', () => {
    // Call the method directly as it's not called automatically in this test setup
    component.initializeOAuthFlow();
    expect(mockBaseSiteService.get).toHaveBeenCalledWith('mockBaseSite');
    expect(mockOAuthService.configure).toHaveBeenCalled();
    expect(mockOAuthService.loadDiscoveryDocumentAndLogin).toHaveBeenCalled();
  });
});
