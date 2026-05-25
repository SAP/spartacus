import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromReducers from '../reducers/index';
import { SiteContextSelectors } from '../selectors/index';
import { SITE_CONTEXT_FEATURE, StateWithSiteContext } from '../state';

const site: BaseSite = {
  uid: 'test',
  defaultPreviewCategoryCode: 'test category code',
  defaultPreviewProductCode: 'test product code',
};
const baseSites: BaseSite[] = [site];
const entities: { [key: string]: BaseSite } = {
  test: baseSites[0],
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
  });

  describe('getActiveBaseSite', () => {
    it('should return baseSite', () => {
      let result: string;

      store
        .pipe(select(SiteContextSelectors.getActiveBaseSite))
        .subscribe((value) => (result = value));

      expect(result).toEqual('');

      store.dispatch(new SiteContextActions.SetActiveBaseSite('baseSite'));
      expect(result).toEqual('baseSite');
    });
  });

  describe('getBaseSiteData', () => {
    it('should return base site details data', () => {
      let result: BaseSite;
      store
        .pipe(select(SiteContextSelectors.getBaseSiteData))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(new SiteContextActions.LoadBaseSiteSuccess(site));
      expect(result).toEqual(site);
    });
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
});
