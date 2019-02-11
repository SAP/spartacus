import { TestBed, inject } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { LanguageService } from './language.service';
import { OccConfig } from '../../occ/config/occ-config';
import { defaultOccConfig } from '../../occ/config/default-occ-config';
import { Language } from '../../occ/occ-models/occ.models';
import { EffectsModule } from '@ngrx/effects';
import { SiteContextStoreModule } from '../store/site-context-store.module';

const mockLanguages: Language[] = [
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
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextStoreModule.forRoot()
      ],
      providers: [
        { provide: OccConfig, useValue: defaultOccConfig },
        LanguageService
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

  it('should not load languages when service is constructed', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should be able to get languages', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect1);
    service.getAll().subscribe(results => {
      expect(results).toEqual(mockLanguages);
    });
  });

  it('should be able to get active languages', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockSelect2);
    service.getActive().subscribe(results => {
      expect(results).toEqual(mockActiveLang);
    });
  });

  describe('set activeLanguage(isocode)', () => {
    it('shouldselect active language', () => {
      service.setActive('ja');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.SetActiveLanguage('ja')
      );
    });
  });
});
