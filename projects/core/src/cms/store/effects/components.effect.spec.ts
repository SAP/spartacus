import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { FeatureConfigService } from '@spartacus/core';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CmsComponent, PageType } from '../../../model/cms.model';
import { PageContext, RoutingService } from '../../../routing/index';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { CmsActions } from '../actions/index';
import * as fromEffects from './components.effect';

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

class MockCmsComponentConnector {
  getList(_uid: string, _pageContext: PageContext): Observable<any> {
    return of([]);
  }
}

class MockFeatureConfigService {
  isLevel() {
    return true;
  }
}

describe('Component Effects', () => {
  let actions$: Observable<any>;
  let service: CmsComponentConnector;
  let effects: fromEffects.ComponentsEffects;

  const component: CmsComponent = {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: CmsComponentConnector, useClass: MockCmsComponentConnector },
        fromEffects.ComponentsEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    service = TestBed.inject(CmsComponentConnector);
    effects = TestBed.inject(fromEffects.ComponentsEffects);
  });

  describe('loadComponent$', () => {
    it('should return a component from LoadComponentSuccess', () => {
      const pageContext: PageContext = {
        id: 'xxx',
        type: PageType.CONTENT_PAGE,
      };
      const action = new CmsActions.LoadCmsComponent({
        uid: 'comp1',
        pageContext,
      });
      const completion = new CmsActions.LoadCmsComponentSuccess({
        component,
        uid: action.payload.uid,
        pageContext,
      });
      spyOn(service, 'getList').and.returnValue(of([component]));

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        effects.loadComponent$({ scheduler: getTestScheduler() })
      ).toBeObservable(expected);
    });
    it('should return LoadComponentFail if component is missing in the response', () => {
      const pageContext: PageContext = {
        id: 'xxx',
        type: PageType.CONTENT_PAGE,
      };
      const action = new CmsActions.LoadCmsComponent({
        uid: 'comp1',
        pageContext,
      });
      const completion = new CmsActions.LoadCmsComponentFail({
        uid: action.payload.uid,
        pageContext,
      });
      spyOn(service, 'getList').and.returnValue(of([]));

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        effects.loadComponent$({ scheduler: getTestScheduler() })
      ).toBeObservable(expected);
    });
    describe('when the same page context is present in all the actions', () => {
      it('should group component load in specified time frame', () => {
        const pageContext: PageContext = {
          id: 'xxx',
          type: PageType.CONTENT_PAGE,
        };
        const action1 = new CmsActions.LoadCmsComponent({
          uid: 'comp1',
          pageContext,
        });
        const action2 = new CmsActions.LoadCmsComponent({
          uid: 'comp2',
          pageContext,
        });
        const component2 = { ...component, uid: 'comp2' };
        const completion1 = new CmsActions.LoadCmsComponentSuccess({
          component,
          uid: component.uid,
          pageContext,
        });
        const completion2 = new CmsActions.LoadCmsComponentSuccess({
          component: component2,
          uid: component2.uid,
          pageContext,
        });
        spyOn(service, 'getList').and.returnValue(
          cold('---c', { c: [component, component2] })
        );

        actions$ = hot('-ab', { a: action1, b: action2 });
        const expected = cold('-------(ab)', {
          a: completion1,
          b: completion2,
        });

        expect(
          effects.loadComponent$({
            scheduler: getTestScheduler(),
            debounce: 20,
          })
        ).toBeObservable(expected);
        expect(service.getList).toHaveBeenCalledWith(
          ['comp1', 'comp2'],
          pageContext
        );
      });
    });
    describe('when different page context is present in the actions', () => {
      it('should group component load in specified time frame and by the page context', () => {
        const pageContext1: PageContext = {
          id: 'first',
          type: PageType.CONTENT_PAGE,
        };
        const pageContext2: PageContext = {
          id: 'second',
          type: PageType.CATEGORY_PAGE,
        };
        const action1 = new CmsActions.LoadCmsComponent({
          uid: 'comp1',
          pageContext: pageContext1,
        });
        const action2 = new CmsActions.LoadCmsComponent({
          uid: 'comp2',
          pageContext: pageContext2,
        });
        const component2 = { ...component, uid: 'comp2' };
        const completion1 = new CmsActions.LoadCmsComponentSuccess({
          component,
          uid: component.uid,
          pageContext: pageContext1,
        });
        const completion2 = new CmsActions.LoadCmsComponentSuccess({
          component: component2,
          uid: component2.uid,
          pageContext: pageContext2,
        });
        const getListSpy = spyOn(service, 'getList').and.callFake((ids) =>
          cold('---a', { a: [{ ...component, uid: ids[0] }] })
        );

        actions$ = hot('-ab', { a: action1, b: action2 });
        const expected = cold('------ab', {
          a: completion1,
          b: completion2,
        });

        expect(
          effects.loadComponent$({
            scheduler: getTestScheduler(),
            debounce: 20,
          })
        ).toBeObservable(expected);
        expect(service.getList).toHaveBeenCalledTimes(2);
        // check all the arguments for which the method was called (reason: https://github.com/jasmine/jasmine/issues/228#issuecomment-270599719)
        expect(getListSpy.calls.allArgs()).toEqual([
          [['comp1'], pageContext1],
          [['comp2'], pageContext2],
        ]);
      });
    });
  });
});
