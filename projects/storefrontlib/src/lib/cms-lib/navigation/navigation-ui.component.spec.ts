import { TestBed } from '@angular/core/testing';
import { NavigationUIComponent } from './navigation-ui.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Navigation UI Component', () => {
  let fixture;
  let navigationComponent;
  let element;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationUIComponent],
      providers: []
    }).compileComponents();
  });

  describe('UI tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NavigationUIComponent);
      navigationComponent = fixture.debugElement.componentInstance;
      element = fixture.debugElement;
    });

    it('should render "Reorder" if title is missing', () => {
      const mockData = {
        children: []
      };
      navigationComponent.node = mockData;
      fixture.detectChanges();
      const link = element.query(By.css('a')).nativeElement;
      expect(link.textContent).toContain('Reorder');
    });

    it('should render correct title if provided', () => {
      const mockData = {
        title: 'Test 1',
        url: '/test-url',
        children: []
      };
      navigationComponent.node = mockData;
      fixture.detectChanges();
      const link = element.query(By.css('.y-navigation__link')).nativeElement;
      expect(link.textContent).toContain(mockData.title);
      expect(link.getAttribute('role')).toEqual('link');
    });

    it('should render correct title as a link if children are missing', () => {
      const mockData = {
        title: 'Test 1',
        url: '/test-url'
      };
      navigationComponent.node = mockData;
      fixture.detectChanges();
      const link = element.query(By.css('a.y-navigation__link')).nativeElement;
      expect(link.textContent).toContain(mockData.title);
      expect(link.getAttribute('href')).toEqual(mockData.url);
    });

    it('should render children as sublinks', () => {
      const mockData = {
        title: 'Test title',
        children: [
          {
            url: '/subtest',
            title: 'Sublink'
          },
          {
            url: '/subtest2',
            title: 'Sublink2'
          }
        ]
      };
      navigationComponent.node = mockData;
      fixture.detectChanges();

      const dropdown = element.query(By.css('.y-navigation__child-list'))
        .nativeElement;
      expect(dropdown.getAttribute('aria-label')).toEqual(mockData.title);
      expect(dropdown.getAttribute('role')).toEqual('list');
      expect(dropdown.childElementCount).toBe(2);

      const firstDropdownItem = element.query(
        By.css('.y-navigation__child-list')
      ).children[0].nativeElement;
      expect(firstDropdownItem.getAttribute('role')).toEqual('listitem');

      const firstDropdownLink = element.query(
        By.css('.y-navigation__child-list a')
      ).nativeElement;
      expect(firstDropdownLink.textContent).toContain(
        mockData.children[0].title
      );
      expect(firstDropdownLink.getAttribute('href')).toEqual(
        mockData.children[0].url
      );
    });

    it('should render children of children', () => {
      const mockData = {
        title: 'Test title',
        children: [
          {
            url: '/subtest',
            title: 'Sublink',
            children: [
              {
                url: '/subsubtest',
                title: 'Subsubtest'
              },
              {
                url: '/subsubtest2',
                title: 'Subsubtest2'
              }
            ]
          }
        ]
      };
      navigationComponent.node = mockData;
      fixture.detectChanges();

      const firstDropdownItem = element.query(
        By.css('.y-navigation__child-list')
      ).children[0].nativeElement;
      expect(firstDropdownItem.getAttribute('role')).toEqual('listitem');
      console.log('nav', firstDropdownItem);
      const sublinks = element.queryAll(
        By.css('a:not(.y-navigation__child-link)')
      );
      expect(sublinks[0].nativeElement.getAttribute('href')).toEqual(
        mockData.children[0].children[0].url
      );
      expect(sublinks[0].nativeElement.textContent).toContain(
        mockData.children[0].children[0].title
      );
      expect(sublinks[1].nativeElement.getAttribute('href')).toEqual(
        mockData.children[0].children[1].url
      );
      expect(sublinks[1].nativeElement.textContent).toContain(
        mockData.children[0].children[1].title
      );
    });

    it('should render in column layout if dropdownMode equals column', () => {
      const mockData = {
        title: 'Test title',
        children: [
          {
            url: '/subtest',
            title: 'Sublink'
          }
        ]
      };
      navigationComponent.node = mockData;
      navigationComponent.dropdownMode = 'column';
      fixture.detectChanges();

      const firstDropdownItem = element.query(
        By.css('.y-navigation__child-column')
      ).nativeElement;
      expect(firstDropdownItem).toBeTruthy();
    });
  });
});
