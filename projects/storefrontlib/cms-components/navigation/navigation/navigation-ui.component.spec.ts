import { Component, DebugElement, ElementRef, Input } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FeatureConfigService,
  I18nTestingModule,
  WindowRef,
} from '@spartacus/core';
import { BreakpointService } from 'projects/storefrontlib/layout';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { of } from 'rxjs';
import { HamburgerMenuService } from './../../../layout/header/hamburger-menu/hamburger-menu.service';
import { NavigationNode } from './navigation-node.model';
import { NavigationUIComponent } from './navigation-ui.component';

@Component({
  selector: 'cx-icon',
  template: '',
  standalone: false,
})
class MockIconComponent {
  @Input() type: string;
}

@Component({
  selector: 'cx-generic-link',
  template: '<a href={{url}}>{{title}}</a>',
  standalone: false,
})
class MockGenericLinkComponent {
  @Input() url: string | any[];
  @Input() target: string;
  @Input() title: string;
}

class MockHamburgerMenuService {
  isExpanded = of(true);
  toggle(_forceCollapse?: boolean): void {}
}

// TODO: (CXSPA-5919) Remove mock next major release
class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

class MockBreakpointService {
  isUp() {
    return of(true);
  }
}

const mockWinRef: WindowRef = {
  nativeWindow: {
    location: { href: '/sub-sub-child-1a' },
  },
} as WindowRef;

const childLength = 9;

const mockNode: NavigationNode = {
  title: 'test',
  children: [
    {
      title: 'Root 1',
      url: '/root-1',
      children: [
        {
          title: 'Child 1',
          children: [
            {
              title: 'Sub child 1',
              children: [
                {
                  title: 'Sub sub child 1a',
                  url: '/sub-sub-child-1a',
                },
                {
                  title: 'Sub sub child 1b',
                  url: '/sub-sub-child-1b',
                },
                {
                  title: 'Sub sub child 1c',
                  url: '/sub-sub-child-1c',
                },
                {
                  title: 'Sub sub child 1d',
                  url: '/sub-sub-child-1d',
                },
              ],
            },
          ],
        },
        {
          title: 'Child 2',
          url: '/child-2',
        },
      ],
    },
    {
      title: 'Root 2',
      url: '/root-2',
    },
  ],
};

