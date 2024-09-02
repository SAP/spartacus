import { Observable, of } from 'rxjs';
import { CaptchaConfig } from '@spartacus/core';
import { CaptchaComponent, CaptchaRenderer } from '@spartacus/storefront';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CaptchaApiConfig } from './captcha-api-config';

class MockCaptchaService implements CaptchaRenderer {
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
  let service: CaptchaRenderer;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaptchaComponent],
      providers: [
        { provide: CaptchaApiConfig, useValue: mockCaptchaApiConfig },
        { provide: CaptchaRenderer, useClass: MockCaptchaService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CaptchaRenderer);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should init correctly', fakeAsync(() => {
    spyOn(service, 'getCaptchaConfig').and.callThrough();
    spyOn(service, 'renderCaptcha').and.callThrough();

    fixture.detectChanges(); // 触发组件的ngOnInit和ngAfterViewInit等生命周期钩子

    tick(); // 推动时钟，使所有异步任务完成

    expect(service.getCaptchaConfig).toHaveBeenCalledTimes(1);
    expect(service.renderCaptcha).toHaveBeenCalledTimes(1);
  }));
});
