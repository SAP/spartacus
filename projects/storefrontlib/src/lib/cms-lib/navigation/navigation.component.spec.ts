import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of, BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';

class MockCmsService {
  getComponentData() {
    return of(null);
  }
  getNavigationEntryItems() {
    return of(undefined);
  }
}

const mockNavigationService = {
  getNavigationEntryItems: createSpy(),
  createNode: createSpy()
};

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

describe('CmsNavigationComponent in CmsLib', () => {
  let navigationComponent: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let cmsService: CmsService;

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

  const componentData$ = new BehaviorSubject(componentData);

  const mockCmsComponentData = {
    data$: componentData$.asObservable()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: CmsService, useClass: MockCmsService },
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: CmsComponentData, useValue: mockCmsComponentData }
      ],
      declarations: [NavigationComponent, MockNavigationUIComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    navigationComponent = fixture.componentInstance;
    cmsService = TestBed.get(CmsService);

    spyOn(cmsService, 'getComponentData').and.returnValue(of(componentData));
  });

  it('should be created', () => {
    expect(navigationComponent).toBeTruthy();
  });

  it('should able to get navigation entry item data even if they are not exist', () => {
    navigationComponent.node$.subscribe();
    expect(mockNavigationService.getNavigationEntryItems).toHaveBeenCalledWith(
      componentData.navigationNode,
      true,
      []
    );
  });

  it('should able to create node data from the existing entry items', () => {
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

    spyOn(cmsService, 'getNavigationEntryItems').and.returnValue(of(itemsData));
    navigationComponent.node$.subscribe();
    componentData$.next(componentData);
    expect(mockNavigationService.createNode).toHaveBeenCalledWith(
      componentData.navigationNode,
      itemsData
    );
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
