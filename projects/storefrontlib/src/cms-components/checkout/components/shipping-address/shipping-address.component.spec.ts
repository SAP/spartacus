import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  Address,
  CartService,
  CheckoutDeliveryService,
  I18nTestingModule,
  RoutingService,
  UserAddressService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { ShippingAddressComponent } from './shipping-address.component';

import createSpy = jasmine.createSpy;

class MockUserAddressService {
  getAddresses(): Observable<Address[]> {
    return of([]);
  }
  getAddressesLoading(): Observable<boolean> {
    return of();
  }
  loadAddresses(): void {}
}

class MockCartService {
  isGuestCart(): Boolean {
    return false;
  }
}

class MockCheckoutDeliveryService {
  createAndSetAddress = createSpy();
  setDeliveryAddress = createSpy();
  getDeliveryAddress(): Observable<Address> {
    return of(null);
  }
}

class MockRoutingService {
  go = createSpy();
}

class MockCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return '';
  }
  getPreviousCheckoutStepUrl(): string {
    return '';
  }
}

const mockAddress1: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'first line',
  line2: 'second line',
  town: 'town',
  id: 'id',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};

const mockAddress2: Address = {
  firstName: 'Alice',
  lastName: 'Smith',
  titleCode: 'mrs',
  line1: 'other first line',
  line2: 'other second line',
  town: 'other town',
  id: 'id2',
  region: { isocode: 'JP-27' },
  postalCode: 'other zip',
  country: { isocode: 'JP' },
  defaultAddress: true,
};

const mockAddresses: Address[] = [mockAddress1, mockAddress2];

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'delivery-mode'],
  },
};

@Component({
  selector: 'cx-address-form',
  template: '',
})
class MockAddressFormComponent {
  @Input() cancelBtnLabel: string;
  @Input() showTitleCode: boolean;
  @Input() setAsDefaultField: boolean;
  @Input() addressData: Address;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  border: boolean;
  @Input()
  content: Card;
  @Input()
  fitToContainer: boolean;
}

