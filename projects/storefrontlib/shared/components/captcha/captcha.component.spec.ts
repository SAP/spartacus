import { Observable, of } from 'rxjs';
import { CaptchaConfig } from '@spartacus/core';
import { CaptchaComponent } from '@spartacus/storefront';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaptchaApiConfig } from './captcha-api-config';

class MockCaptchaService {
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

  resetCaptcha(): void {}
}

const mockCaptchaApiConfig: CaptchaApiConfig = {
  apiUrl: 'mock-url',
  fields: { 'mock-field-key': 'mock-field-value' },
  captchaRenderer: MockCaptchaService,
};

describe('CaptchaComponent', () => {
  let component: CaptchaComponent;
  let fixture: ComponentFixture<CaptchaComponent>;
  let service: MockCaptchaService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaptchaComponent],
      providers: [
        { provide: CaptchaApiConfig, useValue: mockCaptchaApiConfig },
        MockCaptchaService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MockCaptchaService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init correctly', () => {
    spyOn(service, 'getCaptchaConfig').and.callThrough();
    spyOn(service, 'renderCaptcha').and.callThrough();
    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(service.getCaptchaConfig).toHaveBeenCalledTimes(1);
    expect(service.renderCaptcha).toHaveBeenCalledTimes(1);
  });
});
