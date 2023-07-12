import { Observable, of } from 'rxjs';
import { CaptchaConfig } from '@spartacus/core';
import { CaptchaComponent, CaptchaProvider } from '@spartacus/storefront';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GoogleRecaptchaApiConfig } from './google-recaptchaV2/config/google-recaptcha-api-config';

class MockCaptchaService implements CaptchaProvider {
  getCaptchaConfig(): Observable<CaptchaConfig> {
    return of({
      enabled: true,
      publicKey: 'mock-key',
    });
  }

  getToken(): string {
    return 'mock-token';
  }

  renderCaptcha(): Observable<string> {
    return of('');
  }
}

const mockCaptchaApiConfig: GoogleRecaptchaApiConfig = {
  apiUrl: 'mock-url',
  fields: { 'mock-field-key': 'mock-field-value' },
  captchaProvider: MockCaptchaService,
};

describe('Captcha Component', () => {
  let component: CaptchaComponent;
  let fixture: ComponentFixture<CaptchaComponent>;
  let config: GoogleRecaptchaApiConfig;
  let service: CaptchaProvider;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CaptchaComponent],
        providers: [
          { provide: GoogleRecaptchaApiConfig, useValue: mockCaptchaApiConfig },
          MockCaptchaService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaComponent);
    component = fixture.componentInstance;
    config = TestBed.inject(GoogleRecaptchaApiConfig);
    service = TestBed.inject(MockCaptchaService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init correctly', () => {
    spyOn(service, 'getCaptchaConfig').and.callThrough();
    spyOn(service, 'renderCaptcha').and.callThrough();

    fixture.detectChanges();

    expect(service.getCaptchaConfig).toHaveBeenCalledTimes(1);
    expect(service.renderCaptcha).toHaveBeenCalledTimes(1);
    expect(
      component.captchaRef.nativeElement.getAttribute('mock-field-key')
    ).toEqual(config.fields['mock-field-key']);
  });
});
