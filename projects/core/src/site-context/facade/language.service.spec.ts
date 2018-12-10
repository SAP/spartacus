import { TestBed, inject } from '@angular/core/testing';

import { StoreModule, Store } from '@ngrx/store';

import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { Language } from '../../occ-models/occ.models';
import { defaultOccConfig } from '../../occ/config/default-occ-config';
import { OccConfig } from '../../occ/config/occ-config';

import { LanguageService } from './language.service';

const mockLanguages: Language[] = [
  { active: true, isocode: 'ja', name: 'Japanese' }
];

const mockActiveLang = 'ja';

describe('LanguageService', () => {
  let service: LanguageService;
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('siteContext', fromStore.getReducers())
      ],
      providers: [
        LanguageService,
        { provide: OccConfig, useValue: defaultOccConfig }
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(LanguageService);
  });

  it('should LanguageService is injected', inject(
    [LanguageService],
    (Service: LanguageService) => {
      expect(Service).toBeTruthy();
    }
  ));

  it('should load languages and set active language when service is constructed', () => {
    store.dispatch(new fromStore.LoadLanguagesSuccess(mockLanguages));

    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadLanguages());
    let activeLang = sessionStorage.getItem('language');
    if (!activeLang) {
      activeLang = defaultOccConfig.site.language;
    }
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.SetActiveLanguage(activeLang)
    );
  });

  it('should be able to get languages', () => {
    store.dispatch(new fromStore.LoadLanguagesSuccess(mockLanguages));

    let result: Language[];
    service
      .get()
      .subscribe(results => (result = results))
      .unsubscribe();

    expect(result).toEqual(mockLanguages);
  });

  it('should be able to get active languages', () => {
    store.dispatch(new fromStore.SetActiveLanguage(mockActiveLang));

    let result: string;
    service
      .getActive()
      .subscribe(results => (result = results))
      .unsubscribe();

    expect(result).toEqual(mockActiveLang);
  });

  describe('setActive(isocode)', () => {
    it('should be able to set active language', () => {
      store.dispatch(new fromStore.LoadLanguagesSuccess(mockLanguages));
      service.setActive('ja');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveLanguage('ja')
      );
    });
  });
});
