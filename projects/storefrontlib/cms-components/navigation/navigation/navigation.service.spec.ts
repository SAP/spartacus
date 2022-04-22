import { TestBed } from '@angular/core/testing';
import {
  CmsNavigationComponent,
  CmsService,
  NodeItem,
  SemanticPathService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { NavigationNode } from './navigation-node.model';
import { NavigationService } from './navigation.service';
import createSpy = jasmine.createSpy;

const navigationEntryItems: any = {
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
  MockLink003_AbstractCMSComponent: {
    uid: 'MockLink003',
  },
  MockLink004_AbstractCMSComponent: {
    uid: 'MockLink004',
    linkName: 'test link 4',
    categoryCode: '444',
    name: 'name 4',
  },
  MockSubLink001_AbstractCMSComponent: {
    uid: 'MockSubLink001',
    url: '/testsubLink1',
    linkName: 'test sub link 1',
    target: true,
  },
  MockLink005_AbstractCMSComponent: {
    uid: 'MockLink005',
    contentPageLabelOrId: '/faq',
    linkName: 'content page link',
    target: true,
  },
  MockLink006_AbstractCMSComponent: {
    uid: 'MockLink006',
    productCode: '478828',
    linkName: 'product page link',
    name: 'product page link',
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
      {
        uid: 'MockChildNode003',
        entries: [
          {
            itemId: 'MockLink003',
            itemSuperType: 'AbstractCMSComponent',
            itemType: 'CMSLinkComponent',
          },
        ],
      },
      {
        uid: 'MockChildNode004',
        entries: [
          {
            itemId: 'MockLink004',
            itemSuperType: 'AbstractCMSComponent',
            itemType: 'CMSLinkComponent',
          },
        ],
      },
      {
        uid: 'MockChildNode005',
        entries: [
          {
            itemId: 'MockLink005',
            itemSuperType: 'AbstractCMSComponent',
            itemType: 'CMSLinkComponent',
          },
        ],
      },
      {
        uid: 'MockChildNode006',
        entries: [
          {
            itemId: 'MockLink006',
            itemSuperType: 'AbstractCMSComponent',
            itemType: 'CMSLinkComponent',
          },
        ],
      },
    ],
  },
};

class MockSemanticPathService {
  transform(commands: any) {
    return [commands.cxRoute, commands.params.code, commands.params.name];
  }
}

