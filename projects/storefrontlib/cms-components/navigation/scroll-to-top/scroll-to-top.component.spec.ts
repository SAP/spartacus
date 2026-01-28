import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsScrollToTopComponent,
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

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;
  let focusUtility: SelectFocusUtility;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconTestingModule, I18nTestingModule, ScrollToTopComponent],
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
    const mockFirstFocusableElement = document.createElement('input');
    spyOn(focusUtility, 'findFirstFocusable').and.returnValue(
      mockFirstFocusableElement
    );
    spyOn(mockFirstFocusableElement, 'focus');
    spyOnProperty<any>(component['window'], 'scrollY').and.returnValue(0);
    spyOnProperty(document, 'activeElement', 'get').and.returnValue(
      component.button.nativeElement
    );
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });

    component['onTab'](tabEvent);

    expect(focusUtility.findFirstFocusable).toHaveBeenCalled();
    expect(mockFirstFocusableElement.focus).toHaveBeenCalled();
  });

  it('should reset triggedByKeypress flag when display is set to false', () => {
    component['triggedByKeypress'] = true;
    component.display = false;

    component['switchDisplay'].call(component);

    expect(component['triggedByKeypress']).toEqual(false);
  });
});
