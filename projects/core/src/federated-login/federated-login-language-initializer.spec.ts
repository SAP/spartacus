import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { ConfigInitializerService } from '../config';
import {
  LanguageService,
  LanguageStatePersistenceService,
  SiteContextConfig,
} from '../site-context';
import { SiteContextRoutesHandler } from '../site-context/services/site-context-routes-handler';
import { FederatedLoginLanguageInitializer } from './federated-login-language-initializer';
import { FederatedLoginService } from './services';
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

class MockFederatedLoginService implements Partial<FederatedLoginService> {
  language: string | undefined = undefined;
}

describe('FederatedLoginLanguageInitializer', () => {
  let initializer: FederatedLoginLanguageInitializer;
  let languageService: LanguageService;
  let languageStatePersistenceService: LanguageStatePersistenceService;
  let federatedLoginService: MockFederatedLoginService;
  let siteContextRoutesHandler: SiteContextRoutesHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FederatedLoginLanguageInitializer,
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
        {
          provide: FederatedLoginService,
          useClass: MockFederatedLoginService,
        },
      ],
    });

    languageStatePersistenceService = TestBed.inject(
      LanguageStatePersistenceService
    );
    languageService = TestBed.inject(LanguageService);
    siteContextRoutesHandler = TestBed.inject(SiteContextRoutesHandler);
    federatedLoginService = TestBed.inject(
      FederatedLoginService
    ) as unknown as MockFederatedLoginService;
    initializer = TestBed.inject(FederatedLoginLanguageInitializer);
  });

  it('should be created', () => {
    expect(initializer).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call siteContextRoutesHandler.initOnce()', async () => {
      await initializer.initialize();
      expect(siteContextRoutesHandler.initOnce).toHaveBeenCalled();
    });

    it('should call languageStatePersistenceService.initSync()', async () => {
      await initializer.initialize();
      expect(languageStatePersistenceService.initSync).toHaveBeenCalled();
    });

    it('should set the fallback language from config when no language in federated login context', async () => {
      federatedLoginService.language = undefined;

      await initializer.initialize();

      expect(languageService.setActive).toHaveBeenCalledWith('ja');
    });

    describe('when there is a language in federated login context', () => {
      beforeEach(() => {
        federatedLoginService.language = 'de';
      });

      it('should set the language from federated context before initSync when language is available', async () => {
        const callOrder: string[] = [];
        (languageService.setActive as jasmine.Spy).and.callFake(() =>
          callOrder.push('setActive')
        );
        (languageStatePersistenceService.initSync as jasmine.Spy).and.callFake(
          () => {
            callOrder.push('initSync');
            return of(EMPTY);
          }
        );

        await initializer.initialize();

        expect(callOrder.indexOf('setActive')).toBeLessThan(
          callOrder.indexOf('initSync')
        );
      });

      it('should call languageService.setActive() with the federated language', async () => {
        await (initializer as any).setFromFederatedLoginContext().toPromise();

        expect(languageService.setActive).toHaveBeenCalledWith('de');
      });
    });
  });
});
