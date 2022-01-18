import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade/currency.service';
import { CurrencyInitializer } from './currency-initializer';
import { CurrencyStatePersistenceService } from './currency-state-persistence.service';
import createSpy = jasmine.createSpy;

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    currency: ['USD'],
  },
};

class MockCurrencyService implements Partial<CurrencyService> {
  isInitialized() {
    return false;
  }
  setActive = createSpy().and.stub();
}

class MockCurrencyStatePersistenceService
  implements Partial<CurrencyStatePersistenceService>
{
  initSync = createSpy().and.returnValue(of(EMPTY));
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockSiteContextConfig);
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
    it('should call CurrencyStatePersistenceService initSync()', () => {
      spyOn<any>(initializer, 'setFallbackValue').and.returnValue(of(null));
      initializer.initialize();
      expect(currencyStatePersistenceService.initSync).toHaveBeenCalled();
      expect(initializer['setFallbackValue']).toHaveBeenCalled();
    });

    it('should set default from config is the currency is NOT initialized', () => {
      initializer.initialize();
      expect(currencyService.setActive).toHaveBeenCalledWith('USD');
    });

    it('should NOT set default from config is the currency is initialized', () => {
      spyOn(currencyService, 'isInitialized').and.returnValue(true);
      initializer.initialize();
      expect(currencyService.setActive).not.toHaveBeenCalled();
    });
  });
});
