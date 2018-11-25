import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { LanguageService } from './language.service';
import { OccConfig } from '../../occ/config/occ-config';
import { defaultOccConfig } from '../../occ/config/default-occ-config';

const mockLanguages: any[] = [
  { active: true, isocode: 'ja', name: 'Japanese' }
];

const mockActiveLang = 'ja';

describe('LanguageService', () => {
  const mockSelect1 = createSpy('select').and.returnValue(() =>
    of(mockLanguages)
  );
  const mockSelect2 = createSpy('select').and.returnValue(() =>
    of(mockActiveLang)
  );

  let service: LanguageService;
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockSelect1,
      mockSelect2
    );

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
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
    service.languages$.subscribe(results => {
      expect(results).toEqual(mockLanguages);
    });
  });

  it('should be able to get active languages', () => {
    service.activeLanguage$.subscribe(results => {
      expect(results).toEqual(mockActiveLang);
    });
  });

  describe('set activeLanguage(isocode)', () => {
    it('shouldselectt active language', () => {
      service.select('ja');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveLanguage('ja')
      );
    });
  });
});
