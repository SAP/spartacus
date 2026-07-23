import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LANGUAGE_CONTEXT_ID } from '../providers';
import { LanguageStatePersistenceService } from './language-state-persistence.service';
import createSpy = jasmine.createSpy;

class MockLanguageService implements Partial<LanguageService> {
  getActive() {
    return of('');
  }
  isInitialized() {
    return false;
  }
  setActive = createSpy('setActive');
}

const mockLanguages = ['ja', 'de'];

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    [LANGUAGE_CONTEXT_ID]: mockLanguages,
  },
};

describe('LanguageStatePersistenceService', () => {
  let service: LanguageStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let languageService: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        { provide: SiteContextConfig, useValue: mockSiteContextConfig },
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(LanguageStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    languageService = TestBed.inject(LanguageService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('initSync', () => {
    it('should call StatePersistenceService with the correct attributes', () => {
      const state$ = of('en');
      spyOn(languageService, 'getActive').and.returnValue(state$);
      spyOn(persistenceService, 'syncWithStorage');

      service.initSync();

      expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          key: LANGUAGE_CONTEXT_ID,
          state$,
        })
      );
      expect(languageService.getActive).toHaveBeenCalled();
    });
  });

  describe('onRead', () => {
    it('should NOT set active if no value is provided', () => {
      spyOn(languageService, 'isInitialized').and.returnValue(false);
      service['onRead']('');

      expect(languageService.setActive).not.toHaveBeenCalled();
    });
    it('should NOT set active if the language is initialized', () => {
      spyOn(languageService, 'isInitialized').and.returnValue(true);

      service['onRead']('ja');

      expect(languageService.setActive).not.toHaveBeenCalled();
    });
    it('should set active value if the currency is NOT initialized and a value is provided', () => {
      spyOn(languageService, 'isInitialized').and.returnValue(false);
      const language = 'ja';

      service['onRead'](language);

      expect(languageService.setActive).toHaveBeenCalledWith(language);
    });
  });
});
