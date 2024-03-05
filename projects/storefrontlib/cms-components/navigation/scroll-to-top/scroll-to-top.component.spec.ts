import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  CmsScrollToTopComponent,
  ScrollBehavior,
  I18nTestingModule,
} from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { IconTestingModule } from '../../misc/icon/testing/icon-testing.module';
import { SelectFocusUtility } from '../../../layout/a11y/index';
import { of } from 'rxjs';

const mockData: CmsScrollToTopComponent = {
  scrollBehavior: ScrollBehavior.SMOOTH,
  displayThreshold: 100,
};

const MockCmsComponentData = <CmsComponentData<any>>{
  data$: of(mockData),
};

fdescribe('ScrollToTopComponent', () => {
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
    expect(component['window']!.scrollTo).toHaveBeenCalled();
  });

  describe('when focused out', () => {
    beforeEach(() => {
      component.display = true;
      component['displayThreshold'] = 0;

      spyOn<any>(component, 'switchDisplay').and.callThrough();
    });

    it('should not be displayed if on top of page', () => {
      spyOnProperty<any>(component['window'], 'scrollY').and.returnValue(0);
      component.focusOut();

      expect(component['switchDisplay']).toHaveBeenCalled();
      expect(component.display).toBe(false);
    });

    it('should be still displayed if not at top of page', () => {
      spyOnProperty<any>(component['window'], 'scrollY').and.returnValue(1);

      component.focusOut();

      expect(component['switchDisplay']).toHaveBeenCalled();
      expect(component.display).toBe(true);
    });
  });

  it('should switch display on scroll', () => {
    spyOn<any>(component, 'switchDisplay');
    component.onScroll();

    expect(component['switchDisplay']).toHaveBeenCalled();
  });

  describe('when tab key is pressed', () => {
    beforeEach(() => {
      spyOn(focusUtility, 'findFirstFocusable').and.callThrough();
      scrollBtn.focus();
    });
    it('should focus first focusable element if btn is active and clicked', () => {
      component['clickEventSource'] = 0;

      component.handleKeyboardEvent(
        new KeyboardEvent('keydown', { key: 'Tab' })
      );

      expect(focusUtility.findFirstFocusable).toHaveBeenCalled();
      expect(document.activeElement).not.toBe(component.button.nativeElement);
    });

    it('should keep focus on button if it is active but not clicked', () => {
      component['clickEventSource'] = undefined;

      component.handleKeyboardEvent(
        new KeyboardEvent('keydown', { key: 'Tab' })
      );

      expect(focusUtility.findFirstFocusable).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(component.button.nativeElement);
    });
  });

  it('should reset click flag when switch display off', () => {
    component['clickEventSource'] = 0;
    component.display = true;
    scrollBtn.focus();

    spyOn<any>(component, 'resetClickEventSource').and.callThrough();

    // Makes display property always return false when read
    Object.defineProperty(component, 'display', {
      get() {
        return false;
      },
      set() {},
    });

    component['switchDisplay'].call(component);

    expect(component['resetClickEventSource']).toHaveBeenCalled();
    expect(component['clickEventSource']).toBeUndefined();
  });
});
