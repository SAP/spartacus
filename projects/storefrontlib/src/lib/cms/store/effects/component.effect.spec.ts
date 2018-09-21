import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccCmsService } from '../../services/occ-cms.service';
import {
  CmsModuleConfig,
  defaultCmsModuleConfig
} from '../../cms-module-config';
import * as fromEffects from './component.effect';
import * as fromActions from '../actions/component.action';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCmsReducer from '../../../cms/store/reducers';

import { PageType } from '../../../routing/models/page-context.model';

describe('Component Effects', () => {
  let store: Store<fromRoot.State>;
  let actions$: Observable<any>;
  let service: OccCmsService;
  let effects: fromEffects.ComponentEffects;

  const component: any = { uid: 'comp1', typeCode: 'SimpleBannerComponent' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromCmsReducer.getReducers())
        })
      ],
      providers: [
        OccCmsService,
        { provide: CmsModuleConfig, useValue: defaultCmsModuleConfig },
        fromEffects.ComponentEffects,
        provideMockActions(() => actions$)
      ]
    });

    store = TestBed.get(Store);
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

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadComponent$).toBeObservable(expected);
    });
  });
});