describe('Navigation UI Component', () => {
  let fixture: ComponentFixture<NavigationUIComponent>;
  let navigationComponent: NavigationUIComponent;
  let hamburgerMenuService: HamburgerMenuService;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        NavigationUIComponent,
        MockIconComponent,
        MockGenericLinkComponent,
        // TODO: (CXSPA-5919) Remove feature directive next major
        MockFeatureDirective,
      ],
      providers: [
        {
          provide: HamburgerMenuService,
          useClass: MockHamburgerMenuService,
        },
        {
          provide: WindowRef,
          useValue: mockWinRef,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationUIComponent);
    hamburgerMenuService = TestBed.inject(HamburgerMenuService);
    navigationComponent = fixture.debugElement.componentInstance;
    element = fixture.debugElement;

    navigationComponent.node = mockNode;
    navigationComponent['resetMenuOnClose'] = false;
  });

  describe('calculate columns', () => {
    beforeEach(() => {
      navigationComponent.wrapAfter = 5;
    });

    it('should return 2 for 10', () => {
      expect(navigationComponent.getColumnCount(10)).toEqual(2);
    });

    it('should return 2 for 11', () => {
      expect(navigationComponent.getColumnCount(11)).toEqual(3);
    });

    it('should return 2 for 12', () => {
      console.log(navigationComponent.wrapAfter);
      expect(navigationComponent.getColumnCount(12)).toEqual(3);
    });

    it('should return 3 for 13', () => {
      expect(navigationComponent.getColumnCount(13)).toEqual(3);
    });

    it('should return column count of 3 for 14 items', () => {
      expect(navigationComponent.getColumnCount(14)).toEqual(3);
    });

    it('should return column count of 3 for 15 items', () => {
      expect(navigationComponent.getColumnCount(15)).toEqual(3);
    });
  });

  describe('UI tests', () => {
    it('should be created', () => {
      expect(navigationComponent).toBeTruthy();
    });

    it('should render back button for flyout navigation', () => {
      fixture.detectChanges();
      const backButton: ElementRef = element.query(By.css('.back'));
      const link: HTMLLinkElement = backButton.nativeElement;

      expect(link).toBeDefined();
    });

    it('should not render back button for non-flyout navigation', () => {
      navigationComponent.flyout = false;
      fixture.detectChanges();
      const backButton: ElementRef = element.query(By.css('.back'));

      expect(backButton).toBeFalsy();
    });

    it('should render cx-icon element for a nav node with children in flyout mode', () => {
      fixture.detectChanges();
      const icon: ElementRef = element.query(By.css('button > cx-icon'));
      const link: HTMLLinkElement = icon.nativeElement;

      expect(link).toBeDefined();
    });

    it('should not render cx-icon element for a nav node with children not in flyout mode', () => {
      navigationComponent.flyout = false;
      fixture.detectChanges();
      const icon: ElementRef = element.query(By.css('a > cx-icon'));

      expect(icon).toBeFalsy();
    });

    it('should render all link for root', () => {
      fixture.detectChanges();
      const allLink: ElementRef[] = element.queryAll(
        By.css('nav > ul > li > cx-generic-link')
      );
      expect(allLink.length).toEqual(2);
    });

    it('should render ' + childLength + ' nav elements', () => {
      navigationComponent.flyout = false;
      fixture.detectChanges();
      const nav: ElementRef[] = element.queryAll(By.css('li'));
      expect(nav.length).toEqual(childLength);
    });

    it('should render a tag for nav nodes without a URL', () => {
      fixture.detectChanges();
      const navs: ElementRef[] = element.queryAll(
        By.css('nav > ul > li > button')
      );
      const back: HTMLElement = navs[0].nativeElement;
      const root1: HTMLElement = navs[1].nativeElement;
      expect(navs.length).toBe(2);
      expect(back.innerText).toEqual('common.back');
      expect(root1.innerText).toEqual('');
    });

    it('should render link for nav nodes with a URL', () => {
      fixture.detectChanges();

      const nav: ElementRef = element.query(
        By.css('nav > ul > li > cx-generic-link')
      );
      const el: HTMLElement = nav.nativeElement;
      expect(el).toBeTruthy();
    });

    it('should render a wrapper container for nav nodes with childs', () => {
      fixture.detectChanges();

      const wrapper: ElementRef[] = element.queryAll(By.css('nav .wrapper'));
      expect(wrapper.length).toEqual(3);
    });

    it('should render a childs container for nav nodes with childs', () => {
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs'));
      expect(child.length).toEqual(3);
    });

    it('should render a depth attribute on child containers indicating the depth of the navigation ', () => {
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs'));
      const first: HTMLElement = child[0].nativeElement;
      const second: HTMLElement = child[1].nativeElement;
      const third: HTMLElement = child[2].nativeElement;
      expect(first.attributes.getNamedItem('depth').value).toEqual('3');
      expect(second.attributes.getNamedItem('depth').value).toEqual('2');
      expect(third.attributes.getNamedItem('depth').value).toEqual('1');
    });

    it('should render child element in the childs container for nav nodes with childs', () => {
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs li'));
      expect(child.length).toEqual(7);
    });

    it('should reinitialize menu, when menu is expanded', () => {
      navigationComponent['resetMenuOnClose'] = true;
      spyOn(navigationComponent, 'reinitializeMenu').and.stub();
      fixture.detectChanges();
      expect(navigationComponent.reinitializeMenu).toHaveBeenCalled();
    });

    it('should NOT reinitialize menu, when menu is expanded if config is false', () => {
      spyOn(navigationComponent, 'reinitializeMenu').and.stub();
      fixture.detectChanges();
      expect(navigationComponent.reinitializeMenu).not.toHaveBeenCalled();
    });

    it('should close hamburger and every LI element when click on link to current route', () => {
      spyOn(navigationComponent, 'closeIfClickedTheSameLink').and.callThrough();
      spyOn(navigationComponent, 'reinitializeMenu').and.callThrough();
      spyOn(hamburgerMenuService, 'toggle').and.stub();
      fixture.detectChanges();

      element
        .query(By.css('nav > ul > li:nth-child(2) > button'))
        .nativeElement.click();
      element
        .query(By.css('button[aria-controls="child-1"]'))
        .nativeElement.click();
      element
        .query(By.css('button[aria-controls="sub-child-1"]'))
        .nativeElement.click();

      expect(element.queryAll(By.css('li.is-open:not(.back)')).length).toBe(1);
      expect(element.queryAll(By.css('li.is-opened')).length).toBe(2);

      element
        .query(By.css('cx-generic-link[ng-reflect-url="/sub-sub-child-1a"]'))
        .nativeElement.click();
      expect(
        navigationComponent.closeIfClickedTheSameLink
      ).toHaveBeenCalledWith({
        title: 'Sub sub child 1a',
        url: '/sub-sub-child-1a',
      });
      expect(element.queryAll(By.css('li.is-open:not(.back)')).length).toBe(0);
      expect(element.queryAll(By.css('li.is-opened')).length).toBe(0);

      expect(navigationComponent.reinitializeMenu).toHaveBeenCalledWith();
      expect(hamburgerMenuService.toggle).toHaveBeenCalledWith();
    });

    it('should remove topmost semantic list roles for non-flyout navigation', () => {
      navigationComponent.flyout = false;
      fixture.detectChanges();
      const firstListElement: HTMLElement = element.query(
        By.css('ul')
      ).nativeElement;
      const secondListElement: HTMLElement = element.query(
        By.css('[depth="1"]')
      ).nativeElement;

      expect(firstListElement.getAttribute('role')).toBe('presentation');
      Array.from(firstListElement.children).forEach((child) => {
        expect(child.getAttribute('role')).toBe('presentation');
      });

      Array.from(secondListElement.children).forEach((child) => {
        expect(child.getAttribute('role')).toBe('listitem');
      });
    });

    it('should apply role="heading" to nested dropdown trigger button while on desktop', () => {
      fixture.detectChanges();
      const nestedTriggerButton = fixture.debugElement.query(
        By.css('button[aria-controls="child-1"]')
      ).nativeElement;
      const rootTriggerButton = fixture.debugElement.query(
        By.css('button[aria-controls="root-1"]')
      ).nativeElement;

      expect(nestedTriggerButton.getAttribute('role')).toEqual('heading');
      expect(rootTriggerButton.getAttribute('role')).toEqual('button');
    });
  });

  describe('Keyboard navigation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should toggle open when space key is pressed', () => {
      const spy = spyOn(navigationComponent, 'toggleOpen');
      const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
      const dropDownButton = element.query(
        By.css('button[aria-controls="sub-child-1"]')
      ).nativeElement;
      Object.defineProperty(spaceEvent, 'target', { value: dropDownButton });

      navigationComponent.onSpace(spaceEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should move focus to the opened node', () => {
      const firstChild = element.query(By.css('[href="/sub-sub-child-1a"]'));
      const spy = spyOn(firstChild.nativeElement, 'focus');
      const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
      const dropDownButton = element.query(
        By.css('button[aria-controls="sub-child-1"]')
      ).nativeElement;
      Object.defineProperty(spaceEvent, 'target', { value: dropDownButton });

      navigationComponent.focusOnNode(spaceEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should move focus inside node on up/down arrow press', () => {
      navigationComponent.toggleOpen = () => {};
      const firstChild = element.query(By.css('[href="/sub-sub-child-1a"]'));
      const secondChild = element.query(By.css('[href="/sub-sub-child-1b"]'));
      const arrowDownEvent = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });
      const arrowUpEvent = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });
      const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
      const dropDownButton = element.query(
        By.css('button[aria-controls="sub-child-1"]')
      ).nativeElement;
      Object.defineProperty(spaceEvent, 'target', { value: dropDownButton });
      Object.defineProperty(arrowDownEvent, 'target', {
        value: firstChild.nativeElement,
      });
      Object.defineProperty(arrowUpEvent, 'target', {
        value: secondChild.nativeElement,
      });

      navigationComponent.onSpace(spaceEvent);

      navigationComponent['arrowControls'].next(arrowDownEvent);
      expect(document.activeElement).toEqual(secondChild.nativeElement);
      navigationComponent['arrowControls'].next(arrowUpEvent);
      expect(document.activeElement).toEqual(firstChild.nativeElement);
    });

    it('should restore default tabbing order for non flyout navigation', () => {
      const childNode = {
        title: 'Child',
        url: '/child',
      };
      navigationComponent.flyout = true;
      expect(navigationComponent.getTabIndex(childNode, 1)).toEqual(-1);

      navigationComponent.flyout = false;
      expect(navigationComponent.getTabIndex(childNode, 1)).toEqual(0);
    });

    it('return focus to node header after navigating back', fakeAsync(() => {
      const mockNode = document.createElement('li');
      const mockHeader = document.createElement('a');
      mockHeader.setAttribute('aria-haspopup', 'true');
      mockNode.appendChild(mockHeader);
      navigationComponent['openNodes'] = [mockNode];
      spyOn(mockHeader, 'focus');

      navigationComponent.back();
      tick();

      expect(mockHeader.focus).toHaveBeenCalled();
    }));
  });

  describe('trigger buttions ariaLabel/title', () => {
    it('should have the ariaLabel and title set', () => {
      const rootNode = mockNode.children?.[0];
      const childNode = rootNode?.children?.[0];
      const rootTitle = rootNode?.title;
      const childTitle = childNode?.title;
      const sanitizedRootTitle =
        navigationComponent.getSanitizedTitle(rootTitle);
      const sanitizedChildTitle =
        navigationComponent.getSanitizedTitle(childTitle);

      fixture.detectChanges();
      const nestedTriggerButton = fixture.debugElement.query(
        By.css(`button[aria-label="${sanitizedRootTitle}"]`)
      ).nativeElement;
      const rootTriggerButton = fixture.debugElement.query(
        By.css(`button[aria-label="${sanitizedChildTitle}"]`)
      ).nativeElement;

      expect(nestedTriggerButton).toBeDefined();
      expect(rootTriggerButton).toBeDefined();
    });
  });
});
