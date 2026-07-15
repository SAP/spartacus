import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade/currency.service';
import { CurrencyInitializer } from './currency-initializer';
import { CurrencyStatePersistenceService } from './currency-state-persistence.service';
import { SiteContextRoutesHandler } from './site-context-routes-handler';

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    currency: ['USD'],
  },
};

class MockCurrencyService implements Partial<CurrencyService> {
  isInitialized() {
    return false;
  }
  setActive = vi.fn().mockImplementation(() => {});
}

class MockCurrencyStatePersistenceService
  implements Partial<CurrencyStatePersistenceService>
{
  initSync = vi.fn().mockReturnValue(of(EMPTY));
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockSiteContextConfig);
}

class MockSiteContextRoutesHandler
  implements Partial<SiteContextRoutesHandler>
{
  initOnce = vi.fn().mockReturnValue(of(undefined));
}

describe('CurrencyInitializer', () => {
  let initializer: CurrencyInitializer;
  let currencyService: CurrencyService;
  let currencyStatePersistenceService: CurrencyStatePersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrencyInitializer,
        { provide: CurrencyService, useClass: MockCurrencyService },
        {
          provide: CurrencyStatePersistenceService,
          useClass: MockCurrencyStatePersistenceService,
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

    currencyStatePersistenceService = TestBed.inject(
      CurrencyStatePersistenceService
    );
    currencyService = TestBed.inject(CurrencyService);
    initializer = TestBed.inject(CurrencyInitializer);
  });

  it('should be created', () => {
    expect(initializer).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call SiteContextRoutesHandler initOnce() and CurrencyStatePersistenceService initSync()', async () => {
      vi.spyOn<any, any>(initializer, 'setFallbackValue').mockReturnValue(
        of(null)
      );
      await initializer.initialize();
      expect(initializer.siteContextRoutesHandler.initOnce).toHaveBeenCalled();
      expect(currencyStatePersistenceService.initSync).toHaveBeenCalled();
      expect(initializer['setFallbackValue']).toHaveBeenCalled();
    });

    it('should set default from config is the currency is NOT initialized', async () => {
      await initializer.initialize();
      expect(currencyService.setActive).toHaveBeenCalledWith('USD');
    });

    it('should NOT set default from config is the currency is initialized', async () => {
      vi.spyOn(currencyService, 'isInitialized').mockReturnValue(true);
      await initializer.initialize();
      expect(currencyService.setActive).not.toHaveBeenCalled();
    });
  });
});
