import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccCmsService } from '../../services/occ-cms.service';
import { DefaultPageService } from './../../services/default-page.service';
import { ConfigService } from '../../config.service';
import * as fromEffects from './page.effect';
import * as fromActions from '../actions';
import { Page } from '../../models/page.model';
import {
  PageContext,
  PageType
} from '../../../routing/models/page-context.model';

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

export function mockDateNow() {
  return 1000000000000;
}

describe('Page Effects', () => {
  let actions$: TestActions;
  let occService: OccCmsService;
  let defaultPageService: DefaultPageService;
  let effects: fromEffects.PageEffects;

  const comps: any[] = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
    { uid: 'comp2', typeCode: 'CMSLinkComponent' },
    { uid: 'comp3', typeCode: 'NavigationComponent' }
  ];
  const cmsPageData: any = {
    pageId: 'testPageId',
    name: 'testPage',
    template: 'testTemplate',
    contentSlots: {
      contentSlot: [
        { components: { component: comps }, position: 'testPosition' }
      ]
    }
  };

  const page: Page = {
    loadTime: 1000000000000,
    name: 'testPage',
    pageId: 'testPageId',
    template: 'testTemplate',
    seen: new Array<string>(),
    slots: { testPosition: comps }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsService,
        ConfigService,
        DefaultPageService,
        fromEffects.PageEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    occService = TestBed.get(OccCmsService);
    defaultPageService = TestBed.get(DefaultPageService);
    effects = TestBed.get(fromEffects.PageEffects);
    Date.now = mockDateNow;

    spyOn(occService, 'loadPageData').and.returnValue(of(cmsPageData));
    spyOn(defaultPageService, 'getDefaultPageIdsBytype').and.returnValue([
      'productList'
    ]);
  });

  describe('loadPage$', () => {
    it('should emit actions LoadPageDataSuccess and GetComponentFromPage for ContentPage type', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };

      const action = new fromActions.LoadPageData(context);

      page.seen.push(context.id);
      const pageKey = page.pageId + '_' + context.type;
      const payload = { key: pageKey, value: page };

      const completion1 = new fromActions.LoadPageDataSuccess(payload);
      const completion2 = new fromActions.GetComponentFromPage(comps);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.loadPage$).toBeObservable(expected);
    });

    it('should emit actions LoadPageDataSuccess and GetComponentFromPage for non-ContentPage type (specific)', () => {
      const context: PageContext = {
        id: '1234',
        type: PageType.PRODUCT_PAGE
      };

      const action = new fromActions.LoadPageData(context);

      page.seen = new Array<string>();
      page.seen.push(context.id);
      const pageKey = context.id + '_' + context.type;
      const payload = { key: pageKey, value: page };

      const completion1 = new fromActions.LoadPageDataSuccess(payload);
      const completion2 = new fromActions.GetComponentFromPage(comps);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.loadPage$).toBeObservable(expected);
    });

    it('should emit actions LoadPageDataSuccess and GetComponentFromPage for non-ContentPage type (default)', () => {
      const context: PageContext = {
        id: '1234',
        type: PageType.PRODUCT_PAGE
      };

      const action = new fromActions.LoadPageData(context);

      cmsPageData.pageId = 'productList';
      page.pageId = 'productList';
      page.seen = new Array<string>();
      page.seen.push(context.id);

      const pageKey = page.pageId + '_' + context.type;
      const payload = { key: pageKey, value: page };

      const completion1 = new fromActions.LoadPageDataSuccess(payload);
      const completion2 = new fromActions.GetComponentFromPage(comps);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.loadPage$).toBeObservable(expected);
    });
  });
});
