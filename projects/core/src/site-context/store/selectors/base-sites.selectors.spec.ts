import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteContextSelectors } from './index';
import { SITE_CONTEXT_FEATURE, StateWithSiteContext } from '../state';

const baseSites: BaseSite[] = [{ uid: 'powertools-spa', channel: 'B2B' }];

const entities: { [key: string]: BaseSite } = {
  'powertools-spa': baseSites[0],
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
    it('should return baseSite entities', () => {
      let result: any;

      store
        .pipe(select(SiteContextSelectors.getBaseSitesEntities))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadBaseSitesSuccess(baseSites));
      expect(result).toEqual(entities);
    });
  });

  describe('getActiveBaseSiteUid', () => {
    it('should return the uid of the active baseSite', () => {
      let result: string;

      store
        .pipe(select(SiteContextSelectors.getActiveBaseSiteUid))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(
        new SiteContextActions.SetActiveBaseSite('powertools-spa')
      );
      expect(result).toEqual('powertools-spa');
    });
  });

  describe('getAllBaseSites', () => {
    it('should return all baseSites', () => {
      let result: BaseSite[];

      store
        .pipe(select(SiteContextSelectors.getAllBaseSites))
        .subscribe((value) => (result = value));

      expect(result).toEqual(null);

      store.dispatch(new SiteContextActions.LoadBaseSitesSuccess(baseSites));
      expect(result).toEqual(baseSites);
    });
  });

  describe('getActiveBaseSiteData', () => {
    it('should return the active baseSite data', () => {
      let result: BaseSite;

      store
        .pipe(select(SiteContextSelectors.getActiveBaseSiteData))
        .subscribe((value) => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new SiteContextActions.LoadBaseSitesSuccess(baseSites));
      store.dispatch(
        new SiteContextActions.SetActiveBaseSite('powertools-spa')
      );
      expect(result).toEqual(baseSites[0]);
    });
  });
});
