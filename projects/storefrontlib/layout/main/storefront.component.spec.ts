import { Component, DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureConfigService, RoutingService } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { OutletDirective } from '../../cms-structure';
import { MockFeatureDirective } from '../../shared/test/mock-feature-directive';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { StorefrontComponent } from './storefront.component';
import { SkipLinkService } from '../a11y/skip-link/index';

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

@Directive({
  selector: '[cxOutlet]',
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
}

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        StorefrontComponent,
        MockHeaderComponent,
        MockGlobalMessageComponent,
        MockFooterComponent,
        DynamicSlotComponent,
        MockPageLayoutComponent,
        MockFeatureDirective,
        MockSchemaComponent,
        MockOutletDirective,
      ],
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
          provide: FeatureConfigService,
          useValue: {
            isEnabled: () => true,
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    routingService = TestBed.inject(RoutingService);
    skipLinkService = TestBed.inject(SkipLinkService);
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
      spyOn(component['featureConfigService'], 'isEnabled').and.returnValue(
        true
      );

      const mockDocument = {
        activeElement: document.createElement('button'),
        body: document.createElement('body'),
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);

      expect(skipLinkService.scrollToTarget).toHaveBeenCalledWith('cx-main');
    });

    it('should not call skipLinkService.scrollToTarget when navigation ends and focus is on body', () => {
      spyOn(skipLinkService, 'scrollToTarget');
      spyOn(component['featureConfigService'], 'isEnabled').and.returnValue(
        true
      );
      const body = document.createElement('body');
      const mockDocument = {
        activeElement: body,
        body,
      };
      component['document'] = mockDocument as any;

      component['onNavigation'](false);

      expect(skipLinkService.scrollToTarget).not.toHaveBeenCalled();
    });

    it('should not call skipLinkService.scrollToTarget when feature is disabled', () => {
      spyOn(skipLinkService, 'scrollToTarget');
      spyOn(component['featureConfigService'], 'isEnabled').and.returnValue(
        false
      );

      component['onNavigation'](false);

      expect(skipLinkService.scrollToTarget).not.toHaveBeenCalled();
    });
  });
});
