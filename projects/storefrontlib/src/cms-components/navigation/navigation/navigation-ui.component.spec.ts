import { Component, DebugElement, ElementRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { NavigationNode } from './navigation-node.model';
import { NavigationUIComponent } from './navigation-ui.component';

const EXP_COL_COUNT_TWO = 2;
const EXP_COL_COUNT_THREE = 3;

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
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
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
  let element: DebugElement;

  beforeEach(() => {
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
  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationUIComponent);
    navigationComponent = fixture.debugElement.componentInstance;
    element = fixture.debugElement;

    navigationComponent.node = mockNode;
  });

  describe('calculate columns', () => {
    beforeEach(() => {
      const NODE_NUMBER = 5;
      navigationComponent.wrapAfter = NODE_NUMBER;
    });

    it('should return 2 for 10', () => {
      const COLUMN_COUNT = 10;
      expect(navigationComponent.getColumnCount(COLUMN_COUNT)).toEqual(
        EXP_COL_COUNT_TWO
      );
    });

    it('should return 2 for 11', () => {
      const COLUMN_COUNT = 11;
      expect(navigationComponent.getColumnCount(COLUMN_COUNT)).toEqual(
        EXP_COL_COUNT_TWO
      );
    });

    it('should return 2 for 12', () => {
      const COLUMN_COUNT = 12;
      expect(navigationComponent.getColumnCount(COLUMN_COUNT)).toEqual(
        EXP_COL_COUNT_TWO
      );
    });

    it('should return 3 for 13', () => {
      const COLUMN_COUNT = 13;
      expect(navigationComponent.getColumnCount(COLUMN_COUNT)).toEqual(
        EXP_COL_COUNT_THREE
      );
    });

    it('should return column count of 3 for 14 items', () => {
      const COLUMN_COUNT = 14;
      expect(navigationComponent.getColumnCount(COLUMN_COUNT)).toEqual(
        EXP_COL_COUNT_THREE
      );
    });

    it('should return column count of 3 for 15 items', () => {
      const COLUMN_COUNT = 15;
      expect(navigationComponent.getColumnCount(COLUMN_COUNT)).toEqual(
        EXP_COL_COUNT_THREE
      );
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

    it('should render all link for root 1', () => {
      fixture.detectChanges();
      const allLink: ElementRef[] = element.queryAll(By.css('.wrapper > .all'));
      expect(allLink.length).toEqual(1);
    });

    it('should render ' + childLength + ' nav elements', () => {
      fixture.detectChanges();
      const nav: ElementRef[] = element.queryAll(By.css('nav'));
      expect(nav.length).toEqual(childLength);
    });

    it('should render 2 root nav elements', () => {
      const EXPECTED_NAV_COUNT = 2;
      fixture.detectChanges();
      // mmm... no `> nav` available in By.css
      let rootNavElementCount = 0;
      (<HTMLElement>element.nativeElement).childNodes.forEach((el) => {
        if (el.nodeName === 'NAV') {
          rootNavElementCount++;
        }
      });
      expect(rootNavElementCount).toEqual(EXPECTED_NAV_COUNT);
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
      const EXPECTED_LENGTH = 3;
      fixture.detectChanges();

      const wrapper: ElementRef[] = element.queryAll(By.css('nav .wrapper'));
      expect(wrapper.length).toEqual(EXPECTED_LENGTH);
    });

    it('should render a childs container for nav nodes with childs', () => {
      const EXPECTED_LENGTH = 3;
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs'));
      expect(child.length).toEqual(EXPECTED_LENGTH);
    });

    it('should render a depth attribute on child containers indicating the depth of the navigation ', () => {
      const CHILD_INDEX = 2;
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(By.css('nav .childs'));
      const first: HTMLElement = child[0].nativeElement;
      const second: HTMLElement = child[1].nativeElement;
      const third: HTMLElement = child[CHILD_INDEX].nativeElement;
      expect(first.attributes.getNamedItem('depth').value).toEqual('3');
      expect(second.attributes.getNamedItem('depth').value).toEqual('2');
      expect(third.attributes.getNamedItem('depth').value).toEqual('1');
    });

    it('should render child element in the childs container for nav nodes with childs', () => {
      const EXPECTED_LENGTH = 7;
      fixture.detectChanges();

      const child: ElementRef[] = element.queryAll(
        By.css('nav div .childs nav')
      );
      expect(child.length).toEqual(EXPECTED_LENGTH);
    });
  });
});
