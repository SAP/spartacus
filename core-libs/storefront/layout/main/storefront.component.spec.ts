import { Component, DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FeatureDirective,
  FeatureToggles,
  RoutingService,
  provideFeatureToggles,
} from '@spartacus/core';
import { GlobalMessageComponent } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import {
  OutletDirective,
  PageLayoutComponent,
  PageSlotComponent,
  PageTemplateDirective,
} from '../../cms-structure';
import { MockFeatureDirective } from '../../shared/test/mock-feature-directive';
import { SkipLinkService } from '../a11y/skip-link/index';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
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

describe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let fixture: ComponentFixture<StorefrontComponent>;
  let el: DebugElement;
  let routingService: RoutingService;
  let skipLinkService: SkipLinkService;
  let featureToggles: FeatureToggles;

  beforeEach(waitForAsync(() => {
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
        provideFeatureToggles({ a11yFocusBreadcrumbOnNavigation: false }),
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
  }));

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
    spyOn(routingService, 'isNavigating').and.returnValue(of(true));
    fixture.detectChanges();
    expect(
      el.nativeElement.classList.contains('start-navigating')
    ).toBeTruthy();
  });

  it('should contain stop-navigating class', () => {
    spyOn(routingService, 'isNavigating').and.returnValue(of(false));
    fixture.detectChanges();
    expect(el.nativeElement.classList.contains('stop-navigating')).toBeTruthy();
    expect(el.nativeElement.classList.contains('start-navigating')).toBeFalsy();
  });

  it('should collapse menu when header is expanded', () => {
    spyOn(component, 'collapseMenu').and.callThrough();

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
    spyOn(component, 'collapseMenu').and.callThrough();

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
      spyOn(skipLinkService, 'scrollToTarget');
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
      spyOn(skipLinkService, 'scrollToTarget');
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
      spyOn(skipLinkService, 'scrollToTarget');
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

    it('should focus breadcrumb first link when toggle is on and breadcrumb is present', () => {
      spyOn(skipLinkService, 'scrollToTarget');
      featureToggles.a11yFocusBreadcrumbOnNavigation = true;

      const mockAnchor = document.createElement('a');
      spyOn(mockAnchor, 'focus');

      const mockDocument = {
        activeElement: document.createElement('button'),
        body: document.createElement('body'),
        querySelector: (selector: string) =>
          selector === 'cx-breadcrumb nav a' ? mockAnchor : null,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);

      expect(mockAnchor.focus).toHaveBeenCalled();
      expect(skipLinkService.scrollToTarget).not.toHaveBeenCalled();
    });

    it('should fall back to scrollToTarget cx-main when toggle is on but no breadcrumb is present', () => {
      spyOn(skipLinkService, 'scrollToTarget');
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
});
