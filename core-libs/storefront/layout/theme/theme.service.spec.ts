import { Component, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SiteContextConfig, SiteThemeService } from '@spartacus/core';
import { of } from 'rxjs';
import { ThemeService } from './theme.service';

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

describe('ThemeService', () => {
  let service: ThemeService;
  let componentRef: ComponentRef<TestComponent>;
  let mockSiteThemeService: MockSiteThemeService;

  beforeEach(() => {
    mockSiteThemeService = new MockSiteThemeService();
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        ThemeService,
        {
          provide: SiteContextConfig,
          useValue: { context: { theme: ['test-theme'] } },
        },
        { provide: SiteThemeService, useValue: mockSiteThemeService },
      ],
    }).compileComponents();

    service = TestBed.inject(ThemeService);
    mockSiteThemeService = TestBed.inject(SiteThemeService);
    componentRef = TestBed.createComponent(TestComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set new theme ', () => {
    vi.spyOn(service, 'setTheme');
    vi.spyOn(mockSiteThemeService, 'getActive').mockReturnValue(
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
    vi.spyOn(service['subscription'], 'unsubscribe');
    service.ngOnDestroy();
    expect(service['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
