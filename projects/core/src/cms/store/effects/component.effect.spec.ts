import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CmsComponent, PageType } from '../../../model/cms.model';
import { RoutingService } from '../../../routing/index';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { CmsActions } from '../actions/index';
import * as fromEffects from './component.effect';
import { FeatureConfigService } from '@spartacus/core';

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
  getList(_uid, _pageContext): Observable<any> {
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
  let effects: fromEffects.ComponentEffects;

  const component: CmsComponent = {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: CmsComponentConnector, useClass: MockCmsComponentConnector },
        fromEffects.ComponentEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    service = TestBed.get(CmsComponentConnector as Type<CmsComponentConnector>);
    effects = TestBed.get(fromEffects.ComponentEffects as Type<
      fromEffects.ComponentEffects
    >);
  });

  describe('loadComponent$', () => {
    it('should return a component from LoadComponentSuccess', () => {
      const action = new CmsActions.LoadCmsComponent('comp1');
      const completion = new CmsActions.LoadCmsComponentSuccess(component);
      spyOn(service, 'getList').and.returnValue(of([component]));

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(
        effects.loadComponent$({ scheduler: getTestScheduler() })
      ).toBeObservable(expected);
    });

    it('should group component load in specified time frame', () => {
      const action1 = new CmsActions.LoadCmsComponent('comp1');
      const action2 = new CmsActions.LoadCmsComponent('comp2');
      const component2 = { ...component, uid: 'comp2' };
      const completion1 = new CmsActions.LoadCmsComponentSuccess(component);
      const completion2 = new CmsActions.LoadCmsComponentSuccess(component2);
      spyOn(service, 'getList').and.returnValue(
        cold('---c', { c: [component, component2] })
      );

      actions$ = hot('-ab', { a: action1, b: action2 });
      const expected = cold('-------(ab)', { a: completion1, b: completion2 });

      expect(
        effects.loadComponent$({ scheduler: getTestScheduler(), debounce: 20 })
      ).toBeObservable(expected);
      expect(service.getList).toHaveBeenCalledWith(['comp1', 'comp2'], {
        id: '1',
        type: 'ProductPage',
      });
    });
  });
});
