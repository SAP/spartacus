import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CmsComponent, PageType } from '../../../occ/occ-models/index';
import { RoutingService } from '../../../routing/index';
import { CmsComponentLoader } from '../../services/cms-component.loader';
import * as fromActions from '../actions/component.action';
import * as fromEffects from './component.effect';

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false,
  },
};

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of(router);
  }
}

class MockCmsComponentLoader {
  get(_uid, _pageContext): Observable<any> {
    return of({});
  }
}

describe('Component Effects', () => {
  let actions$: Observable<any>;
  let service: CmsComponentLoader<any>;
  let effects: fromEffects.ComponentEffects;

  const component: CmsComponent = {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: CmsComponentLoader, useClass: MockCmsComponentLoader },
        fromEffects.ComponentEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    });

    service = TestBed.get(CmsComponentLoader);
    effects = TestBed.get(fromEffects.ComponentEffects);
  });

  describe('loadComponent$', () => {
    it('should return a component from LoadComponentSuccess', () => {
      const action = new fromActions.LoadComponent('comp1');
      const completion = new fromActions.LoadComponentSuccess(component);
      spyOn(service, 'get').and.returnValue(of(component));

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadComponent$).toBeObservable(expected);
    });

    it('should process only one ongoing request for multiple load component dispatches for the same uid', () => {
      const action = new fromActions.LoadComponent('comp1');
      const completion = new fromActions.LoadComponentSuccess(component);
      spyOn(service, 'get').and.returnValue(cold('---c', { c: component }));

      actions$ = hot('-aaa------a', { a: action });
      const expected = cold('------b------b', { b: completion });

      expect(effects.loadComponent$).toBeObservable(expected);
    });
  });
});
