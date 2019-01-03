import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NavigationService } from '../navigation/navigation.service';
import { CmsService } from '@spartacus/core';
import { NavigationComponent } from '..';
import { FooterNavigationComponent } from './footer-navigation.component';
import { of } from 'rxjs';
import { CmsComponentData } from '../../cms';

@Component({
  selector: 'cx-navigation-ui',
  template: ''
})
class MockNavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node;
}
describe('FooterNavigationComponent', () => {
  let component: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;
  let footer: DebugElement;
  let column: DebugElement;

  const mockLinks = [
    {
      title: 'Test child 1',
      url: '/test1',
      target: true
    },
    {
      title: 'Test child 2',
      url: '/',
      target: false
    }
  ];

  const mockCmsComponentData = {
    data$: of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        FooterNavigationComponent,
        NavigationComponent,
        MockNavigationUIComponent
      ],
      providers: [
        NavigationService,
        { provide: CmsService, useValue: {} },
        { provide: NavigationService, useValue: {} },
        { provide: CmsComponentData, useValue: mockCmsComponentData }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNavigationComponent);
    component = fixture.componentInstance;
    component.node$ = of({
      children: [
        {
          title: 'Test 1',
          url: '/',
          children: mockLinks
        }
      ]
    });

    fixture.detectChanges();
  });

  it('should create FooterNavigationComponent in CmsLib', () => {
    expect(component).toBeTruthy();
  });

  describe('UI tests', () => {
    beforeAll(() => {
      footer = fixture.debugElement;
      column = footer.query(By.css('.cx-footer-navigation__container'));
    });

    it('should display the column title', () => {
      const titleElement: HTMLElement = column.query(
        By.css('.cx-footer-navigation__title')
      ).nativeElement;

      expect(titleElement.textContent).toEqual('Test 1');
    });

    it('should display the correct number of links', () => {
      const list: HTMLElement = column.query(
        By.css('.cx-footer-navigation__list')
      ).nativeElement;

      expect(list.childElementCount).toBe(2);
    });

    it('should display link title with correct url', () => {
      const link: HTMLElement = column.query(
        By.css('.cx-footer-navigation__link')
      ).nativeElement;

      expect(link.textContent).toEqual(mockLinks[0].title);
      expect(link.getAttribute('href')).toEqual(mockLinks[0].url);
    });

    it('should have the correct target', () => {
      const link1: HTMLElement = column.queryAll(
        By.css('.cx-footer-navigation__link')
      )[0].nativeElement;
      const link2: HTMLElement = column.queryAll(
        By.css('.cx-footer-navigation__link')
      )[1].nativeElement;

      expect(link1.getAttribute('target')).toEqual('blank');
      expect(link2.getAttribute('target')).toEqual('self');
    });
  });
});
