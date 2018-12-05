import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccCmsService } from '../../occ/occ-cms.service';
import {
  CmsModuleConfig,
  defaultCmsModuleConfig
} from '../../model/cms-config';
import * as fromEffects from './component.effect';
import * as fromActions from '../actions/component.action';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { PageType, CmsComponent } from '../../../occ-models/index';
import { RoutingService } from '../../../routing/index';

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
  routerState$: of(router)
};
describe('Component Effects', () => {
  let actions$: Observable<any>;
  let service: OccCmsService;
  let effects: fromEffects.ComponentEffects;

  const component: CmsComponent = {
    uid: 'comp1',
    typeCode: 'SimpleBannerComponent'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        OccCmsService,
        { provide: CmsModuleConfig, useValue: defaultCmsModuleConfig },
        fromEffects.ComponentEffects,
        provideMockActions(() => actions$),
        { provide: RoutingService, useValue: mockRoutingService }
      ]
    });

    service = TestBed.get(OccCmsService);
    effects = TestBed.get(fromEffects.ComponentEffects);

    spyOn(service, 'loadComponent').and.returnValue(of(component));
  });

  describe('loadComponent$', () => {
    it('should return a component from LoadComponentSuccess', () => {
      const action = new fromActions.LoadComponent('comp1');
      const completion = new fromActions.LoadComponentSuccess(component);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadComponent$).toBeObservable(expected);
    });
  });
});
