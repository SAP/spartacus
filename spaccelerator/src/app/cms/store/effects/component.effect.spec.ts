import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccCmsService } from '../../services/occ-cms.service';
import { ConfigService } from '../../config.service';
import * as fromEffects from './component.effect';
import * as fromActions from '../actions/component.action';

import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCmsReducer from '../../../cms/store/reducers';

import { PageType } from '../../../routing/models/page-context.model';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Component Effects', () => {
  let store: Store<fromRoot.State>;
  let actions$: TestActions;
  let service: OccCmsService;
  let effects: fromEffects.ComponentEffects;

  const component: any = { uid: 'comp1', typeCode: 'SimpleBannerComponent' };

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
        fromEffects.ComponentEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    store = TestBed.get(Store);
    actions$ = TestBed.get(Actions);
    service = TestBed.get(OccCmsService);
    effects = TestBed.get(fromEffects.ComponentEffects);

    spyOn(service, 'loadComponent').and.returnValue(of(component));
  });

  describe('loadComponent$', () => {
    it('should return a component from LoadComponentSuccess', () => {
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

      const action = new fromActions.LoadComponent('comp1');
      const completion = new fromActions.LoadComponentSuccess(component);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadComponent$).toBeObservable(expected);
    });
  });
});
