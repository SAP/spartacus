import { TestBed, inject } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';

import { of } from 'rxjs';

import createSpy = jasmine.createSpy;

import { SiteContextModule } from '../site-context.module';
import * as fromStore from '../store';
import { StateWithSiteContext } from '../store/state';
import { defaultOccConfig } from '../../occ/config/default-occ-config';
import { OccConfig } from '../../occ/config/occ-config';
import { Language } from '../../occ/occ-models/occ.models';

import { LanguageService } from './language.service';

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
      imports: [SiteContextModule.forRoot()],
      providers: [{ provide: OccConfig, useValue: defaultOccConfig }]
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
