import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsScrollToTopComponent,
  FeatureConfigService,
  I18nTestingModule,
  ScrollBehavior,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SelectFocusUtility } from '../../../layout/a11y/index';
import { IconTestingModule } from '../../misc/icon/testing/icon-testing.module';
import { ScrollToTopComponent } from './scroll-to-top.component';

const mockData: CmsScrollToTopComponent = {
  scrollBehavior: ScrollBehavior.SMOOTH,
  displayThreshold: 100,
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockData),
};
//TODO: (CXSPA-6522) - remove feature flag next major release.
class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;
  let focusUtility: SelectFocusUtility;
  let el: DebugElement;
  let scrollBtn: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconTestingModule, I18nTestingModule],
      declarations: [ScrollToTopComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    }).compileComponents();

    focusUtility = TestBed.inject(SelectFocusUtility);
    fixture = TestBed.createComponent(ScrollToTopComponent);

    component = fixture.componentInstance;
    el = fixture.debugElement;
    scrollBtn = el.query(By.css('.cx-scroll-to-top-btn')).nativeElement;
    component.button = el.query(By.css('.cx-scroll-to-top-btn'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set config on init', () => {
    spyOn<any>(component, 'setConfig').and.callThrough();
    component.ngOnInit();
    expect(component['setConfig']).toHaveBeenCalled();
  });

  it('should scroll window to top when clicked', () => {
    spyOn<any>(component['window'], 'scrollTo');

    component.scrollToTop(new MouseEvent('click'));
    expect(component['window']?.scrollTo as any).toHaveBeenCalledWith({
      top: 0,
      behavior: ScrollBehavior.SMOOTH,
    });
  });

  describe('on focused out', () => {
    beforeEach(() => {
      component.display = true;
      component['displayThreshold'] = 0;

      spyOn<any>(component, 'switchDisplay').and.callThrough();
    });

    it('should not be displayed if on top of page', () => {
      spyOnProperty<any>(component['window'], 'scrollY').and.returnValue(0);
      component.onFocusOut();

      expect(component['switchDisplay']).toHaveBeenCalled();
      expect(component.display).toBe(false);
    });

    it('should be still displayed if not at top of page', () => {
      spyOnProperty<any>(component['window'], 'scrollY').and.returnValue(1);

      component.onFocusOut();

      expect(component['switchDisplay']).toHaveBeenCalled();
      expect(component.display).toBe(true);
    });
  });

  it('should switch display on scroll', () => {
    spyOn<any>(component, 'switchDisplay');
    component.onScroll();

    expect(component['switchDisplay']).toHaveBeenCalled();
  });

  it('should focus first focusable element after activated with keyboard and pressing tab', () => {
    spyOn(focusUtility, 'findFirstFocusable').and.callThrough();
    scrollBtn.focus();
    component['triggedByKeypress'] = true;
    component['onTab'](new KeyboardEvent('keydown', { key: 'Tab' }));

    expect(focusUtility.findFirstFocusable).toHaveBeenCalled();
    expect(document.activeElement).not.toBe(component.button.nativeElement);
  });

  it('should reset triggedByKeypress flag when display is set to false', () => {
    component['triggedByKeypress'] = true;
    component.display = true;
    scrollBtn.focus();

    Object.defineProperty(component, 'display', {
      get() {
        return false;
      },
      set() {},
    });

    component['switchDisplay'].call(component);

    expect(component['triggedByKeypress']).toEqual(false);
  });
});
