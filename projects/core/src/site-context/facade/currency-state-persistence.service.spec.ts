import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import { CURRENCY_CONTEXT_ID } from '../providers';
import { CurrencyStatePersistenceService } from './currency-state-persistence.service';
import { CurrencyService } from './currency.service';
import createSpy = jasmine.createSpy;

class MockCurrencyService implements Partial<CurrencyService> {
  getActive() {
    return of('');
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
    it('should update state after read', () => {
      const currency = 'JPY';

      service['onRead'](currency);

      expect(currencyService.setActive).toHaveBeenCalledWith(currency);
    });
    it('should use default currency if state is empty', () => {
      service['onRead']('');

      expect(currencyService.setActive).toHaveBeenCalledWith(mockCurrencies[0]);
    });
    it('should use default currency if it is not in the configurations', () => {
      const currency = 'CAD';

      service['onRead'](currency);

      expect(currencyService.setActive).toHaveBeenCalledWith(mockCurrencies[0]);
    });
    it('should ignore storage if the currency is already set', () => {
      spyOn(currencyService, 'getActive').and.returnValue(of('JPY'));

      expect(currencyService.setActive).not.toHaveBeenCalled();
    });
  });
});
