import { CommonModule } from '@angular/common';
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
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { MockLaunchDialogService } from '../pickup-delivery-option-dialog/pickup-delivery-option-dialog.component.spec';
class MockPickupLocationsSearchFacade
  implements Partial<MockPickupLocationsSearchService>
{
  getStoreDetails = () =>
    of({
      displayName: 'London School',
    });
  setPickupOptionDelivery(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _name: string,
    _productCode: string,
    _quantity: number
  ): void {}
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
