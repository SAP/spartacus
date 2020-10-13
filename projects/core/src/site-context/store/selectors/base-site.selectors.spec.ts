import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteContextSelectors } from '../selectors/index';
import { SITE_CONTEXT_FEATURE, StateWithSiteContext } from '../state';

const basesites: BaseSite[] = [{ uid: 'powertools-spa', channel: 'B2B' }];

const entities: { [key: string]: BaseSite } = {
  'powertools-spa': basesites[0],
};

describe('BaseSite Selectors', () => {
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          SITE_CONTEXT_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getBaseSitesEntities', () => {
    it('should return basesite entities', () => {
      let result: any;

      store
        .pipe(select(SiteContextSelectors.getBaseSitesEntities))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadBaseSitesSuccess(basesites));
      expect(result).toEqual(entities);
    });
  });

  describe('getActiveBaseSite', () => {
    it('should return the active basesite', () => {
      let result: string;

      store
        .pipe(select(SiteContextSelectors.getActiveBaseSite))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(
        new SiteContextActions.SetActiveBaseSite('powertools-spa')
      );
      expect(result).toEqual('powertools-spa');
    });
  });

  describe('getAllBaseSites', () => {
    it('should return all basesites', () => {
      let result: BaseSite[];

      store
        .pipe(select(SiteContextSelectors.getAllBaseSites))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadBaseSitesSuccess(basesites));
      expect(result).toEqual(basesites);
    });
  });

  describe('getActiveBaseSiteData', () => {
    it('should return the active basesite data', () => {
      let result: BaseSite;

      store
        .pipe(select(SiteContextSelectors.getActiveBaseSiteData))
        .subscribe((value) => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new SiteContextActions.LoadBaseSitesSuccess(basesites));
      store.dispatch(
        new SiteContextActions.SetActiveBaseSite('powertools-spa')
      );
      expect(result).toEqual(basesites[0]);
    });
  });
});
