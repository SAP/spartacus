import {
  Component,
  DebugElement,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import {
  FeatureDirective,
  FeatureToggles,
  PageContext,
  PageType,
  RoutingService,
} from '@spartacus/core';
import { GlobalMessageComponent } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
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
class DynamicSlotComponent {
  @Input() position: string;
}

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
class MockPageLayoutComponent {
  @Input() section: string;
}

class MockHamburgerMenuService {
  toggle(_forceCollapse?: boolean): void {}
  isExpanded = of(false);
}

@Directive({ selector: '[cxOutlet]' })
class MockOutletDirective implements Partial<OutletDirective>, OnInit {
  @Input() cxOutlet: string;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}

@Directive({ selector: '[cxPageTemplateStyle]' })
class MockPageTemplateDirective implements Partial<PageTemplateDirective> {}

class MockSkipLinkService implements Partial<SkipLinkService> {
  add(_key: string, _target: HTMLElement): void {}
  remove(_key: string): void {}

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
  readonly isCustomTemplate$ = new BehaviorSubject(false);
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
        provideRouter([]),
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

  describe('isInCustomTemplate', () => {
    it.each([
      { enabled: false, custom: false, expected: false },
      { enabled: false, custom: true, expected: false },
      { enabled: true, custom: false, expected: false },
      { enabled: true, custom: true, expected: true },
    ])(
      'should keep the router outlet and show BottomHeaderSlot unless custom templates are active (enabled=$enabled, custom=$custom)',
      ({ enabled, custom, expected }) => {
        featureToggles.enableCustomPageTemplate = enabled;
        const pageLayoutService = TestBed.inject(
          PageLayoutService
        ) as unknown as MockPageLayoutService;
        pageLayoutService.isCustomTemplate$.next(custom);

        fixture.detectChanges();

        expect(component.isInCustomTemplate()).toBe(expected);
        expect(el.query(By.directive(RouterOutlet))).not.toBeNull();
        const bottomHeaderSlots = el
          .queryAll(By.directive(DynamicSlotComponent))
          .filter(
            (slot) => slot.componentInstance.position === 'BottomHeaderSlot'
          );
        expect(bottomHeaderSlots).toHaveLength(expected ? 0 : 1);
        expect(el.query(By.css('.custom-section'))).toBeNull();
      }
    );
  });
});
