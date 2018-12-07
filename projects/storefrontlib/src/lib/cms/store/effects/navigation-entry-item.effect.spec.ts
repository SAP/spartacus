import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { RoutingService, PageType } from '@spartacus/core';
import { OccCmsService } from '../../services/occ-cms.service';
import {
  CmsModuleConfig,
  defaultCmsModuleConfig
} from '../../cms-module-config';
import * as fromEffects from './navigation-entry-item.effect';
import * as fromActions from '../actions/navigation-entry-item.action';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import * as fromCmsReducer from '../../../cms/store/reducers';

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false
  }
};
const mockRoutingService = {
  getRouterState() {
    return of(router);
  }
};
describe('Navigation Entry Items Effects', () => {
  let actions$: Observable<any>;
  let service: OccCmsService;
  let effects: fromEffects.NavigationEntryItemEffects;

  const listComponents: any = {
    component: [
      {
        uid: 'MockLink001',
        url: '/testLink1',
        linkName: 'test link 1',
        target: false
      },
      {
        uid: 'MockLink002',
        url: '/testLink2',
        linkName: 'test link 2',
        target: true
      }
    ],
    pagination: {
      count: 2,
      page: 0,
      totalCount: 2,
      totalPages: 1
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers())
      ],
      providers: [
        OccCmsService,
        { provide: CmsModuleConfig, useValue: defaultCmsModuleConfig },
        fromEffects.NavigationEntryItemEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useValue: mockRoutingService }
      ]
    });

    service = TestBed.get(OccCmsService);
    effects = TestBed.get(fromEffects.NavigationEntryItemEffects);

    spyOn(service, 'loadListComponents').and.returnValue(of(listComponents));
  });

  describe('loadNavigationItems$', () => {
    it('should return list of components from LoadNavigationItemsSuccess', () => {
      const action = new fromActions.LoadNavigationItems({
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
      });
      const completion = new fromActions.LoadNavigationItemsSuccess({
        nodeId: 'MockNavigationNode001',
        components: listComponents.component
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadNavigationItems$).toBeObservable(expected);
    });
  });
});
