import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable ,  EMPTY ,  of } from 'rxjs';

import { OccCmsService } from '../../services/occ-cms.service';
import { ConfigService } from '../../config.service';
import * as fromEffects from './navigation-entry-item.effect';
import * as fromActions from '../actions/navigation-entry-item.action';

import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCmsReducer from '../../../cms/store/reducers';

import { PageType } from '../../../routing/models/page-context.model';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Navigation Entry Items Effects', () => {
  let store: Store<fromRoot.State>;
  let actions$: TestActions;
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
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cms: combineReducers(fromCmsReducer.reducers)
        })
      ],
      providers: [
        OccCmsService,
        ConfigService,
        fromEffects.NavigationEntryItemEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    store = TestBed.get(Store);
    actions$ = TestBed.get(Actions);
    service = TestBed.get(OccCmsService);
    effects = TestBed.get(fromEffects.NavigationEntryItemEffects);

    spyOn(service, 'loadListComponents').and.returnValue(of(listComponents));
  });

  describe('loadNavigationItems$', () => {
    it('should return list of components from LoadNavigationItemsSuccess', () => {
      const router = {
        state: {
          url: '/',
          queryParams: {},
          params: {},
          context: { id: '1', type: PageType.PRODUCT_PAGE },
          cmsRequired: false
        }
      };

      spyOn(store, 'select').and.returnValue(of(router));

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

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadNavigationItems$).toBeObservable(expected);
    });
  });
});
