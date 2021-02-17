import { Component, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SiteContextConfig } from '@spartacus/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'cx-test',
  template: '',
})
class TestComponent {}

describe('ThemeService', () => {
  let service: ThemeService;
  let componentRef: ComponentRef<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        {
          provide: SiteContextConfig,
          useValue: { context: { theme: ['test-theme'] } },
        },
      ],
      declarations: [TestComponent],
    }).compileComponents();

    service = TestBed.inject(ThemeService);
    componentRef = TestBed.createComponent(TestComponent).componentRef;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setTheme only once', () => {
    spyOn(service, 'setTheme');

    service.init(componentRef);
    expect(service.setTheme).toHaveBeenCalledWith('test-theme');
  });

  it('should set theme to component', () => {
    service.init(componentRef);
    expect(
      componentRef.location.nativeElement.classList.contains('test-theme')
    ).toBeTruthy();

    service.setTheme('new-theme');
    expect(
      componentRef.location.nativeElement.classList.contains('new-theme')
    ).toBeTruthy();
    expect(
      componentRef.location.nativeElement.classList.contains('test-theme')
    ).toBeFalsy();
  });
});
