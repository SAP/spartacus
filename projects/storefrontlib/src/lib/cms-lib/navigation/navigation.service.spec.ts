import { TestBed, inject } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

import { CmsService, CmsNavigationComponent } from '@spartacus/core';
import { NavigationService } from './navigation.service';

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
      loadNavigationItems: createSpy()
    };

    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: CmsService, useValue: mockCmsService }
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
        [
          {
            superType: 'AbstractCMSComponent',
            id: 'MockLink001'
          },
          {
            superType: 'AbstractCMSComponent',
            id: 'MockLink002'
          }
        ]
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
});
