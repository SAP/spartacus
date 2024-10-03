import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { WindowRef } from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  PointOfServiceNames,
} from '@spartacus/pickup-in-store/root';
import { Observable, of } from 'rxjs';
import { PickupInStoreConfig } from '../config';
import { MockPickupLocationsSearchService } from '../facade/pickup-locations-search.service.spec';

import * as fromReducers from '../../core/store/reducers/index';
import { StateWithPickupLocations } from '../store';
import { SetDefaultPointOfService } from '../store/actions/default-point-of-service-name.action';
import { PreferredStoreService } from './preferred-store.service';

export class MockConsentService {
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

export const MockWindowRef = () => {
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
  let preferredStoreFacade: PreferredStoreService;
  let windowRef: WindowRef;
  let pickupLocationSearchService: PickupLocationsSearchFacade;
  let store: Store<StateWithPickupLocations>;

  const configureTestingModule = (withConfig = true, localStorage = true) => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('pickup-option', fromReducers.getReducers()),
      ],
      providers: [
        PreferredStoreService,
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

    preferredStoreFacade = TestBed.inject(PreferredStoreService);
    windowRef = TestBed.inject(WindowRef);
    pickupLocationSearchService = TestBed.inject(PickupLocationsSearchFacade);

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.callThrough();
  };

  describe('with pickup in store config', () => {
    beforeEach(() => {
      configureTestingModule();
    });

    it('should be created', () => {
      expect(preferredStoreFacade).toBeDefined();
    });

    describe('getPreferredStore$', () => {
      it('should get the preferred store ', () => {
        preferredStoreFacade.getPreferredStore$();
        expect(store.pipe).toHaveBeenCalled();
      });
    });

    describe('setPreferredStore', () => {
      it('should dispatch action to set default point of service', () => {
        preferredStoreFacade.setPreferredStore(preferredStore);
        expect(store.dispatch).toHaveBeenCalledWith(
          SetDefaultPointOfService({ payload: preferredStore })
        );
      });
    });

    describe('clearPreferredStore', () => {
      it('should clear the preferred store', () => {
        windowRef.localStorage?.setItem('preferred_store', 'preferredStore');
        preferredStoreFacade.clearPreferredStore();
        expect(windowRef.localStorage?.getItem('preferred_store')).toBeNull();
      });
    });

    it('should get store with stock for a product code', () => {
      const preferredStore = {
        name: 'storeName',
        displayName: 'storeDisplayName',
      };
      const productCode = 'P001';

      spyOn(preferredStoreFacade, 'getPreferredStore$').and.returnValue(
        of(preferredStore)
      );
      spyOn(pickupLocationSearchService, 'stockLevelAtStore').and.callThrough();
      spyOn(
        pickupLocationSearchService,
        'getStockLevelAtStore'
      ).and.returnValue(of({ stockLevelStatus: 'inStock' }));

      const preferredStoreWithStock =
        preferredStoreFacade.getPreferredStoreWithProductInStock(productCode);

      preferredStoreWithStock.subscribe((value) =>
        expect(value).toEqual(preferredStore)
      );
      expect(
        pickupLocationSearchService.stockLevelAtStore
      ).toHaveBeenCalledWith(productCode, preferredStore.name);
      expect(
        pickupLocationSearchService.getStockLevelAtStore
      ).toHaveBeenCalledWith(productCode, preferredStore.name);
    });
  });

  it('clearPreferredStore should be void', () => {
    expect(preferredStoreFacade.clearPreferredStore()).toBeUndefined();
  });

  describe('without localStorage', () => {
    beforeEach(() => {
      configureTestingModule(false, false);
    });
    it('clearPreferredStore should be void', () => {
      preferredStoreFacade.clearPreferredStore();
      expect(preferredStoreFacade.clearPreferredStore()).toBeUndefined();
    });
  });
});

export class MockPreferredStoreService {
  getPreferredStore$(): Observable<PointOfServiceNames | undefined> {
    return of({ name: 'London School', displayName: 'London School' });
  }
  setPreferredStore(_preferredStore: PointOfServiceNames): void {}
  clearPreferredStore(): void {}
  getPreferredStoreWithProductInStock(): Observable<PointOfServiceNames> {
    return of({ name: 'London School', displayName: 'London School' });
  }
}
