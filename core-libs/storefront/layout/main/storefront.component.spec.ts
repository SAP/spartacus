import { Component, DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FeatureDirective,
  FeatureToggles,
  PageContext,
  PageType,
  PageTemplateService,
  RoutingService,
  SectionItem,
} from '@spartacus/core';
import { GlobalMessageComponent } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import {
  OutletDirective,
  PageLayoutComponent,
  PageSlotComponent,
  PageTemplateDirective,
} from '../../cms-structure';
import { MockFeatureDirective } from '@spartacus/storefront/testing/mock-feature-directive';
import { SkipLinkService } from '../a11y/skip-link/index';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { PageLayoutService } from '../../cms-structure/page/page-layout/page-layout.service';
import { StorefrontComponent } from './storefront.component';

@Component({
  selector: 'cx-header',
  template: '',
})
class MockHeaderComponent {}

@Component({
  selector: 'cx-global-message',
  template: '',
})
class MockGlobalMessageComponent {}

@Component({
  selector: 'cx-page-slot',
  template: '',
})
class DynamicSlotComponent {}

@Component({
  selector: 'cx-footer',
  template: '',
})
class MockFooterComponent {}

class MockRoutingService {
  isNavigating(): Observable<boolean> {
    return EMPTY;
  }
  getPageContext(): Observable<PageContext> {
    return of(new PageContext('homepage'));
  }
}

@Component({
  selector: 'cx-schema',
  template: '',
})
class MockSchemaComponent {}

@Component({
  selector: 'cx-page-layout',
  template: '',
})
class MockPageLayoutComponent {}

class MockHamburgerMenuService {
  toggle(_forceCollapse?: boolean): void {}
  isExpanded = of(false);
}

@Directive({ selector: '[cxOutlet]' })
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
}

@Directive({ selector: '[cxPageTemplateStyle]' })
class MockPageTemplateDirective implements Partial<PageTemplateDirective> {}

class MockSkipLinkService implements Partial<SkipLinkService> {
  getSkipLinks() {
    return of([
      {
        key: 'cx-main',
        target: document.createElement('div'),
        i18nKey: 'skipLink.main',
      },
    ]);
  }
  scrollToTarget(): void {}
}

class MockPageLayoutService implements Partial<PageLayoutService> {
  isCustomTemplate$ = of(false);
  page$ = EMPTY;
}

class MockPageTemplateService implements Partial<PageTemplateService> {
  getPageTemplateSections(_templateId: string) {
    return of([]);
  }
}

