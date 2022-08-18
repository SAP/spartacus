import { CommonModule } from '@angular/common';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MockIntendedPickupLocationService } from '../../../core/facade/intended-pickup-location.service.spec';
import { CartPickupOptionsContainerComponent } from './cart-pickup-options-container.component';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';

import createSpy = jasmine.createSpy;

class MockPickupLocationsSearchFacade implements PickupLocationsSearchFacade {
  startSearch = createSpy();
  hasSearchStarted = createSpy();
  isSearchRunning = createSpy();
  getSearchResults = createSpy().and.returnValue(
    of([
      {
        name: 'preferredStore',
        stockInfo: {
          stockLevel: 12,
        },
      },
    ])
  );
  clearSearchResults = createSpy();
  getHideOutOfStock = createSpy();
  setBrowserLocation = createSpy();
  toggleHideOutOfStock = createSpy();
  stockLevelAtStore = createSpy();
  getStockLevelAtStore = createSpy().and.returnValue(
    of({ stockLevel: { displayName: 'London School' } })
  );
  getStoreDetails = () =>
    of({
      displayName: 'London School',
    });
  loadStoreDetails = createSpy();
  setPickupOptionDelivery = createSpy();
  setPickupOptionInStore = createSpy();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }

  get dialogClose(): Observable<string | undefined> {
    return of(undefined);
  }
}

const mockActiveCart: Cart = {
  name: 'test-active-cart',
  code: 'test-active-cart-code',
  guid: 'cartGuid',
  entries: [
    { entryNumber: 0, product: { name: 'test-product' } },
    { entryNumber: 1, product: { name: 'test-product1' } },
    { entryNumber: 2, product: { name: 'test-product1' } },
  ],
};

const activeCart$ = new BehaviorSubject<Cart>(mockActiveCart);

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return activeCart$.asObservable();
  }
}

const mockOutletContextWithProductCode = {
  product: {
    code: 'productCode',
  },
  deliveryPointOfService: {
    name: 'London School',
  },
};

const context$ = of(mockOutletContextWithProductCode);

describe('Cart PickupOptionsComponent', () => {
  let component: CartPickupOptionsContainerComponent;
  let fixture: ComponentFixture<CartPickupOptionsContainerComponent>;
  let activeCartService: ActiveCartFacade;
  let intendedPickupLocationService: IntendedPickupLocationFacade;
  let launchDialogService: LaunchDialogService;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
      providers: [
        CartPickupOptionsContainerComponent,
        {
          provide: OutletContextData,
          useValue: { context$ },
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: PreferredStoreService,
          useClass: MockPreferredStoreService,
        },
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchFacade,
        },
      ],
      declarations: [CartPickupOptionsContainerComponent],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(CartPickupOptionsContainerComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    intendedPickupLocationService = TestBed.inject(
      IntendedPickupLocationFacade
    );
    activeCartService = TestBed.inject(ActiveCartFacade);

    spyOn(launchDialogService, 'openDialog').and.callThrough();
    spyOn(
      intendedPickupLocationService,
      'removeIntendedLocation'
    ).and.callThrough();
    spyOn(intendedPickupLocationService, 'setIntendedLocation');

    fixture.detectChanges();
  };

  describe('with item data in context', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should trigger and open dialog', () => {
      component.openDialog();
      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.PICKUP_IN_STORE,
        component.element,
        component['vcr'],
        { productCode: 'productCode' }
      );
    });
    it('onPickupOptionChange where option is delivery', () => {
      spyOn(intendedPickupLocationService, 'getIntendedLocation');

      component['productCode'] = 'productCode';
      component.onPickupOptionChange('delivery');

      expect(
        intendedPickupLocationService.removeIntendedLocation
      ).toHaveBeenCalledWith('productCode');
    });

    it('onPickupOptionChange where option is pickup', () => {
      component['displayNameIsSet'] = true;
      component.onPickupOptionChange('delivery');
      expect(
        intendedPickupLocationService.setIntendedLocation
      ).toHaveBeenCalled();
    });
    it('should openDialog if display name is not set', () => {
      spyOn(component, 'openDialog');
      component['displayNameIsSet'] = false;
      component.onPickupOptionChange('delivery');
      expect(component.openDialog).toHaveBeenCalled();
    });

    it('should set cartId to active cart id', () => {
      spyOn(activeCartService, 'getActive').and.callThrough();
      component.ngOnInit();
      expect(component['cartId']).toBe('cartGuid');
    });
  });

  describe('without item data in context', () => {
    beforeEach(() => {
      configureTestingModule().overrideProvider(OutletContextData, {
        useValue: {
          context$: of({}),
        },
      });
      TestBed.compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should not set product Code if it doesnt exists on context', () => {
      component.ngOnInit();
      expect(component['productCode']).toBe('');
    });
  });
});
