import { Observable, of } from 'rxjs';
import { CaptchaConfig } from '@spartacus/core';
import { CaptchaComponent, CaptchaService } from '@spartacus/storefront';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaptchaApiConfig } from './config/captcha-api-config';

class MockCaptchaService {
  getCaptchaConfig(): Observable<CaptchaConfig> {
    return of({
      enabled: true,
      publicKey: 'mock-key',
    });
  }

  renderCaptcha(): void {}
}

const mockField = 'mock-field';
const mockValue = 'mock-value';
const mockConfig: CaptchaApiConfig = {
  fields: { [mockField]: mockValue },
};

describe('Captcha Component', () => {
  let component: CaptchaComponent;
  let fixture: ComponentFixture<CaptchaComponent>;
  let service: CaptchaService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CaptchaComponent],
        providers: [
          { provide: CaptchaApiConfig, useValue: mockConfig },
          { provide: CaptchaService, useClass: MockCaptchaService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CaptchaService);
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
    expect(component.captchaRef.nativeElement.getAttribute(mockField)).toEqual(
      mockValue
    );
  });
});