describe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let fixture: ComponentFixture<StorefrontComponent>;
  let el: DebugElement;
  let routingService: RoutingService;
  let skipLinkService: SkipLinkService;
  let featureToggles: FeatureToggles;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: HamburgerMenuService,
          useClass: MockHamburgerMenuService,
        },
        {
          provide: SkipLinkService,
          useClass: MockSkipLinkService,
        },
        {
          provide: PageLayoutService,
          useClass: MockPageLayoutService,
        },
        {
          provide: PageTemplateService,
          useClass: MockPageTemplateService,
        },
      ],
    })
      .overrideComponent(StorefrontComponent, {
        add: {
          imports: [
            MockHeaderComponent,
            MockGlobalMessageComponent,
            MockFooterComponent,
            MockPageLayoutComponent,
            MockFeatureDirective,
            MockSchemaComponent,
            MockOutletDirective,
            DynamicSlotComponent,
            MockPageTemplateDirective,
          ],
        },
        remove: {
          imports: [
            GlobalMessageComponent,
            PageLayoutComponent,
            FeatureDirective,
            OutletDirective,
            PageSlotComponent,
            PageLayoutComponent,
            PageTemplateDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    routingService = TestBed.inject(RoutingService);
    skipLinkService = TestBed.inject(SkipLinkService);
    featureToggles = TestBed.inject(FeatureToggles);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain start-navigating class', () => {
    vi.spyOn(routingService, 'isNavigating').mockReturnValue(of(true));
    fixture.detectChanges();
    expect(
      el.nativeElement.classList.contains('start-navigating')
    ).toBeTruthy();
  });

  it('should contain stop-navigating class', () => {
    vi.spyOn(routingService, 'isNavigating').mockReturnValue(of(false));
    fixture.detectChanges();
    expect(el.nativeElement.classList.contains('stop-navigating')).toBeTruthy();
    expect(el.nativeElement.classList.contains('start-navigating')).toBeFalsy();
  });

  it('should collapse menu when header is expanded', () => {
    vi.spyOn(component, 'collapseMenu');

    const mockTarget = {};
    mockTarget['className'] = 'is-expanded';
    mockTarget['nodeName'] = 'HEADER';

    const mockEvent = {
      target: mockTarget,
    };

    component.collapseMenuIfClickOutside(mockEvent);
    expect(component.collapseMenu).toHaveBeenCalled();
  });

  it('should NOT collapse menu when header is NOT expanded', () => {
    vi.spyOn(component, 'collapseMenu');

    const mockTarget = {};
    mockTarget['nodeName'] = 'DIV';

    const mockEvent = {
      target: mockTarget,
    };
    component.collapseMenuIfClickOutside(mockEvent);
    expect(component.collapseMenu).not.toHaveBeenCalled();
  });

  describe('onNavigation', () => {
    it('should set navigation flags correctly when navigation starts', () => {
      component['onNavigation'](true);
      expect(component.startNavigating).toBe(true);
      expect(component.stopNavigating).toBe(false);
    });

    it('should set navigation flags correctly when navigation ends', () => {
      component['onNavigation'](false);
      expect(component.startNavigating).toBe(false);
      expect(component.stopNavigating).toBe(true);
    });

    it('should call skipLinkService.scrollToTarget when navigation ends and document has active element', () => {
      vi.spyOn(skipLinkService, 'scrollToTarget');
      featureToggles.a11yFocusBreadcrumbOnNavigation = false;

      const mockDocument = {
        activeElement: document.createElement('button'),
        body: document.createElement('body'),
        querySelector: () => null,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);

      expect(skipLinkService.scrollToTarget).toHaveBeenCalledWith('cx-main');
    });

    it('should not call skipLinkService.scrollToTarget when navigation ends and focus is on body', () => {
      vi.spyOn(skipLinkService, 'scrollToTarget');
      const body = document.createElement('body');
      const mockDocument = {
        activeElement: body,
        body,
        querySelector: () => null,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);

      expect(skipLinkService.scrollToTarget).not.toHaveBeenCalled();
    });

    it('should call scrollToTarget cx-main when toggle is off', () => {
      vi.spyOn(skipLinkService, 'scrollToTarget');
      featureToggles.a11yFocusBreadcrumbOnNavigation = false;

      const mockDocument = {
        activeElement: document.createElement('button'),
        body: document.createElement('body'),
        querySelector: () => null,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);

      expect(skipLinkService.scrollToTarget).toHaveBeenCalledWith('cx-main');
    });

    it('should focus breadcrumb first link when toggle is on, page is CategoryPage and breadcrumb is present', async () => {
      vi.useFakeTimers();
      vi.spyOn(skipLinkService, 'scrollToTarget');
      vi.spyOn(routingService, 'getPageContext').mockReturnValue(
        of(new PageContext('category', PageType.CATEGORY_PAGE))
      );
      featureToggles.a11yFocusBreadcrumbOnNavigation = true;

      const mockAnchor = document.createElement('a');
      vi.spyOn(mockAnchor, 'focus');

      const mockDocument = {
        activeElement: document.createElement('button'),
        body: document.createElement('body'),
        querySelector: (selector: string) =>
          selector === component['categoryPageFocusSelector']
            ? mockAnchor
            : null,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);
      await vi.advanceTimersByTimeAsync(0);
      vi.useRealTimers();

      expect(mockAnchor.focus).toHaveBeenCalled();
      expect(skipLinkService.scrollToTarget).not.toHaveBeenCalled();
    });

    it('should fall back to scrollToTarget cx-main when toggle is on, page is CategoryPage but no breadcrumb is present', async () => {
      vi.useFakeTimers();
      vi.spyOn(skipLinkService, 'scrollToTarget');
      vi.spyOn(routingService, 'getPageContext').mockReturnValue(
        of(new PageContext('category', PageType.CATEGORY_PAGE))
      );
      featureToggles.a11yFocusBreadcrumbOnNavigation = true;

      const mockDocument = {
        activeElement: document.createElement('button'),
        body: document.createElement('body'),
        querySelector: () => null,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);
      await vi.advanceTimersByTimeAsync(0);
      vi.useRealTimers();

      expect(skipLinkService.scrollToTarget).toHaveBeenCalledWith('cx-main');
    });

    it('should call scrollToTarget cx-main when toggle is on but page is not CategoryPage', () => {
      vi.spyOn(skipLinkService, 'scrollToTarget');
      vi.spyOn(routingService, 'getPageContext').mockReturnValue(
        of(new PageContext('my-account', PageType.CONTENT_PAGE))
      );
      featureToggles.a11yFocusBreadcrumbOnNavigation = true;

      const mockDocument = {
        activeElement: document.createElement('button'),
        body: document.createElement('body'),
        querySelector: () => null,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);

      expect(skipLinkService.scrollToTarget).toHaveBeenCalledWith('cx-main');
    });
  });

  describe('convertToStyle', () => {
    const validItem: SectionItem = {
      name: 'section',
      position: 'main',
      rowStart: 1,
      colStart: 1,
      rowSpan: 2,
      colSpan: 3,
    };

    it('should return correct grid style object for a valid item', () => {
      expect(component.convertToStyle(validItem)).toEqual({
        'grid-row-start': 1,
        'grid-column-start': 1,
        'grid-row-end': 'span 2',
        'grid-column-end': 'span 3',
      });
    });

    it('should return empty object for null input', () => {
      expect(component.convertToStyle(null as any)).toEqual({});
    });

    it('should return empty object when spans are zero', () => {
      expect(
        component.convertToStyle({ ...validItem, rowSpan: 0 })
      ).toEqual({});
      expect(
        component.convertToStyle({ ...validItem, colSpan: 0 })
      ).toEqual({});
    });

    it('should return empty object when values are not numbers', () => {
      expect(
        component.convertToStyle({ ...validItem, rowStart: 'abc' as any })
      ).toEqual({});
    });

    it('should return empty object when values are NaN', () => {
      expect(
        component.convertToStyle({ ...validItem, rowStart: NaN })
      ).toEqual({});
    });
  });

  describe('isInCustomTemplate', () => {
    it('should return false when feature toggle is disabled', () => {
      featureToggles.enableCustomPageTemplate = false;
      expect(component.isInCustomTemplate()).toBe(false);
    });

    it('should return false when feature toggle is enabled but isCustomTemplate signal is false', () => {
      featureToggles.enableCustomPageTemplate = true;
      fixture.detectChanges();
      expect(component.isInCustomTemplate()).toBe(false);
    });
  });
});
