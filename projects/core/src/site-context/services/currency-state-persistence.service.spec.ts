import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade/currency.service';
import { CURRENCY_CONTEXT_ID } from '../providers';
import { CurrencyStatePersistenceService } from './currency-state-persistence.service';
import createSpy = jasmine.createSpy;

class MockCurrencyService implements Partial<CurrencyService> {
  getActive() {
    return of('');
  }
  isInitialized() {
    return false;
  }
  setActive = createSpy('setActive');
}

const mockCurrencies = ['USD', 'JPY'];

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    [CURRENCY_CONTEXT_ID]: mockCurrencies,
  },
};

describe('CurrencyStatePersistenceService', () => {
  let service: CurrencyStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CurrencyService,
          useClass: MockCurrencyService,
        },
        { provide: SiteContextConfig, useValue: mockSiteContextConfig },
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(CurrencyStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    currencyService = TestBed.inject(CurrencyService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('initSync', () => {
    it('should call StatePersistenceService with the correct attributes', () => {
      const state$ = of('USD');
      spyOn(currencyService, 'getActive').and.returnValue(state$);
      spyOn(persistenceService, 'syncWithStorage');

      service.initSync();

      expect(persistenceService.syncWithStorage).toHaveBeenCalledWith(
        jasmine.objectContaining({
          key: CURRENCY_CONTEXT_ID,
          state$,
        })
      );
      expect(currencyService.getActive).toHaveBeenCalled();
    });
  });

  describe('onRead', () => {
    it('should NOT set active if no value is provided', () => {
      spyOn(currencyService, 'isInitialized').and.returnValue(false);
      service['onRead']('');

      expect(currencyService.setActive).not.toHaveBeenCalled();
    });
    it('should NOT set active if the currency is initialized', () => {
      spyOn(currencyService, 'isInitialized').and.returnValue(true);

      service['onRead']('CAD');

      expect(currencyService.setActive).not.toHaveBeenCalled();
    });
    it('should set active value if the currency is NOT initialized and a value is provided', () => {
      spyOn(currencyService, 'isInitialized').and.returnValue(false);
      const currency = 'CAD';

      service['onRead'](currency);

      expect(currencyService.setActive).toHaveBeenCalledWith(currency);
    });
  });
});
