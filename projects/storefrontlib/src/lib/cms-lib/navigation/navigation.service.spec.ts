import { TestBed, inject } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

import { CmsService, CmsNavigationComponent } from '@spartacus/core';
import { NavigationService } from './navigation.service';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';

const itemsData: any = {
  MockLink001_AbstractCMSComponent: {
    uid: 'MockLink001',
    url: '/testLink1',
    linkName: 'test link 1',
    target: false
  },
  MockLink002_AbstractCMSComponent: {
    uid: 'MockLink002',
    url: '/testLink2',
    linkName: 'test link 2',
    target: true
  }
};

const componentData: CmsNavigationComponent = {
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

const mappedComponentData: any[] = [
  {
    superType: 'AbstractCMSComponent',
    id: 'MockLink001'
  },
  {
    superType: 'AbstractCMSComponent',
    id: 'MockLink002'
  }
];

const componentDataMock = { data$: of({}) };
const componentData$ = new BehaviorSubject(componentData);

const resultNode: any = {
  children: [
    { title: 'test link 1', url: '/testLink1', target: false },
    { title: 'test link 2', url: '/testLink2', target: true }
  ]
};
describe('NavigationService', () => {
  let navigationService: NavigationService;
  let mockCmsService: any;

  beforeEach(() => {
    mockCmsService = {
      loadNavigationItems: createSpy(),
      getNavigationEntryItems: createSpy().and.returnValue(of(undefined)),
      getComponentData: createSpy().and.returnValue(of(componentData))
    };
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: CmsService, useValue: mockCmsService },
        { provide: CmsComponentData, useValue: componentDataMock }
      ]
    });

    navigationService = TestBed.get(NavigationService);
  });

  it('should inject NavigationService', inject(
    [NavigationService],
    (service: NavigationService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('getNavigationEntryItems', () => {
    it('should get all navigation entry items', () => {
      navigationService.getNavigationEntryItems(
        componentData.navigationNode,
        true
      );
      expect(mockCmsService.loadNavigationItems).toHaveBeenCalledWith(
        'MockNavigationNode001',
        mappedComponentData
      );
    });
  });

  describe('createNode', () => {
    it('should create a new node tree for display', () => {
      const node = navigationService.createNode(
        componentData.navigationNode,
        itemsData
      );
      expect(node['children']).toEqual(resultNode.children);
    });
  });

  it('should return component data stream', () => {
    return expect(navigationService.getComponentData()).toBe(
      componentDataMock.data$
    );
  });

  it('should able to get navigation entry item data even if they are not exist', () => {
    spyOn(navigationService, 'getComponentData').and.returnValue(
      componentData$
    );
    spyOn(navigationService, 'getNavigationEntryItems').and.returnValue(
      undefined
    );
    spyOn(navigationService, 'createNode').and.callThrough();
    navigationService.getNodes().subscribe();

    expect(navigationService.getComponentData).toHaveBeenCalled();
    expect(mockCmsService.getNavigationEntryItems).toHaveBeenCalledWith(
      componentData.navigationNode.uid
    );
    expect(navigationService.getNavigationEntryItems).toHaveBeenCalledWith(
      componentData.navigationNode,
      true,
      []
    );
    expect(navigationService.createNode).not.toHaveBeenCalled();
  });

  it('should able to create node data from the existing entry items', () => {
    spyOn(navigationService, 'getComponentData').and.returnValue(
      componentData$
    );
    mockCmsService.getNavigationEntryItems.and.returnValue(of(itemsData));
    spyOn(navigationService, 'getNavigationEntryItems').and.callThrough();
    spyOn(navigationService, 'createNode').and.callThrough();
    navigationService.getNodes().subscribe();

    expect(navigationService.getComponentData).toHaveBeenCalled();
    expect(mockCmsService.getNavigationEntryItems).toHaveBeenCalledWith(
      componentData.navigationNode.uid
    );
    expect(navigationService.getNavigationEntryItems).not.toHaveBeenCalled();
    expect(navigationService.createNode).toHaveBeenCalledWith(
      componentData.navigationNode,
      itemsData
    );
  });
});