describe('ShippingAddressComponent', () => {
  let component: ShippingAddressComponent;
  let fixture: ComponentFixture<ShippingAddressComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;
  let mockUserAddressService: UserAddressService;
  let mockRoutingService: MockRoutingService;
  let mockCartService: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        ShippingAddressComponent,
        MockAddressFormComponent,
        MockCardComponent,
        MockSpinnerComponent,
      ],
      providers: [
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: CartService, useClass: MockCartService },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
      .overrideComponent(ShippingAddressComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    mockCheckoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
      CheckoutDeliveryService
    >);
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
    mockCartService = TestBed.get(CartService as Type<CartService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressComponent);
    component = fixture.componentInstance;
    mockUserAddressService = TestBed.get(UserAddressService as Type<
      UserAddressService
    >);

    spyOn(component, 'addNewAddress').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('should call ngOnInit to get user addresses', () => {
    it('for login user, should load user addresses if they do not exist', done => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(of([]));
      spyOn(mockUserAddressService, 'loadAddresses').and.stub();

      component.ngOnInit();
      component.existingAddresses$
        .subscribe(() => {
          expect(mockUserAddressService.loadAddresses).toHaveBeenCalled();
          done();
        })
        .unsubscribe();
    });

    it('for guest user, should not load user addresses', done => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(of([]));
      spyOn(mockCartService, 'isGuestCart').and.returnValue(true);
      spyOn(mockUserAddressService, 'loadAddresses').and.stub();

      component.ngOnInit();
      component.existingAddresses$
        .subscribe(() => {
          expect(mockUserAddressService.loadAddresses).not.toHaveBeenCalled();
          done();
        })
        .unsubscribe();
    });

    it('should get existing address if they exist', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );
      component.ngOnInit();
      let address: Address[];
      component.existingAddresses$
        .subscribe(data => {
          address = data;
        })
        .unsubscribe();
      expect(address).toBe(mockAddresses);
      component.cards$
        .subscribe(cards => {
          expect(cards.length).toEqual(2);
          expect(cards[1].card.header).toBe('addressCard.selected');
        })
        .unsubscribe();
    });
  });

  it('should call showNewAddressForm()', () => {
    component.showNewAddressForm();
    expect(component.newAddressFormManuallyOpened).toEqual(true);
  });

  it('should call hideNewAddressForm()', () => {
    component.hideNewAddressForm();
    expect(component.newAddressFormManuallyOpened).toEqual(false);
  });

  it('should call back()', () => {
    const mockPreviousStepUrl = 'cart';
    component.checkoutStepUrlPrevious = mockPreviousStepUrl;
    component.back();
    expect(mockRoutingService.go).toHaveBeenCalledWith(mockPreviousStepUrl);
  });

  it('should automatically select default shipping address when there is no current selection', () => {
    spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
      of(false)
    );
    spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
      of(mockAddresses)
    );

    component.ngOnInit();
    let address: Address[];
    component.existingAddresses$
      .subscribe(data => {
        address = data;
      })
      .unsubscribe();
    expect(address).toBe(mockAddresses);

    //mockAddresses array contains an address that is default so it will be selected
    component.cards$
      .subscribe(cards => {
        expect(component.selectedAddress).toEqual(mockAddress2);
        expect(cards.length).toEqual(2);
        expect(cards[1].card.header).toBe('addressCard.selected');
      })
      .unsubscribe();
  });

  it('should NOT automatically select default shipping address when there is a current selection', () => {
    spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
      of(false)
    );
    spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
      of(mockAddresses)
    );

    component.ngOnInit();
    let address: Address[];
    component.existingAddresses$
      .subscribe(data => {
        address = data;
      })
      .unsubscribe();
    expect(address).toBe(mockAddresses);

    //The selected address is the non-default one
    component.addressSelected(mockAddress1);
    //The logic in the card$ subscription should keep the current selection
    component.cards$
      .subscribe(cards => {
        expect(component.selectedAddress).toEqual(mockAddress1);
        expect(cards.length).toEqual(2);
        expect(cards[0].card.header).toBe('addressCard.selected');
      })
      .unsubscribe();
  });

  it('should set newly created address', () => {
    component.addAddress({ address: mockAddress1, newAddress: true });
    expect(
      mockCheckoutDeliveryService.createAndSetAddress
    ).toHaveBeenCalledWith(mockAddress1);
  });

  it('should call addAddress() with address selected from existing addresses', () => {
    component.addAddress({ address: mockAddress1, newAddress: false });
    expect(
      mockCheckoutDeliveryService.createAndSetAddress
    ).not.toHaveBeenCalledWith(mockAddress1);
    expect(mockCheckoutDeliveryService.setDeliveryAddress).toHaveBeenCalledWith(
      mockAddress1
    );
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-primary'))
        .find(el => el.nativeElement.innerText === 'common.continue');

    it('should be disabled when no address is selected', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      mockAddress2.defaultAddress = false;
      component.selectedAddress = null;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should be enabled when address is selected', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );
      component.addressSelected(mockAddress1);
      component.selectedAddress$.subscribe(() => {
        fixture.detectChanges();
      });
      component.selectedAddress = mockAddress1;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      component.addressSelected(mockAddress1);
      component.selectedAddress$.subscribe(() => {
        fixture.detectChanges();
      });
      component.selectedAddress = mockAddress1;
      fixture.detectChanges();
      spyOn(component, 'next');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.next).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(el => el.nativeElement.innerText === 'checkout.backToCart');

    it('should call "back" function after being clicked', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI cards with addresses', () => {
    const getCards = () => fixture.debugElement.queryAll(By.css('cx-card'));

    it('should represent all existing addresses', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existng addresses', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existng addresses are loading', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(true)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new address form', () => {
    const getAddNewAddressBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(
          el => el.nativeElement.innerText === 'checkoutAddress.addNewAddress'
        );
    const getNewAddressForm = () =>
      fixture.debugElement.query(By.css('cx-address-form'));

    it('should render only after user clicks "add new address" button if there are some existing addresses', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();

      getAddNewAddressBtn().nativeElement.click();

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should render on init if there are no existing addresses', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();

      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing addresses', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();

      expect(getNewAddressForm()).toBeFalsy();
    });

    it('should not render when existing addresses are loading', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(true)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();

      expect(getNewAddressForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing addresses are loading', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(true)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();
    });

    it('should NOT render when existing addresses are NOT loading', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});
