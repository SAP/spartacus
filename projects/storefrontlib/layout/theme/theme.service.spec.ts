import { Component, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  FeatureConfigService,
  SiteContextConfig,
  SiteThemeService,
} from '@spartacus/core';
import { ThemeService } from './theme.service';
import { of } from 'rxjs';

@Component({
    selector: 'cx-test',
    template: '',
})
class TestComponent {}

class MockSiteThemeService {
  getActive() {
    return of('basic-theme');
  }
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('ThemeService', () => {
  let service: ThemeService;
  let componentRef: ComponentRef<TestComponent>;
  let featureConfig: FeatureConfigService;
  let mockSiteThemeService: MockSiteThemeService;
  let mockFeatureConfigService: MockFeatureConfigService;

  beforeEach(() => {
    mockSiteThemeService = new MockSiteThemeService();
    mockFeatureConfigService = new MockFeatureConfigService();
    TestBed.configureTestingModule({
    imports: [TestComponent],
    providers: [
        ThemeService,
        {
            provide: SiteContextConfig,
            useValue: { context: { theme: ['test-theme'] } },
        },
        { provide: SiteThemeService, useValue: mockSiteThemeService },
        { provide: FeatureConfigService, useValue: mockFeatureConfigService },
    ],
}).compileComponents();

    service = TestBed.inject(ThemeService);
    mockSiteThemeService = TestBed.inject(SiteThemeService);
    featureConfig = TestBed.inject(FeatureConfigService);
    componentRef = TestBed.createComponent(TestComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set new theme ', () => {
    spyOn(service, 'setTheme');
    spyOn(featureConfig, 'isEnabled').and.returnValue(true);
    spyOn(mockSiteThemeService, 'getActive').and.returnValue(
      of('custom-theme')
    );

    service.init(componentRef);
    expect(mockSiteThemeService.getActive).toHaveBeenCalled();
    expect(service.setTheme).toHaveBeenCalledWith('custom-theme');
  });

  it('should set theme to component', () => {
    service.init(componentRef);
    expect(
      componentRef.location.nativeElement.classList.contains('basic-theme')
    ).toBeTruthy();

    service.setTheme('new-theme');
    expect(
      componentRef.location.nativeElement.classList.contains('new-theme')
    ).toBeTruthy();
    expect(
      componentRef.location.nativeElement.classList.contains('basic-theme')
    ).toBeFalsy();

    service.setTheme('');
    expect(
      componentRef.location.nativeElement.classList.contains('new-theme')
    ).toBeFalsy();
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(service['subscription'], 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(service['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
