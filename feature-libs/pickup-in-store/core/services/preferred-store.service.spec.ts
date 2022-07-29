import { TestBed } from '@angular/core/testing';
import { ConsentService, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PickupInStoreConfig } from '../config';
import {
  PointOfServiceNames,
  PreferredStoreService,
} from './preferred-store.service';

class MockConsentService {
  checkConsentGivenByTemplateId(_templateId: string): Observable<boolean> {
    return of(true);
  }
}

const MockPickupInStoreConfig = (withConfig = true): PickupInStoreConfig => {
  return withConfig
    ? {
        pickupInStore: {
          consentTemplateId: 'STORE_USER_INFORMATION',
        },
      }
    : {};
};

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
  let consentService: ConsentService;
  let windowRef: WindowRef;
  const preferredStore: PointOfServiceNames = {
    name: 'London School',
    displayName: 'London School',
  };

  const configureTestingModule = (withConfig = true, localStorage = true) => {
    TestBed.configureTestingModule({
      providers: [
        PreferredStoreService,
        { provide: ConsentService, useClass: MockConsentService },
        {
          provide: PickupInStoreConfig,
          useValue: MockPickupInStoreConfig(withConfig),
        },
        { provide: WindowRef, useValue: localStorage ? MockWindowRef() : {} },
      ],
    });

    preferredStoreService = TestBed.inject(PreferredStoreService);
    consentService = TestBed.inject(ConsentService);
    windowRef = TestBed.inject(WindowRef);
  };

  describe('with pickup in store config', () => {
    beforeEach(() => {
      configureTestingModule();
    });

    it('should be created', () => {
      expect(preferredStoreService).toBeDefined();
    });

    describe('getPreferredStore', () => {
      it('should return the preferred store', () => {
        windowRef.localStorage?.setItem(
          'preferred_store',
          JSON.stringify(preferredStore)
        );
        expect(preferredStoreService.getPreferredStore()).toEqual(
          preferredStore
        );
      });
    });

    describe('setPreferredStore', () => {
      it('should set the preferred store if consent is given', () => {
        spyOn(consentService, 'checkConsentGivenByTemplateId').and.returnValue(
          of(true)
        );
        preferredStoreService.setPreferredStore(preferredStore);
        const result = JSON.parse(
          windowRef.localStorage?.getItem('preferred_store') as string
        );
        expect(result.name).toEqual(preferredStore.name);
        expect(result.displayName).toEqual(preferredStore.displayName);
        expect(result).toEqual(preferredStore);
      });

      it('should not set the preferred store if consent is not', () => {
        spyOn(consentService, 'checkConsentGivenByTemplateId').and.returnValue(
          of(false)
        );
        preferredStoreService.setPreferredStore(preferredStore);
        expect(windowRef.localStorage?.getItem('preferred_store')).toBeNull();
      });
    });

    describe('clearPreferredStore', () => {
      it('should clear the preferred store', () => {
        windowRef.localStorage?.setItem('preferred_store', 'preferredStore');
        preferredStoreService.clearPreferredStore();
        expect(windowRef.localStorage?.getItem('preferred_store')).toBeNull();
      });
    });

    describe('onDestroy', () => {
      it('should unsubscribe onDestroy', () => {
        preferredStoreService.setPreferredStore(preferredStore);
        spyOn(preferredStoreService.subscription, 'unsubscribe');
        preferredStoreService.ngOnDestroy();
        expect(
          preferredStoreService.subscription.unsubscribe
        ).toHaveBeenCalled();
      });
    });
  });

  describe('without pickup in store config', () => {
    beforeEach(() => {
      configureTestingModule(false);
    });

    it('setPreferredStore should not set preferred store if consent template config is not set', () => {
      spyOn(consentService, 'checkConsentGivenByTemplateId').and.returnValue(
        of(false)
      );
      preferredStoreService.setPreferredStore(preferredStore);
      expect(consentService.checkConsentGivenByTemplateId).toHaveBeenCalledWith(
        ''
      );
      expect(windowRef.localStorage?.getItem('preferred_store')).toBeNull();
    });
  });

  describe('local Storage is not available', () => {
    beforeEach(() => configureTestingModule(false, false));

    it('setPreferredStore should not set preferredStore', () => {
      spyOn(consentService, 'checkConsentGivenByTemplateId').and.returnValue(
        of(true)
      );
      expect(
        preferredStoreService.setPreferredStore({
          name: 'London School',
          displayName: 'London School',
        })
      ).not.toBeDefined();
    });

    it('getPreferred Store to be undefined', () => {
      expect(preferredStoreService.getPreferredStore()).toBeUndefined();
    });
  });

  it('clearPreferredStore should be void', () => {
    expect(preferredStoreService.clearPreferredStore()).toBeUndefined();
  });
});

export class MockPreferredStoreService {
  getPreferredStore(): PointOfServiceNames | undefined {
    return { name: 'London School', displayName: 'London School' };
  }
  setPreferredStore(_preferredStore: PointOfServiceNames): void {}
  clearPreferredStore(): void {}
}
