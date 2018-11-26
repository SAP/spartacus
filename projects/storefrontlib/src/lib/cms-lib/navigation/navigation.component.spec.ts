import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as NgrxStore from '@ngrx/store';
import { of } from 'rxjs';
import * as fromCmsReducer from '../../cms/store/reducers';
import { NavigationComponent } from './navigation.component';
import { NavigationUIComponent } from './navigation-ui.component';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from './navigation.service';
import { CmsService } from '../../cms/facade/cms.service';
import { By } from '@angular/platform-browser';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponents: {
    CMSNavigationComponent: { selector: 'NavigationComponent' }
  }
};

describe('CmsNavigationComponent in CmsLib', () => {
  let navigationComponent: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  const itemsData = {
    MockLink001_AbstractCMSComponent: {
      uid: 'MockLink001',
      link: 'testLink1',
      linkName: 'test link 1'
    },
    MockLink002_AbstractCMSComponent: {
      uid: 'MockLink002',
      link: 'testLink2',
      linkName: 'test link 2'
    }
  };

  const componentData = {
    uid: 'MockNavigationComponent',
    typeCode: 'NavigationComponent',
    navigationNode: {
      uid: 'MockNavigationNode001',
      children: [
        {
          uid: 'MockChildNode001',
          entries: [
            {
              itemId: 'MockLink001',
              itemSuperType: 'AbstractCMSComponent',
              itemType: 'CMSLinkComponent'
            }
          ]
        },
        {
          uid: 'MockChildNode002',
          entries: [
            {
              itemId: 'MockLink002',
              itemSuperType: 'AbstractCMSComponent',
              itemType: 'CMSLinkComponent'
            }
          ]
        }
      ]
    }
  };

  const MockCmsService = {
    getComponentData: () => of(componentData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgrxStore.StoreModule.forRoot({}),
        NgrxStore.StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        RouterTestingModule
      ],
      providers: [
        NavigationService,
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig }
      ],
      declarations: [NavigationComponent, NavigationUIComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    navigationComponent = fixture.componentInstance;

    spyOnProperty(NgrxStore, 'select').and.returnValue(() => () =>
      of(itemsData)
    );
  });

  it('should be created', () => {
    expect(navigationComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(navigationComponent.component).toBeNull();
    navigationComponent.onCmsComponentInit(componentData.uid);
    expect(navigationComponent.component).toBe(componentData);
  });

  it('should render navigation-ui component', () => {
    const getNav = () => fixture.debugElement.query(By.css('cx-navigation-ui'));
    navigationComponent.node = {};
    navigationComponent.dropdownMode = 'column';
    fixture.detectChanges();
    const nav = getNav().nativeElement;
    expect(nav).toBeTruthy();
  });
});
