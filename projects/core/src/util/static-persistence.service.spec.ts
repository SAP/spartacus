import { TestBed } from '@angular/core/testing';
import { StorageSyncType } from '../state';
import * as storageSyncUtils from '../state/reducers/storage-sync.reducer';
import { generateKeyWithContext } from '../state/reducers/storage-sync.reducer';
import { WindowRef } from '../window/window-ref';
import { StaticPersistenceService } from './static-persistence.service';

const mockKey = 'test';
const mockStringState = 'test-state';
const mockState = { state: 'test' };

const sessionStorageMock = {
  getItem(_key: string): string | null {
    return JSON.stringify(mockState);
  },
  setItem(_key: string, _value: string): void {},
  removeItem(_key: string): void {},
} as Storage;

const localStorageMock = {
  getItem(_key: string): string | null {
    return mockStringState;
  },
  setItem(_key: string, _value: string): void {},
  removeItem(_key: string): void {},
} as Storage;

describe('StaticPersistenceService', () => {
  let service: StaticPersistenceService;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRef],
    });

    service = TestBed.inject(StaticPersistenceService);
    winRef = TestBed.inject(WindowRef);
    spyOn(storageSyncUtils, 'persistToStorage').and.stub();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('persistToStorage', () => {
    it('should get the right storage', () => {
      spyOn(storageSyncUtils, 'getStorage').and.stub();

      service.persistToStorage({ key: mockKey, state: mockState });
      expect(storageSyncUtils.getStorage).toHaveBeenCalledWith(
        StorageSyncType.LOCAL_STORAGE,
        winRef
      );

      service.persistToStorage({
        key: mockKey,
        state: mockState,
        storageType: StorageSyncType.SESSION_STORAGE,
      });
      expect(storageSyncUtils.getStorage).toHaveBeenCalledWith(
        StorageSyncType.SESSION_STORAGE,
        winRef
      );
    });

    it('should persist to localStorage', () => {
      spyOn(storageSyncUtils, 'getStorage').and.returnValue(localStorageMock);
      service.persistToStorage({ key: mockKey, state: mockStringState });

      expect(storageSyncUtils.persistToStorage).toHaveBeenCalledWith(
        generateKeyWithContext('', mockKey),
        mockStringState,
        localStorageMock
      );
    });
    it('should persist to sessionStorage', () => {
      spyOn(storageSyncUtils, 'getStorage').and.returnValue(sessionStorageMock);
      service.persistToStorage({
        key: mockKey,
        state: mockStringState,
        storageType: StorageSyncType.SESSION_STORAGE,
      });

      expect(storageSyncUtils.persistToStorage).toHaveBeenCalledWith(
        generateKeyWithContext('', mockKey),
        mockStringState,
        sessionStorageMock
      );
    });
  });

  describe('readFromStorage', () => {
    it('should persist to localStorage', () => {
      spyOn(storageSyncUtils, 'getStorage').and.returnValue(localStorageMock);
      const res = service.readStateFromStorage({ key: mockKey });

      expect(res).toEqual(mockStringState);
    });
    it('should persist to sessionStorage', () => {
      spyOn(storageSyncUtils, 'getStorage').and.returnValue(sessionStorageMock);
      const res = service.readStateFromStorage({
        key: mockKey,
        storageType: StorageSyncType.SESSION_STORAGE,
      });

      expect(res).toEqual(mockState);
    });
  });
});
