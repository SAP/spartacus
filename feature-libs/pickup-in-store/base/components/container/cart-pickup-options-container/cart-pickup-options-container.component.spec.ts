import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { CmsService, I18nTestingModule, Page } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/base/core';
import {
  PickupLocationsSearchFacade,
  PickupOptionFacade,
} from '@spartacus/pickup-in-store/base/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { MockPickupLocationsSearchService } from 'feature-libs/pickup-in-store/core/facade/pickup-locations-search.service.spec';
import { MockPreferredStoreService } from 'feature-libs/pickup-in-store/core/services/preferred-store.service.spec';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { MockPickupOptionFacade } from '../../../core/facade/pickup-option.service.spec';
import { PickupOptionsStubComponent } from '../../presentational/pickup-options/pickup-options.component.spec';
import { MockLaunchDialogService } from '../pickup-option-dialog/pickup-option-dialog.component.spec';
import {
  CartPickupOptionsContainerComponent,
  cartWithIdAndUserId,
  orderEntryWithRequiredFields,
} from './cart-pickup-options-container.component';

class MockPickupLocationsSearchFacade extends MockPickupLocationsSearchService {
  getStoreDetails = () =>
    of({
      displayName: 'London School',
    });
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
      entries: [{ entryNumber: 0, product: { name: 'productCode1' } }],
    });
  }
}

export class MockAnonymousUserActiveCartFacade
  implements Partial<ActiveCartFacade>
{
  getActive(): Observable<Cart> {
    return of({
      name: 'test-active-cart',
      code: 'test-active-cart-code',
      guid: 'cartGuid',
      user: {
        uid: 'anonymous',
      },
      entries: [{ entryNumber: 0, product: { name: 'productCode1' } }],
    });
  }
}

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of();
  }
}

const mockOutletContext: OrderEntry = {
  product: {
    code: 'productCode1',
    availableForPickup: true,
  },
  entryNumber: 1,
  quantity: 1,
  deliveryPointOfService: {
    name: 'London School',
  },
};

const context$ = of(mockOutletContext);

describe('CartPickupOptionsContainerComponent', () => {
  let component: CartPickupOptionsContainerComponent;
  let fixture: ComponentFixture<CartPickupOptionsContainerComponent>;
  let activeCartService: ActiveCartFacade;
  let launchDialogService: LaunchDialogService;
  let pickupOptionService: PickupOptionFacade;

  const configureTestingModule = () =>
    TestBed.configureTestingModule({
      declarations: [
        CartPickupOptionsContainerComponent,
        PickupOptionsStubComponent,
      ],
      imports: [CommonModule, I18nTestingModule],
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
        {
          provide: PickupOptionFacade,
          useClass: MockPickupOptionFacade,
        },
        { provide: CmsService, useClass: MockCmsService },
      ],
    });

  const stubServiceAndCreateComponent = () => {
    fixture = TestBed.createComponent(CartPickupOptionsContainerComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    activeCartService = TestBed.inject(ActiveCartFacade);
    pickupOptionService = TestBed.inject(PickupOptionFacade);
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
        { productCode: 'productCode1', entryNumber: 1, quantity: 1 }
      );
    });

    it('should not openDialog if display name is not set and ship it is selected', () => {
      spyOn(component, 'openDialog');
      component['displayNameIsSet'] = false;
      component.onPickupOptionChange('delivery');
      expect(component.openDialog).not.toHaveBeenCalled();
    });

    it('should openDialog if display name is set and pickup is selected', () => {
      spyOn(component, 'openDialog');
      component['displayNameIsSet'] = false;
      component.onPickupOptionChange('pickup');
      expect(component.openDialog).toHaveBeenCalled();
    });

    it('should set cartId to active cart id', () => {
      spyOn(activeCartService, 'getActive').and.callThrough();
      component.ngOnInit();
      expect(component['cartId']).toBe('test-active-cart-code');
    });

    it('should call getPreferredStoreWithProductInStock', () => {
      spyOn(activeCartService, 'getActive').and.callThrough();
      component.ngOnInit();
      expect(component['cartId']).toBe('test-active-cart-code');
    });

    it('should set the pickupOption to pickup', () => {
      expect(component.pickupOption$).toBeObservable(
        cold('(a|)', { a: 'pickup' })
      );
    });
  });

  describe('with context of an order entry for delivery', () => {
    beforeEach(() => {
      const { deliveryPointOfService: _, ...mockOutletContextForDelivery } =
        mockOutletContext;
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: {
            context$: of(mockOutletContextForDelivery),
          },
        })
        .overrideProvider(ActiveCartFacade, {
          useValue: new MockAnonymousUserActiveCartFacade(),
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should set the pickupOption to delivery', () => {
      spyOn(pickupOptionService, 'getPickupOption').and.returnValue(
        of('delivery')
      );
      expect(component.pickupOption$).toBeObservable(
        cold('(a|)', { a: 'delivery' })
      );
    });
  });

  describe('with context of an order entry not available for pickup', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: {
            context$: of({
              ...mockOutletContext,
              product: {
                ...mockOutletContext.product,
                availableForPickup: false,
              },
            } as OrderEntry),
          },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should display nothing', () => {
      expect(fixture.debugElement.children.length).toEqual(0);
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

describe('CartPickupOptionsContainerComponent filters', () => {
  describe('orderEntryWithRequiredFields', () => {
    it('should return true if all required fields are present', () => {
      const result = orderEntryWithRequiredFields({
        entryNumber: 0,
        quantity: 1,
        product: {
          code: 'productCode1',
          availableForPickup: true,
        },
      });
      expect(result).toEqual(true);
    });

    it('should return false if entryNumber is not present', () => {
      const result = orderEntryWithRequiredFields({
        quantity: 1,
        product: {
          code: 'productCode1',
          availableForPickup: true,
        },
      });
      expect(result).toEqual(false);
    });

    it('should return false if quantity is not present', () => {
      const result = orderEntryWithRequiredFields({
        entryNumber: 0,
        product: {
          code: 'productCode1',
          availableForPickup: true,
        },
      });
      expect(result).toEqual(false);
    });

    it('should return false if product is not present', () => {
      const result = orderEntryWithRequiredFields({
        entryNumber: 0,
        quantity: 1,
      });
      expect(result).toEqual(false);
    });

    it('should return false if product is present without a code', () => {
      const result = orderEntryWithRequiredFields({
        entryNumber: 0,
        quantity: 1,
        product: {
          availableForPickup: true,
        },
      });
      expect(result).toEqual(false);
    });

    it('should return false if product is present without an availableForPickup flag', () => {
      const result = orderEntryWithRequiredFields({
        entryNumber: 0,
        quantity: 1,
        product: {
          code: 'productCode1',
        },
      });
      expect(result).toEqual(false);
    });
  });

  describe('cartWithIdAndUserId', () => {
    it('should return true if cartId and userId are present', () => {
      const result = cartWithIdAndUserId({
        guid: 'cartGuid',
        code: 'cartCode',
        user: {
          uid: 'userId',
        },
      });
      expect(result).toEqual(true);
    });

    it('should return false if cartId is not present', () => {
      const result = cartWithIdAndUserId({
        user: {
          uid: 'userId',
        },
      });
      expect(result).toEqual(false);
    });

    it('should return false if userId is not present', () => {
      const result = cartWithIdAndUserId({
        guid: 'cartGuid',
      });
      expect(result).toEqual(false);
    });
  });
});
