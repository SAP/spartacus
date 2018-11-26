import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CategoryNavigationComponent } from './category-navigation.component';
import * as fromCmsReducer from '../../cms/store/reducers';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { BootstrapModule } from '../../bootstrap.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsService } from '../../cms/facade/cms.service';
import { NavigationComponent } from '..';
import { NavigationUIComponent } from '../navigation/navigation-ui.component';
import { NavigationService } from '../navigation/navigation.service';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponents: {
    CategoryNavigationComponent: { selector: 'CategoryNavigationComponent' }
  }
};

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;
  let nav: DebugElement;

  beforeEach(async(() => {
    const mockCmsService = {};
    const mockNavigationService = {};

    TestBed.configureTestingModule({
      imports: [
        BootstrapModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        RouterTestingModule
      ],
      declarations: [
        CategoryNavigationComponent,
        NavigationComponent,
        NavigationUIComponent
      ],
      providers: [
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig },
        { provide: CmsService, useValue: mockCmsService },
        { provide: NavigationService, useValue: mockNavigationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNavigationComponent);
    component = fixture.componentInstance;
    component.node = {
      title: 'test',
      children: [
        {
          title: 'Root 1',
          url: '/',
          children: []
        },
        {
          title: 'Root 2',
          url: '/test',
          children: []
        }
      ]
    };

    fixture.detectChanges();
  });

  it('should create category navigation component in CmsLib', () => {
    expect(component).toBeTruthy();
  });

  describe('UI tests', () => {
    beforeAll(() => {
      nav = fixture.debugElement;
    });

    it('should use semantic nav element', () => {
      const navElem = nav.query(By.css('.cx-navigation')).nativeElement;
      expect(navElem.nodeName).toBe('NAV');
    });

    it('should display correct number of submenus', () => {
      const list: HTMLElement = nav.query(By.css('.cx-navigation__list'))
        .nativeElement;
      expect(list.childElementCount).toBe(2);
    });
  });
});
