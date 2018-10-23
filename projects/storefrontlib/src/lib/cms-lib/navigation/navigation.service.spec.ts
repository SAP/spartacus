import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../routing/store';
import * as fromCmsStore from '../../cms/store';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let navigationService: NavigationService;
  let store: Store<fromCmsStore.CmsState>;

  const itemsData = {
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

  const resultNode = {
    children: [
      { title: 'test link 1', url: '/testLink1', target: false },
      { title: 'test link 2', url: '/testLink2', target: true }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromCmsStore.getReducers())
        })
      ],
      providers: [NavigationService]
    });

    store = TestBed.get(Store);
    navigationService = TestBed.get(NavigationService);

    spyOn(store, 'dispatch').and.callThrough();
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
        true,
        []
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCmsStore.LoadNavigationItems({
          nodeId: 'MockNavigationNode001',
          items: [
            {
              superType: 'AbstractCMSComponent',
              id: 'MockLink001'
            },
            {
              superType: 'AbstractCMSComponent',
              id: 'MockLink002'
            }
          ]
        })
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
