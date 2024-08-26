/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginOidcComponent } from './login-oidc.component';
import { OAuthLibWrapperService } from '@spartacus/core';

class MockOAuthService implements Partial<OAuthLibWrapperService> {
  initLoginFlow = jasmine.createSpy('initLoginFlow');
}

describe('LoginOidcComponent', () => {
  let component: LoginOidcComponent;
  let fixture: ComponentFixture<LoginOidcComponent>;
  let mockOAuthService: OAuthLibWrapperService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginOidcComponent],
      providers: [
        { provide: OAuthLibWrapperService, useClass: MockOAuthService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockOAuthService = TestBed.inject(OAuthLibWrapperService);
  });

  it('should create and call initLoginFlow', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(mockOAuthService.initLoginFlow).toHaveBeenCalled();
  });
});
