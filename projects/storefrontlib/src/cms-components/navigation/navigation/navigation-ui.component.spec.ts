import { Component, DebugElement, ElementRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { NavigationNode } from './navigation-node.model';
import { NavigationUIComponent } from './navigation-ui.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input() type: string;
}

@Component({
  selector: 'cx-generic-link',
  template: '',
})
class MockGenericLinkComponent {
  @Input() url: string | any[];
  @Input() target: string;
  @Input() title: string;
}

const mockNode: NavigationNode = {
  title: 'test',
  children: [
    {
      title: 'Root 1',
      children: [
        {
          title: 'Child 1',
          url: '/child-1',
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
  let element: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        NavigationUIComponent,
        MockIconComponent,
        MockGenericLinkComponent,
      ],
      providers: [],
    }).compileComponents();
  });

  describe('UI tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NavigationUIComponent);
      navigationComponent = fixture.debugElement.componentInstance;
      element = fixture.debugElement;

      navigationComponent.node = mockNode;
    });

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
      const icon: ElementRef = element.query(By.css('h5 > cx-icon'));
      const link: HTMLLinkElement = icon.nativeElement;

      expect(link).toBeDefined();
    });

    it('should not render cx-icon element for a nav node with children not in flyout mode', () => {
      navigationComponent.flyout = false;
      fixture.detectChanges();
      const icon: ElementRef = element.query(By.css('h5 > cx-icon'));

      expect(icon).toBeFalsy();
    });

    it('should render 4 nav elements', () => {
      fixture.detectChanges();
      const nav: ElementRef[] = element.queryAll(By.css('nav'));
      expect(nav.length).toEqual(4);
    });

    it('should render 2 root nav elements', () => {
      fixture.detectChanges();
      // mmm... no `> nav` available in By.css
      let rootNavElementCount = 0;
      (<HTMLElement>element.nativeElement).childNodes.forEach(el => {
        if (el.nodeName === 'NAV') {
          rootNavElementCount++;
        }
      });
      expect(rootNavElementCount).toEqual(2);
    });

    it('should render heading for nav nodes without a URL', () => {
      fixture.detectChanges();

      const nav: ElementRef = element.query(By.css('nav > h5'));
      const el: HTMLElement = nav.nativeElement;
      expect(el.innerText).toEqual('Root 1');
    });

    it('should render link for nav nodes with a URL', () => {
      fixture.detectChanges();

      const nav: ElementRef = element.query(By.css('nav > cx-generic-link'));
      const el: HTMLElement = nav.nativeElement;
      expect(el).toBeTruthy();
    });

    it('should render a wrapper container for nav nodes with childs', () => {
      fixture.detectChanges();

      const wrapper: ElementRef[] = element.queryAll(By.css('nav .wrapper'));
      expect(wrapper.length).toEqual(1);
    });

    it('should render a childs container for nav nodes with childs', () => {
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs'));
      expect(child.length).toEqual(1);
    });

    it('should render a depth attribute on child containers indicating the depth of the navigation ', () => {
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs'));
      const el: HTMLElement = child[0].nativeElement;
      expect(el.attributes.getNamedItem('depth').value).toEqual('1');
    });

    it('should render two child element in the childs container for nav nodes with childs', () => {
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs nav'));
      expect(child.length).toEqual(2);
    });
  });
});
