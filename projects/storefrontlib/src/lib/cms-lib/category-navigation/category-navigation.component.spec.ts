import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { NavigationModule } from '../navigation/navigation.module';
import { CategoryNavigationComponent } from './category-navigation.component';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../cms/store/reducers';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { BootstrapModule } from '../../bootstrap.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    CategoryNavigationComponent: 'CategoryNavigationComponent'
  }
};

describe('CategoryNavigationComponent', () => {
  let component: CategoryNavigationComponent;
  let fixture: ComponentFixture<CategoryNavigationComponent>;
  let nav: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NavigationModule,
        BootstrapModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromCmsReducer.getReducers())
        }),
        RouterTestingModule
      ],
      declarations: [CategoryNavigationComponent],
      providers: [{ provide: CmsModuleConfig, useValue: UseCmsModuleConfig }]
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
      const navElem = nav.query(By.css('.y-navigation')).nativeElement;
      expect(navElem.nodeName).toBe('NAV');
    });

    it('should display correct number of submenus', () => {
      const list: HTMLElement = nav.query(By.css('.y-navigation__list'))
        .nativeElement;
      expect(list.childElementCount).toBe(2);
    });
  });
});
