import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { PreferredStoreService } from './preferred-store.service';

const MockWindowRef = () => {
  const store: { [key: string]: string | null } = {};
  return {
    localStorage: {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string): void => {
        if (key in store) {
          delete store[key];
        }
      },
    },
  };
};

describe('PreferredStoreService', () => {
  let preferredStoreService: PreferredStoreService;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PreferredStoreService,
        { provide: WindowRef, useValue: MockWindowRef() },
      ],
    });

    preferredStoreService = TestBed.inject(PreferredStoreService);
    windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(preferredStoreService).toBeDefined();
  });

  describe('getPreferredStore', () => {
    it('should return the preferred store', () => {
      const preferredStore = 'preferredStore';
      windowRef.localStorage?.setItem('preferred_store', preferredStore);
      expect(preferredStoreService.getPreferredStore()).toEqual(preferredStore);
    });
  });

  describe('setPreferredStore', () => {
    it('should set the preferred store', () => {
      const preferredStore = 'preferredStore';
      preferredStoreService.setPreferredStore(preferredStore);
      expect(windowRef.localStorage?.getItem('preferred_store')).toEqual(
        preferredStore
      );
    });
  });

  describe('clearPreferredStore', () => {
    it('should clear the preferred store', () => {
      windowRef.localStorage?.setItem('preferred_store', 'preferredStore');
      preferredStoreService.clearPreferredStore();
      expect(windowRef.localStorage?.getItem('preferred_store')).toBeNull();
    });
  });
});
