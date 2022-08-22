import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { Observable, of } from 'rxjs';
import { MockLaunchDialogService } from '../pickup-delivery-option-dialog/pickup-delivery-option-dialog.component.spec';
import { CartPickupOptionsContainerComponent } from './cart-pickup-options-container.component';

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

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return of({
      name: 'test-active-cart',
      code: 'test-active-cart-code',
      guid: 'cartGuid',
      user: {
        uid: 'test-user-id',
      },
      entries: [
        { entryNumber: 0, product: { name: 'test-product1' } },
        { entryNumber: 1, product: { name: 'test-product2' } },
        { entryNumber: 2, product: { name: 'test-product3' } },
      ],
    });
  }
}

const mockOutletContextWithProductCode = {
  product: {
    code: 'productCode',
    availableForPickup: true,
  },
  entryNumber: 1,
  quantity: 1,
  deliveryPointOfService: {
    name: 'London School',
  },
};

const context$ = of(mockOutletContextWithProductCode);

describe('CartPickupOptionsContainerComponent', () => {
  let component: CartPickupOptionsContainerComponent;
  let fixture: ComponentFixture<CartPickupOptionsContainerComponent>;
  let activeCartService: ActiveCartFacade;
  let launchDialogService: LaunchDialogService;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
      providers: [
        CartPickupOptionsContainerComponent,
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
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
    activeCartService = TestBed.inject(ActiveCartFacade);

    spyOn(launchDialogService, 'openDialog').and.callThrough();

    fixture.detectChanges();
  };

  describe('with context of an order entry', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: {
            context$,
          },
        })
        .compileComponents();
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
        { productCode: 'productCode', entryNumber: 1, quantity: 1 }
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

  // TODO check value of these tests
  describe('with context of an incomplete order entry', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: {
            context$: of({}),
          },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it("should not set product code if it doesn't exists on context", () => {
      component.ngOnInit();
      expect(component.productCode).toBeUndefined();
    });

    it("should not set cart id if it doesn't exists on context", () => {
      component.ngOnInit();
      expect(component.cartId).toBeUndefined();
    });

    it("should not set user id if it doesn't exists on context", () => {
      component.ngOnInit();
      expect(component.userId).toBeUndefined();
    });
  });

  describe('without context', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should display nothing', () => {
      expect(fixture.debugElement.children.length).toEqual(0);
    });
  });
});
