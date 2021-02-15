import { Component, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SiteContextConfig } from '@spartacus/core';
import { SiteThemeService } from './site-theme.service';

@Component({
  selector: 'cx-test',
  template: '',
})
class TestComponent {}

describe('SiteThemeService', () => {
  let service: SiteThemeService;
  let componentRef: ComponentRef<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SiteThemeService,
        {
          provide: SiteContextConfig,
          useValue: { context: { theme: ['test-theme'] } },
        },
      ],
      declarations: [TestComponent],
    }).compileComponents();

    service = TestBed.inject(SiteThemeService);
    componentRef = TestBed.createComponent(TestComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setTheme only once', () => {
    spyOn(service, 'setTheme');

    service.init(componentRef);
    expect(service.setTheme).toHaveBeenCalledWith('test-theme');
    // call init again
    service.init(componentRef);
    expect(service.setTheme).toHaveBeenCalledTimes(1);
  });

  it('should set theme to component', () => {
    service.init(componentRef);
    expect(
      componentRef.location.nativeElement.classList.contains(
        'cx-theme--test-theme'
      )
    ).toBeTruthy();

    service.setTheme('new-theme');
    expect(
      componentRef.location.nativeElement.classList.contains(
        'cx-theme--new-theme'
      )
    ).toBeTruthy();
    expect(
      componentRef.location.nativeElement.classList.contains(
        'cx-theme--test-theme'
      )
    ).toBeFalsy();
  });
});
