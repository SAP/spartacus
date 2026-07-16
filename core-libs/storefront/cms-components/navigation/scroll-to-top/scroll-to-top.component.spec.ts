import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsScrollToTopComponent,
  MockTranslatePipe,
  ScrollBehavior,
  TranslatePipe,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SelectFocusUtility } from '../../../layout/a11y/index';
import { IconComponent } from '../../misc/icon/icon.component';
import { MockIconComponent } from '../../misc/icon/testing/icon-testing.module';
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
  let scrollBtn: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScrollToTopComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
      ],
    })
      .overrideComponent(ScrollToTopComponent, {
        remove: { imports: [IconComponent, TranslatePipe] },
        add: { imports: [MockIconComponent, MockTranslatePipe] },
      })
      .compileComponents();

    focusUtility = TestBed.inject(SelectFocusUtility);
    fixture = TestBed.createComponent(ScrollToTopComponent);

    component = fixture.componentInstance;
    el = fixture.debugElement;
    scrollBtn = el.query(By.css('.cx-scroll-to-top-btn')).nativeElement;
    component.button = el.query(By.css('.cx-scroll-to-top-btn'));

    // Attach the fixture to the DOM so that calling `.focus()` actually updates
    // `document.activeElement` (a detached element cannot receive focus).
    document.body.appendChild(fixture.nativeElement);
  });

  afterEach(() => {
    document.body.removeChild(fixture.nativeElement);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set config on init', () => {
    vi.spyOn<any>(component, 'setConfig');
    component.ngOnInit();
    expect(component['setConfig']).toHaveBeenCalled();
  });

  it('should scroll window to top when clicked', () => {
    vi.spyOn<any>(component['window'], 'scrollTo');

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

      vi.spyOn<any>(component, 'switchDisplay');
    });

    it('should not be displayed if on top of page', () => {
      vi.spyOn<any>(component['window'], 'scrollY', 'get').mockReturnValue(0);
      component.onFocusOut();

      expect(component['switchDisplay']).toHaveBeenCalled();
      expect(component.display).toBe(false);
    });

    it('should be still displayed if not at top of page', () => {
      vi.spyOn<any>(component['window'], 'scrollY', 'get').mockReturnValue(1);

      component.onFocusOut();

      expect(component['switchDisplay']).toHaveBeenCalled();
      expect(component.display).toBe(true);
    });
  });

  it('should switch display on scroll', () => {
    vi.spyOn<any>(component, 'switchDisplay');
    component.onScroll();

    expect(component['switchDisplay']).toHaveBeenCalled();
  });

  it('should focus first focusable element after activated with keyboard and pressing tab', async () => {
    vi.spyOn(focusUtility, 'findFirstFocusable');
    scrollBtn.focus();
    component['triggedByKeypress'] = true;
    component['onTab'](new KeyboardEvent('keydown', { key: 'Tab' }));

    // Wait for focus changes to propagate
    await new Promise((resolve) => setTimeout(resolve, 0));
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
