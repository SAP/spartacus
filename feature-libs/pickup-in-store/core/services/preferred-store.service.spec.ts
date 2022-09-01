import { TestBed } from '@angular/core/testing';
import { ConsentService, WindowRef } from '@spartacus/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { PickupInStoreConfig } from '../config';
import { MockPickupLocationsSearchService } from '../facade/pickup-locations-search.service.spec';
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
  const preferredStore: PointOfServiceNames = {
    name: 'London School',
    displayName: 'London School',
  };
  let preferredStoreService: PreferredStoreService;
  let consentService: ConsentService;
  let windowRef: WindowRef;
  let pickupLocationSearchService: PickupLocationsSearchFacade;

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
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchService,
        },
      ],
    });

    preferredStoreService = TestBed.inject(PreferredStoreService);
    consentService = TestBed.inject(ConsentService);
    windowRef = TestBed.inject(WindowRef);
    pickupLocationSearchService = TestBed.inject(PickupLocationsSearchFacade);
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

    it('should get store with stock for a product code', () => {
      const preferredStore = {
        name: 'storeName',
        displayName: 'storeDisplayName',
      };
      const productCode = 'P001';

      spyOn(preferredStoreService, 'getPreferredStore').and.returnValue(
        preferredStore
      );
      spyOn(pickupLocationSearchService, 'stockLevelAtStore').and.callThrough();
      spyOn(
        pickupLocationSearchService,
        'getStockLevelAtStore'
      ).and.returnValue(of({ stockLevelStatus: 'inStock' }));

      const preferredStoreWithStock =
        preferredStoreService.getPreferredStoreWithProductInStock(productCode);

      expect(preferredStoreWithStock).toBeObservable(
        cold('(a|)', { a: preferredStore })
      );
      expect(
        pickupLocationSearchService.stockLevelAtStore
      ).toHaveBeenCalledWith(productCode, preferredStore.name);
      expect(
        pickupLocationSearchService.getStockLevelAtStore
      ).toHaveBeenCalledWith(productCode, preferredStore.name);
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
  getPreferredStoreWithProductInStock(): void {}
}
