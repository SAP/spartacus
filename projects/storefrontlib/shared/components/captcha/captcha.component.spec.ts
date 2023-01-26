import { Observable, of } from 'rxjs';
import { CaptchaConfig } from '@spartacus/core';
import { CaptchaComponent, CaptchaProvider } from '@spartacus/storefront';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaptchaApiConfig } from './config/captcha-api-config';

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

const mockCaptchaApiConfig: CaptchaApiConfig = {
  apiUrl: 'mock-url',
  fields: { 'mock-field-key': 'mock-field-value' },
  captchaProvider: MockCaptchaService,
};

describe('Captcha Component', () => {
  let component: CaptchaComponent;
  let fixture: ComponentFixture<CaptchaComponent>;
  let config: CaptchaApiConfig;
  let service: CaptchaProvider;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CaptchaComponent],
        providers: [
          { provide: CaptchaApiConfig, useValue: mockCaptchaApiConfig },
          MockCaptchaService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaComponent);
    component = fixture.componentInstance;
    config = TestBed.inject(CaptchaApiConfig);
    service = TestBed.inject(MockCaptchaService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init correctly', () => {
    spyOn(service, 'getCaptchaConfig').and.callThrough();
    spyOn(service, 'renderCaptcha').and.callThrough();
    component.enabled.subscribe((value) => expect(value).toEqual(true));

    fixture.detectChanges();

    expect(service.getCaptchaConfig).toHaveBeenCalledTimes(1);
    expect(service.renderCaptcha).toHaveBeenCalledTimes(1);
    expect(
      component.captchaRef.nativeElement.getAttribute('mock-field-key')
    ).toEqual(config.fields['mock-field-key']);
  });
});
