import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { CmsService, I18nTestingModule, Page } from '@spartacus/core';
import {
  AugmentedPointOfService,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
  PickupOption,
  PickupOptionFacade,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { MockPickupLocationsSearchService } from '../../../core/facade/pickup-locations-search.service.spec';
import { MockPickupOptionFacade } from '../../../core/facade/pickup-option.service.spec';
import { MockPreferredStoreService } from '../../../core/services/preferred-store.service.spec';
import { PickupOptionsStubComponent } from '../../presentational/pickup-options/pickup-options.component.spec';
import { MockLaunchDialogService } from '../pickup-option-dialog/pickup-option-dialog.component.spec';
import {
  CartPickupOptionsContainerComponent,
  orderEntryWithRequiredFields,
} from './cart-pickup-options-container.component';

class MockPickupLocationsSearchFacade extends MockPickupLocationsSearchService {
  getStoreDetails = () =>
    of({
      displayName: 'London School',
      name: 'London School',
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
  updateEntry(
    _entryNumber: number,
    _quantity: number,
    _pickupInStore: string,
    _pickupLocation?: boolean
  ): void {}
  getEntries(): Observable<OrderEntry[]> {
    return of([]);
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
  updateEntry(
    _entryNumber: number,
    _quantity: number,
    _pickupInStore: string,
    _pickupLocation?: boolean
  ): void {}
  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
}

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of({ pageId: 'test-page-id' });
  }
}

const mockOutletContext: { item: OrderEntry; cartType: string } = {
  item: {
    product: {
      code: 'productCode1',
      availableForPickup: true,
    },
    entryNumber: 1,
    quantity: 1,
    deliveryPointOfService: {
      name: 'London School',
    },
  },
  cartType: 'cart',
};

const context$ = of(mockOutletContext);

class MockIntendedPickupLocationFacade {
  getIntendedLocation(
    _productCode: string
  ): Observable<AugmentedPointOfService | undefined> {
    const result: AugmentedPointOfService = {
      pickupOption: 'pickup',
      displayName: 'London School',
    };
    return of(result);
  }
  setIntendedLocation(
    _productCode: string,
    _location: AugmentedPointOfService
  ): void {}
}

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
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: PreferredStoreFacade,
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
        {
          provide: IntendedPickupLocationFacade,
          useClass: MockIntendedPickupLocationFacade,
        },
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

    it('should check call update Entry on pickup option change when option is pickup', fakeAsync(() => {
      const entryNumber = 2;
      const pickupOption: PickupOption = 'pickup';
      const quantity = 3;

      component.entryNumber = entryNumber;
      component.quantity = quantity;
      component['displayNameIsSet'] = false;

      spyOn(pickupOptionService, 'setPickupOption');
      spyOn(activeCartService, 'updateEntry');

      component.onPickupOptionChange(pickupOption);
      expect(pickupOptionService.setPickupOption).toHaveBeenCalledWith(
        entryNumber,
        pickupOption
      );

      tick();

      expect(activeCartService.updateEntry).toHaveBeenCalledWith(
        entryNumber,
        quantity,
        'London School',
        true
      );
    }));

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
      const {
        deliveryPointOfService: _,
        ...mockOutletContextItemsForDelivery
      } = mockOutletContext.item;
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: {
            context$: of({
              item: mockOutletContextItemsForDelivery,
              cartType: 'cart',
            }),
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
              item: {
                ...mockOutletContext.item,
                product: {
                  ...mockOutletContext.item.product,
                  availableForPickup: false,
                },
              },
              cartType: 'cart',
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

  describe('with context without order entry', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(OutletContextData, {
          useValue: {
            context$: of({
              item: {
                ...mockOutletContext.item,
                product: {
                  ...mockOutletContext.item.product,
                  availableForPickup: false,
                },
              },
              cartType: 'cart',
            } as OrderEntry),
          },
        })
        .compileComponents();
      stubServiceAndCreateComponent();
    });

    it('should set value for disableControls', (done) => {
      const mockEntries = [
        { product: { code: 'ABC' } },
        { product: { code: 'DEF' } },
      ];
      spyOn(activeCartService, 'getEntries').and.returnValue(of(mockEntries));
      component.disableControls$.subscribe((result) => {
        expect(result).toBe(false);
        done();
      });
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
});
