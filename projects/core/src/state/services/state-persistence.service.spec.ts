import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { contextServiceMapProvider } from '../../site-context/providers/context-service-map';
import { SiteContextParamsService } from '../../site-context/services/site-context-params.service';
import { ConsentService } from '../../user/facade/consent.service';
import { WindowRef } from '../../window/window-ref';
import { StorageSyncType } from '../config/state-config';
import { StatePersistenceService } from './state-persistence.service';

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

class MockConsentService implements Partial<ConsentService> {
  checkConsentGivenByTemplateId = () => of(true);
}

describe('StatePersistenceService', () => {
  let service: StatePersistenceService;
  let consentService: ConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        contextServiceMapProvider,
        SiteContextParamsService,
        StatePersistenceService,
        { provide: WindowRef, useValue: winRef },
        { provide: ConsentService, useClass: MockConsentService },
      ],
    });

    service = TestBed.inject(StatePersistenceService);
    consentService = TestBed.inject(ConsentService);

    spyOn(sessionStorageMock, 'setItem').and.stub();
    spyOn(localStorageMock, 'setItem').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('syncWithStorage', () => {
    it('should update storage on each state update', () => {
      const state = new Subject<number>();

      service.syncWithStorage({ key: 'test', state$: state.asObservable() });

      state.next(5);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿test',
        '5'
      );

      state.next(4);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿test',
        '4'
      );
    });

    it('should update specific state on each state update', () => {
      const state = new Subject<number>();

      service.syncWithStorage({
        key: 'test',
        state$: state.asObservable(),
        context$: of(['electronics-spa', 'USD']),
      });

      state.next(5);
      expect(sessionStorageMock.setItem).not.toHaveBeenCalled();
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus⚿electronics-spa⚿USD⚿test',
        '5'
      );

      state.next(4);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus⚿electronics-spa⚿USD⚿test',
        '4'
      );
    });

    it('should update session storage on each state update', () => {
      const state = new Subject<number>();

      service.syncWithStorage({
        key: 'test',
        state$: state.asObservable(),
        storageType: StorageSyncType.SESSION_STORAGE,
      });

      state.next(5);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿test',
        '5'
      );

      state.next(4);
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿test',
        '4'
      );
    });

    it('should restore state on context not provided', () => {
      spyOn(localStorageMock, 'getItem').and.returnValue('5');

      const state = new Subject<number>();
      let stateFromStorage;

      service.syncWithStorage({
        key: 'test',
        state$: state.asObservable(),
        onRead: (res) => (stateFromStorage = res),
      });

      expect(localStorageMock.getItem).toHaveBeenCalledWith('spartacus⚿⚿test');
      expect(stateFromStorage).toEqual(5);
    });

    it('should restore state on provided context emission', () => {
      spyOn(localStorageMock, 'getItem').and.returnValue('5');

      const state = new Subject<number>();
      const context = new Subject<string>();
      let stateFromStorage;

      service.syncWithStorage({
        key: 'test',
        state$: state.asObservable(),
        context$: context.asObservable(),
        onRead: (res) => (stateFromStorage = res),
      });

      context.next('en');
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'spartacus⚿en⚿test'
      );

      context.next('de');
      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'spartacus⚿de⚿test'
      );

      expect(localStorageMock.getItem).toHaveBeenCalledTimes(2);
      expect(stateFromStorage).toEqual(5);
    });

    it('should call removeItem if consents are false', () => {
      spyOn(localStorageMock, 'removeItem');
      spyOn(consentService, 'checkConsentGivenByTemplateId').and.returnValue(
        of(false)
      );

      const state = new Subject<number>();

      service.syncWithStorage({ key: 'test', state$: state.asObservable() });

      state.next(5);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        'spartacus⚿⚿test'
      );
    });

    it('should call ignore consents if ignoreConsent is true', () => {
      spyOn(localStorageMock, 'removeItem');
      spyOn(consentService, 'checkConsentGivenByTemplateId').and.returnValue(
        of(false)
      );

      const state = new Subject<number>();

      service.syncWithStorage({
        key: 'test',
        state$: state.asObservable(),
        ignoreConsent: true,
      });

      state.next(5);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿test',
        '5'
      );
    });
  });

  describe('readStateFromStorage', () => {
    it('should read state from localStorage', () => {
      spyOn(localStorageMock, 'getItem').and.returnValue('5');

      const stateFromStorage = service.readStateFromStorage({
        key: 'test',
        context: ['ctx'],
      });

      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'spartacus⚿ctx⚿test'
      );
      expect(stateFromStorage).toEqual(5);
    });
  });

  describe('generateKeyWithContext', () => {
    it('should work with context as an array', () => {
      expect(service['generateKeyWithContext'](['ala', 'ma'], 'kota')).toEqual(
        'spartacus⚿ala⚿ma⚿kota'
      );
    });

    it('should work with context as a string', () => {
      expect(service['generateKeyWithContext']('ola-nie-ma', 'kotki')).toEqual(
        'spartacus⚿ola-nie-ma⚿kotki'
      );
    });
  });
});
