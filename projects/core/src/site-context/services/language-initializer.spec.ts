import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LanguageInitializer } from './language-initializer';
import { LanguageStatePersistenceService } from './language-state-persistence.service';
import { SiteContextRoutesHandler } from './site-context-routes-handler';
import createSpy = jasmine.createSpy;

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    language: ['ja'],
  },
};

class MockLanguageService implements Partial<LanguageService> {
  isInitialized() {
    return false;
  }
  setActive = createSpy().and.stub();
}

class MockLanguageStatePersistenceService
  implements Partial<LanguageStatePersistenceService>
{
  initSync = createSpy().and.returnValue(of(EMPTY));
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockSiteContextConfig);
}

class MockSiteContextRoutesHandler
  implements Partial<SiteContextRoutesHandler>
{
  initOnce = createSpy().and.returnValue(of(undefined));
}

describe('LanguageInitializer', () => {
  let initializer: LanguageInitializer;
  let languageService: LanguageService;
  let languageStatePersistenceService: LanguageStatePersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageInitializer,
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: LanguageStatePersistenceService,
          useClass: MockLanguageStatePersistenceService,
        },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        {
          provide: SiteContextRoutesHandler,
          useClass: MockSiteContextRoutesHandler,
        },
      ],
    });

    languageStatePersistenceService = TestBed.inject(
      LanguageStatePersistenceService
    );
    languageService = TestBed.inject(LanguageService);
    initializer = TestBed.inject(LanguageInitializer);
  });

  it('should be created', () => {
    expect(initializer).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call SiteContextRoutesHandler initOnce() and LanguageStatePersistenceService initSync()', async () => {
      spyOn<any>(initializer, 'setFallbackValue').and.returnValue(of(null));
      await initializer.initialize();
      expect(initializer.siteContextRoutesHandler.initOnce).toHaveBeenCalled();
      expect(languageStatePersistenceService.initSync).toHaveBeenCalled();
      expect(initializer['setFallbackValue']).toHaveBeenCalled();
    });

    it('should set default from config is the language is NOT initialized', async () => {
      await initializer.initialize();
      expect(languageService.setActive).toHaveBeenCalledWith('ja');
    });

    it('should NOT set default from config is the language is initialized', async () => {
      spyOn(languageService, 'isInitialized').and.returnValue(true);
      await initializer.initialize();
      expect(languageService.setActive).not.toHaveBeenCalled();
    });
  });
});
