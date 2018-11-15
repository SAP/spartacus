import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';
import * as fromCmsReducer from '../../cms/store/reducers';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { BootstrapModule } from '../../bootstrap.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PathPipeService, DynamicPathPipeService } from '@spartacus/core';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    CategoryNavigationComponent: 'CategoryNavigationComponent'
  }
};

const mockPathPipeService = { transform: () => {} };
const mockDynamicPathPipeService = { transform: () => {} };

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;
  let nav: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NavigationModule,
        BootstrapModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        RouterTestingModule
      ],
      declarations: [CategoryNavigationComponent],
      providers: [
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig },
        { provide: PathPipeService, useValue: mockPathPipeService },
        {
          provide: DynamicPathPipeService,
          useValue: mockDynamicPathPipeService
        }
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
