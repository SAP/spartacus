import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterNavigationComponent } from './footer-navigation.component';
import * as fromCmsReducer from '../../cms/store/reducers';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { NavigationModule } from '../navigation/navigation.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CmsService } from '../../cms/facade/cms.service';
import { NavigationService } from '../navigation/navigation.service';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponents: {
    FooterNavigationComponent: { selector: 'FooterNavigationComponent' }
  }
};

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

describe('FooterNavigationComponent', () => {
  let footerNavigationComponent: FooterNavigationComponent;
  let fixture: ComponentFixture<FooterNavigationComponent>;
  let footer: DebugElement;
  let column: DebugElement;

  beforeEach(async(() => {
    const mockCmsService = {};
    const mockNavigationService = {};

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        RouterTestingModule,
        NavigationModule
      ],
      declarations: [FooterNavigationComponent],
      providers: [
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig },
        { provide: CmsService, useValue: mockCmsService },
        { provide: NavigationService, useValue: mockNavigationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNavigationComponent);
    footerNavigationComponent = fixture.componentInstance;

    footerNavigationComponent.node = {
      children: [
        {
          title: 'Test 1',
          url: '/',
          children: mockLinks
        }
      ]
    };

    fixture.detectChanges();
  });

  it('should create FooterNavigationComponent in CmsLib', () => {
    expect(footerNavigationComponent).toBeTruthy();
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
