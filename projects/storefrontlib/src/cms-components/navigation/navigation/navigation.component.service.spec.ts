import { inject, TestBed } from '@angular/core/testing';
import { CmsNavigationComponent, CmsService } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { NavigationNode } from './navigation-node.model';
import { NavigationComponentService } from './navigation.component.service';
import createSpy = jasmine.createSpy;

const itemsData: any = {
  MainLink001_AbstractCMSComponent: {
    uid: 'MainLink001',
    url: '/main',
    linkName: 'test link main',
    target: false,
  },
  MockLink001_AbstractCMSComponent: {
    uid: 'MockLink001',
    url: '/testLink1',
    linkName: 'test link 1',
    target: false,
  },
  MockLink002_AbstractCMSComponent: {
    uid: 'MockLink002',
    url: '/testLink2',
    linkName: 'test link 2',
    target: true,
  },
  MockSubLink001_AbstractCMSComponent: {
    uid: 'MockSubLink001',
    url: '/testsubLink1',
    linkName: 'test sub link 1',
    target: true,
  },
};

const componentData: CmsNavigationComponent = {
  uid: 'MockNavigationComponent',
  typeCode: 'NavigationComponent',
  name: 'NavigationComponent name',
  navigationNode: {
    uid: 'MockNavigationNode001',
    entries: [
      {
        itemId: 'MainLink001',
        itemSuperType: 'AbstractCMSComponent',
        itemType: 'CMSLinkComponent',
      },
    ],
    children: [
      {
        uid: 'MockChildNode001',
        entries: [
          {
            itemId: 'MockLink001',
            itemSuperType: 'AbstractCMSComponent',
            itemType: 'CMSLinkComponent',
          },
        ],
      },
      {
        uid: 'MockChildNode002',
        entries: [
          {
            itemId: 'MockLink002',
            itemSuperType: 'AbstractCMSComponent',
            itemType: 'CMSLinkComponent',
          },
        ],
        children: [
          {
            uid: 'MockSubChildNode001',
            entries: [
              {
                itemId: 'MockSubLink001',
                itemSuperType: 'AbstractCMSComponent',
                itemType: 'CMSLinkComponent',
              },
            ],
          },
        ],
      },
    ],
  },
};

const componentDataMock = { data$: of(componentData) };

describe('NavigationComponentService', () => {
  let navigationService: NavigationComponentService;
  let mockCmsService: any;

  beforeEach(() => {
    mockCmsService = {
      loadNavigationItems: createSpy(),
      getNavigationEntryItems: createSpy().and.returnValue(of(undefined)),
      getComponentData: createSpy().and.returnValue(of(componentData)),
    };
    TestBed.configureTestingModule({
      providers: [
        NavigationComponentService,
        { provide: CmsService, useValue: mockCmsService },
        { provide: CmsComponentData, useValue: componentDataMock },
      ],
    });

    navigationService = TestBed.get(NavigationComponentService);
  });

  it('should inject NavigationComponentService', inject(
    [NavigationComponentService],
    (service: NavigationComponentService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should return component data stream', () => {
    return expect(navigationService.getComponentData()).toBe(
      componentDataMock.data$
    );
  });

  it('should get main link for root entry based on CMS data', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(of(itemsData));

    let result: NavigationNode;
    navigationService.getNavigationNode().subscribe(node => (result = node));

    expect(result.url).toEqual('/main');
  });

  it('should get navigation node based on CMS data', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(of(itemsData));

    let result: NavigationNode;
    navigationService.getNavigationNode().subscribe(node => (result = node));

    expect(result.children.length).toEqual(2);
    expect(result.children[0].title).toEqual('test link 1');
    expect(result.children[1].url).toEqual('/testLink2');
  });

  it('should create a virtual navigation root', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(of(itemsData));

    let result: NavigationNode;
    navigationService.createNavigation().subscribe(node => (result = node));

    expect(result.title).toEqual('NavigationComponent name');
    expect(result.children.length).toEqual(1);
    expect(result.children[0].children.length).toEqual(2);
  });
});
