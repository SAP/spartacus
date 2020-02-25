import { TestBed } from '@angular/core/testing';
import {
  BaseSiteService,
  contextServiceMapProvider,
  CurrencyService,
  LanguageService,
  SiteContext,
  SiteContextConfig,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../../site-context/providers/context-ids';
import { SiteContextParamsService } from '../../site-context/services/site-context-params.service';
import { WindowRef } from '../../window/window-ref';
import { StorageSyncType } from '../config/state-config';
import { StatePersistenceService } from './state-persistence.service';
import createSpy = jasmine.createSpy;

const sessionStorageMock = {
  getItem(_key: string): string | null {
    return '"value"';
  },
  setItem(_key: string, _value: string): void {},
  removeItem(_key: string): void {},
} as Storage;

const localStorageMock = {
  getItem(_key: string): string | null {
    return '"value"';
  },
  setItem(_key: string, _value: string): void {},
  removeItem(_key: string): void {},
} as Storage;

const winRef = {
  get nativeWindow(): Window {
    return {} as Window;
  },
  get sessionStorage(): Storage {
    return sessionStorageMock;
  },
  get localStorage(): Storage {
    return localStorageMock;
  },
} as WindowRef;

describe('StatePersistanceService', () => {
  let mockLanguageService: SiteContext<any>;
  let mockCurrencyService: SiteContext<any>;
  let mockBaseSiteService: SiteContext<any>;
  let service: StatePersistenceService;
  let langService: LanguageService;
  let currencyService: CurrencyService;
  let baseSiteService: BaseSiteService;
  let lang$;
  let curr$;
  let baseSite$;

  const siteContextConfig: SiteContextConfig = {
    context: {
      [LANGUAGE_CONTEXT_ID]: ['en', 'de'],
      [CURRENCY_CONTEXT_ID]: ['USD', 'GBP'],
      [BASE_SITE_CONTEXT_ID]: ['electronics-spa', 'apparel-de'],
      urlParameters: [LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID],
    },
  };

  beforeEach(() => {
    lang$ = new Subject<string>();
    curr$ = new Subject<string>();
    baseSite$ = new Subject<string>();
    mockLanguageService = {
      getActive: createSpy().and.returnValue(lang$.asObservable()),
      setActive: lang => lang$.next(lang),
      getAll: createSpy(),
    };

    mockCurrencyService = {
      getActive: createSpy().and.returnValue(curr$.asObservable()),
      setActive: curr => curr$.next(curr),
      getAll: createSpy(),
    };

    mockBaseSiteService = {
      getActive: createSpy().and.returnValue(baseSite$.asObservable()),
      setActive: baseSite => baseSite$.next(baseSite),
      getAll: createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [
        contextServiceMapProvider,
        SiteContextParamsService,
        StatePersistenceService,
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: BaseSiteService, useValue: mockBaseSiteService },
        { provide: SiteContextConfig, useValue: siteContextConfig },
        { provide: WindowRef, useValue: winRef },
      ],
    });

    service = TestBed.inject(StatePersistenceService);
    langService = TestBed.inject(LanguageService);
    currencyService = TestBed.inject(CurrencyService);
    baseSiteService = TestBed.inject(BaseSiteService);

    spyOn(sessionStorageMock, 'setItem').and.stub();
    spyOn(localStorageMock, 'setItem').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('synWithStorage', () => {
    it('should update storage on each state update', () => {
      const state = new Subject<number>();

      service.syncWithStorage('test', state.asObservable()).subscribe(() => {});

      langService.setActive('en');
      currencyService.setActive('USD');
      baseSiteService.setActive('electronics-spa');

      state.next(5);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus--test',
        '5'
      );

      state.next(4);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus--test',
        '4'
      );
    });

    it('should update specific state on each state update', () => {
      const state = new Subject<number>();

      service
        .syncWithStorage('test', state.asObservable(), [
          BASE_SITE_CONTEXT_ID,
          CURRENCY_CONTEXT_ID,
        ])
        .subscribe(() => {});

      langService.setActive('en');
      currencyService.setActive('USD');
      baseSiteService.setActive('electronics-spa');

      state.next(5);
      expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus-electronics-spa-USD-test',
        '5'
      );

      state.next(4);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus-electronics-spa-USD-test',
        '4'
      );
    });

    it('should update session storage on each state update', () => {
      const state = new Subject<number>();

      service
        .syncWithStorage(
          'test',
          state.asObservable(),
          [],
          StorageSyncType.SESSION_STORAGE
        )
        .subscribe(() => {});

      langService.setActive('en');
      currencyService.setActive('USD');
      baseSiteService.setActive('electronics-spa');

      state.next(5);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus--test',
        '5'
      );

      state.next(4);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus--test',
        '4'
      );
    });

    it('should restore state on context change', () => {
      spyOn(localStorageMock, 'getItem').and.returnValue('5');

      const state = new Subject<number>();

      service
        .syncWithStorage('test', state.asObservable())
        .subscribe(result => {
          expect(result).toEqual(5);
        });

      langService.setActive('en');
      currencyService.setActive('USD');
      baseSiteService.setActive('electronics-spa');

      expect(localStorageMock.getItem).toHaveBeenCalledWith('spartacus--test');
    });

    it('should react only to specified context change', () => {
      spyOn(localStorageMock, 'getItem').and.returnValue('5');

      const state = new Subject<number>();

      service
        .syncWithStorage('test', state.asObservable(), [LANGUAGE_CONTEXT_ID])
        .subscribe(result => {
          expect(result).toEqual(5);
        });

      langService.setActive('en');
      currencyService.setActive('USD');
      baseSiteService.setActive('electronics-spa');

      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'spartacus-en-test'
      );

      langService.setActive('de');
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'spartacus-de-test'
      );

      currencyService.setActive('GPB');
      expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
    });
  });
});