describe('NavigationComponentService', () => {
  let navigationService: NavigationService;
  let mockCmsService: any;

  beforeEach(() => {
    mockCmsService = {
      loadNavigationItems: createSpy(),
      getNavigationEntryItems: createSpy().and.returnValue(of(undefined)),
    };
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: CmsService, useValue: mockCmsService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
    });

    navigationService = TestBed.inject(NavigationService);
  });

  it('should inject service', () => {
    expect(navigationService).toBeTruthy();
  });

  it('should get main link for root entry based on CMS data', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    let result: NavigationNode;
    navigationService
      .getNavigationNode(of(componentData))
      .subscribe((node) => (result = node));

    expect(result.url).toEqual('/main');
  });

  it('should not get a URL when no link is provided in the CMS data', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    let result: NavigationNode;
    navigationService
      .getNavigationNode(of(componentData))
      .subscribe((node) => (result = node));

    expect(result.children[2].url).toBeFalsy();
  });

  it('should get a link to a category when categoryCode is provided', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    let result: NavigationNode;
    navigationService
      .getNavigationNode(of(componentData))
      .subscribe((node) => (result = node));

    expect(result.children[3].url).toEqual(['category', '444', 'name 4']);
  });

  it('should get a link to a content page when contentPageLabelOrId is provided', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    let result: NavigationNode;
    navigationService
      .getNavigationNode(of(componentData))
      .subscribe((node) => (result = node));

    expect(result.children[4].url).toEqual('/faq');
  });

  it('should get a link to a product when productCode is provided', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    let result: NavigationNode;
    navigationService
      .getNavigationNode(of(componentData))
      .subscribe((node) => (result = node));

    expect(result.children[5].url).toEqual([
      'product',
      '478828',
      'product page link',
    ]);
  });

  it('should get navigation node based on CMS data', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    let result: NavigationNode;
    navigationService
      .getNavigationNode(of(componentData))
      .subscribe((node) => (result = node));

    expect(result.children.length).toEqual(6);
    expect(result.children[0].title).toEqual('test link 1');
    expect(result.children[1].url).toEqual('/testLink2');
  });

  it('should load the missing navigation nodes for the latest CMS data', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    // add one more child
    componentData.navigationNode.children[4] = {
      uid: 'MockChildNode007',
      entries: [
        {
          itemId: 'MockLink007',
          itemSuperType: 'AbstractCMSComponent',
          itemType: 'CMSLinkComponent',
        },
      ],
    };

    navigationService.getNavigationNode(of(componentData)).subscribe();
    expect(mockCmsService.loadNavigationItems).toHaveBeenCalledWith(
      'MockNavigationNode001',
      [{ superType: 'AbstractCMSComponent', id: 'MockLink007' }]
    );
  });

  it('should create a virtual navigation root', () => {
    mockCmsService.getNavigationEntryItems.and.returnValue(
      of(navigationEntryItems)
    );

    let result: NavigationNode;
    navigationService
      .createNavigation(of(componentData))
      .subscribe((node) => (result = node));

    expect(result.title).toEqual('NavigationComponent name');
    expect(result.children.length).toEqual(1);
    expect(result.children[0].children.length).toEqual(5);
  });

  describe('populate nodes', () => {
    it('should populate node with title', () => {
      mockCmsService.getNavigationEntryItems.and.returnValue(of({}));

      let result: NavigationNode;
      navigationService
        .getNavigationNode(
          of({
            navigationNode: {
              uid: 'MockNavigationNode001',
              title: 'root node',
            },
          } as NodeItem)
        )
        .subscribe((node) => (result = node));

      expect(result.title).toEqual('root node');
    });

    it('should not populate empty node', () => {
      mockCmsService.getNavigationEntryItems.and.returnValue(of({}));

      let result: NavigationNode;
      navigationService
        .getNavigationNode(
          of({
            navigationNode: {
              uid: 'MockNavigationNode001',
            },
          } as NodeItem)
        )
        .subscribe((node) => (result = node));

      expect(result).toBeFalsy();
    });

    it('should populate node with entry linkName', () => {
      mockCmsService.getNavigationEntryItems.and.returnValue(
        of({
          Id_Super: {
            linkName: 'entry linkName',
            url: '/main',
            target: false,
          },
        } as NodeItem)
      );

      let result: NavigationNode;
      navigationService
        .getNavigationNode(
          of({
            navigationNode: {
              uid: 'MockNavigationNode001',
              entries: [
                {
                  itemId: 'Id',
                  itemSuperType: 'Super',
                  itemType: 'CMSLinkComponent',
                },
              ],
            },
          })
        )
        .subscribe((node) => (result = node));

      expect(result).toBeTruthy();
      expect(result.title).toEqual('entry linkName');
    });

    it('should not populate empty child nodes', () => {
      mockCmsService.getNavigationEntryItems.and.returnValue(of({}));

      let result: NavigationNode;
      navigationService
        .getNavigationNode(
          of({
            navigationNode: {
              uid: 'MockNavigationNode001',
              title: 'root node',
              children: [
                {
                  uid: 'MockChildNode001',
                },
              ],
            },
          })
        )
        .subscribe((node) => (result = node));

      expect(result.children).toBeFalsy();
    });

    describe('styling', () => {
      describe('root navigation', () => {
        it('should populate style class', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(of({}));

          let result: NavigationNode;
          navigationService
            .getNavigationNode(
              of({
                navigationNode: {
                  uid: 'MockNavigationNode001',
                  title: 'root node',
                  styleClasses: 'first-cls',
                },
              } as CmsNavigationComponent)
            )
            .subscribe((node) => (result = node));
          expect(result.styleClasses).toEqual('first-cls');
        });

        it('should not populate style class', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(of({}));

          let result: NavigationNode;
          navigationService
            .getNavigationNode(
              of({
                navigationNode: {
                  uid: 'MockNavigationNode001',
                  title: 'root node',
                },
              } as CmsNavigationComponent)
            )
            .subscribe((node) => (result = node));
          expect(result.styleClasses).toBeUndefined();
        });

        it('should populate style attributes', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(of({}));

          let result: NavigationNode;
          navigationService
            .getNavigationNode(
              of({
                navigationNode: {
                  uid: 'MockNavigationNode001',
                  title: 'root node',
                  styleAttributes: 'color: red;',
                },
              } as CmsNavigationComponent)
            )
            .subscribe((node) => (result = node));
          expect(result.styleAttributes).toEqual('color: red;');
        });

        it('should populate style attributes', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(of({}));

          let result: NavigationNode;
          navigationService
            .getNavigationNode(
              of({
                navigationNode: {
                  uid: 'MockNavigationNode001',
                  title: 'root node',
                },
              } as CmsNavigationComponent)
            )
            .subscribe((node) => (result = node));
          expect(result.styleAttributes).toBeUndefined();
        });
      });

      describe('child nodes', () => {
        const mockNavNode = {
          navigationNode: {
            uid: 'MockNavigationNode001',
            entries: [
              {
                itemId: 'Id',
                itemSuperType: 'Super',
                itemType: 'CMSLinkComponent',
              },
            ],
          },
        };

        it('should populate style class', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(
            of({
              Id_Super: {
                styleClasses: 'first second',
              },
            } as NodeItem)
          );

          let result: NavigationNode;
          navigationService
            .getNavigationNode(of(mockNavNode))
            .subscribe((node) => (result = node));

          expect(result.styleClasses).toEqual('first second');
        });

        it('should not populate style class', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(
            of({
              Id_Super: {},
            } as NodeItem)
          );

          let result: NavigationNode;
          navigationService
            .getNavigationNode(of(mockNavNode))
            .subscribe((node) => (result = node));
          expect(result.styleClasses).toBeUndefined();
        });

        it('should populate style attributes', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(
            of({
              Id_Super: {
                styleAttributes: 'color: red;',
              },
            } as NodeItem)
          );

          let result: NavigationNode;
          navigationService
            .getNavigationNode(of(mockNavNode))
            .subscribe((node) => (result = node));

          expect(result.styleAttributes).toEqual('color: red;');
        });

        it('should not populate style attributes', () => {
          mockCmsService.getNavigationEntryItems.and.returnValue(
            of({
              Id_Super: {},
            } as NodeItem)
          );

          let result: NavigationNode;
          navigationService
            .getNavigationNode(of(mockNavNode))
            .subscribe((node) => (result = node));
          expect(result.styleAttributes).toBeUndefined();
        });
      });
    });

    describe('target', () => {
      const mockNavigationData = {
        navigationNode: {
          uid: 'MockNavigationNode001',
          title: 'root node',
          entries: [
            {
              itemId: 'Id',
              itemSuperType: 'Super',
              itemType: 'CMSLinkComponent',
            },
          ],
        } as NavigationNode,
      };

      it('should populate _blank target', () => {
        mockCmsService.getNavigationEntryItems.and.returnValue(
          of({
            Id_Super: {
              linkName: 'entry linkName',
              url: '/main',
              target: true,
            },
          })
        );

        let result: NavigationNode;
        navigationService
          .getNavigationNode(of(mockNavigationData))
          .subscribe((node) => (result = node));

        expect(result.target).toEqual('_blank');
      });

      it('should populate _blank target for "true" value', () => {
        mockCmsService.getNavigationEntryItems.and.returnValue(
          of({
            Id_Super: {
              linkName: 'entry linkName',
              url: '/main',
              target: 'true',
            },
          })
        );

        let result: NavigationNode;
        navigationService
          .getNavigationNode(of(mockNavigationData))
          .subscribe((node) => (result = node));

        expect(result.target).toEqual('_blank');
      });

      it('should not populate _blank target', () => {
        mockCmsService.getNavigationEntryItems.and.returnValue(
          of({
            Id_Super: {
              linkName: 'entry linkName',
              url: '/main',
              target: false,
            },
          })
        );

        let result: NavigationNode;
        navigationService
          .getNavigationNode(of(mockNavigationData))
          .subscribe((node) => (result = node));

        expect(result.target).toBeFalsy();
      });

      it('should not populate _blank target for "false" target', () => {
        mockCmsService.getNavigationEntryItems.and.returnValue(
          of({
            Id_Super: {
              linkName: 'entry linkName',
              url: '/main',
              target: 'false',
            },
          })
        );

        let result: NavigationNode;
        navigationService
          .getNavigationNode(of(mockNavigationData))
          .subscribe((node) => (result = node));

        expect(result.target).toBeFalsy();
      });

      it('should not populate target if there is no URL', () => {
        mockCmsService.getNavigationEntryItems.and.returnValue(
          of({
            Id_Super: {
              linkName: 'entry linkName',
              target: true,
            },
          })
        );

        let result: NavigationNode;
        navigationService
          .getNavigationNode(of(mockNavigationData))
          .subscribe((node) => (result = node));

        expect(result.target).toBeFalsy();
      });
    });
  });
});
