import { vi } from 'vitest';
import { inject, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SiteContextConfig } from '@spartacus/core';
import { of } from 'rxjs';
import { Language } from '../../model/misc.model';
import { SiteConnector } from '../connectors/site.connector';
import { SiteContextActions } from '../store/actions/index';
import { SiteContextStoreModule } from '../store/site-context-store.module';
import { StateWithSiteContext } from '../store/state';
import { LanguageService } from './language.service';

const mockLanguages: Language[] = [
  { active: true, isocode: 'ja', name: 'Japanese' },
];

const mockActiveLang = 'ja';

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    language: ['ja'],
  },
};

class MockSiteConnector {
  getCurrencies() {
    return of([]);
  }

  getLanguages() {
    return of([]);
  }
}

describe('LanguageService', () => {
  let service: LanguageService;
  let store: Store<StateWithSiteContext>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SiteContextStoreModule,
      ],
      providers: [
        LanguageService,
        { provide: SiteConnector, useClass: MockSiteConnector },
        { provide: SiteContextConfig, useValue: mockSiteContextConfig },
      ],
    });

    store = TestBed.inject(Store);
    vi.spyOn(store, 'dispatch');
    service = TestBed.inject(LanguageService);
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
    vi.spyOn(store, 'pipe').mockReturnValueOnce(of(mockLanguages));
    service.getAll().subscribe((results) => {
      expect(results).toEqual(mockLanguages);
    });
  });

  it('should be able to get active languages', () => {
    vi.spyOn(store, 'pipe').mockReturnValueOnce(of(mockActiveLang));
    service.getActive().subscribe((results) => {
      expect(results).toEqual(mockActiveLang);
    });
  });

  describe('set activeLanguage(isocode)', () => {
    it('shouldselect active language', () => {
      vi.spyOn(store, 'pipe').mockReturnValueOnce(of(null));
      service.setActive('ja');
      expect(store.dispatch).toHaveBeenCalledWith(
        new SiteContextActions.SetActiveLanguage('ja')
      );
    });
  });

  describe('isInitialized', () => {
    it('should return TRUE if a language is initialized', () => {
      vi.spyOn(store, 'pipe').mockReturnValueOnce(of(mockActiveLang));
      expect(service.isInitialized()).toBeTruthy();
    });
  });

  describe('isValid', () => {
    it('should return TRUE if the locale is valid', () => {
      expect(service['isValid'](mockActiveLang)).toBeTruthy();
    });
    it('should return FALSE if the locale is not valid', () => {
      expect(service['isValid']('zh')).toBeFalsy();
    });
  });
});
