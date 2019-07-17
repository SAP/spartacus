import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
import { takeWhile } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';
import { CheckoutConfigService } from '../../checkout-config.service';
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
  loadDetails(): void {}
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
    return 'checkout/delivery-mode';
  }
  getPreviousCheckoutStepUrl(): string {
    return 'cart';
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

fdescribe('ShippingAddressComponent', () => {
  let component: ShippingAddressComponent;
  let fixture: ComponentFixture<ShippingAddressComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;
  let mockUserAddressService: UserAddressService;
  let mockRoutingService: MockRoutingService;

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

    mockCheckoutDeliveryService = TestBed.get(CheckoutDeliveryService);
    mockRoutingService = TestBed.get(RoutingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressComponent);
    component = fixture.componentInstance;
    mockUserAddressService = TestBed.get(UserAddressService);

    spyOn(component, 'addAddress').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get existing address if they do not exist', done => {
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

  it('should call ngOnInit to get existing address if they exist', () => {
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
      })
      .unsubscribe();

    component.selectedAddress$
      .pipe(takeWhile(selectedAddress => selectedAddress !== null))
      .subscribe(selectedAddress => {
        expect(selectedAddress).toEqual(mockAddress2);
      })
      .unsubscribe();
  });

  it('should call showNewAddressForm()', () => {
    component.showNewAddressForm();
    expect(component.newAddressFormManuallyOpened).toEqual(true);
  });

  it('should call hideNewAddressForm()', () => {
    component.hideNewAddressForm();
    expect(component.newAddressFormManuallyOpened).toEqual(false);
  });

  it('should call goPrevious()', () => {
    const mockPreviousStepUrl = 'cart';
    component.goPrevious();
    expect(mockRoutingService.go).toHaveBeenCalledWith(mockPreviousStepUrl);
  });

  it('should call goNext()', () => {
    const mockPreviousStepUrl = 'checkout/delivery-mode';
    component.goNext();
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

    // mockAddresses array contains an address that is default so it will be selected
    component.cards$
      .subscribe(cards => {
        expect(cards.length).toEqual(2);
      })
      .unsubscribe();

    component.selectedAddress$
      .pipe(takeWhile(selectedAddress => selectedAddress !== null))
      .subscribe(selectedAddress => {
        expect(selectedAddress).toEqual(mockAddress2);
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
    component.selectAddress(mockAddress1);
    //The logic in the card$ subscription should keep the current selection
    component.cards$
      .subscribe(cards => {
        expect(cards.length).toEqual(2);
      })
      .unsubscribe();

    component.selectedAddress$
      .pipe(takeWhile(selectedAddress => selectedAddress !== null))
      .subscribe(selectedAddress => {
        expect(selectedAddress).toEqual(mockAddress1);
      })
      .unsubscribe();
  });

  it('should set newly created address', () => {
    component.addAddress(mockAddress1);
    expect(
      mockCheckoutDeliveryService.createAndSetAddress
    ).toHaveBeenCalledWith(mockAddress1);
  });

  it('should call addAddress() with address selected from existing addresses', () => {
    component.addAddress(mockAddress1);
    expect(
      mockCheckoutDeliveryService.createAndSetAddress
    ).toHaveBeenCalledWith(mockAddress1);

    component.existingAddresses$
      .subscribe(() => {
        expect(
          mockCheckoutDeliveryService.createAndSetAddress
        ).not.toHaveBeenCalledWith(mockAddress1);
        expect(
          mockCheckoutDeliveryService.setDeliveryAddress
        ).toHaveBeenCalledWith(mockAddress1);
      })
      .unsubscribe();
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
      component.ngOnInit();

      component.selectedAddress$
        .subscribe(selectedAddress => {
          fixture.detectChanges();
          expect(selectedAddress).toBeNull();
          expect(getContinueBtn().nativeElement.disabled).toEqual(true);
        })
        .unsubscribe();
    });

    it('should be enabled when address is selected', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      component.selectAddress(mockAddress1);

      component.selectedAddress$
        .subscribe(selectedAddress => {
          fixture.detectChanges();
          expect(selectedAddress).not.toBeNull();
          expect(getContinueBtn().nativeElement.disabled).toEqual(false);
        })
        .unsubscribe();
    });

    it('should call "next" function after being clicked', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      component.selectAddress(mockAddress1);
      component.selectedAddress$.subscribe(() => {
        fixture.detectChanges();
      });

      fixture.detectChanges();
      spyOn(component, 'goNext');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.goNext).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(el => el.nativeElement.innerText === 'checkout.backToCart');

    it('should call "goPrevious" function after being clicked', () => {
      spyOn(mockUserAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(mockUserAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      spyOn(component, 'goPrevious');
      getBackBtn().nativeElement.click();
      expect(component.goPrevious).toHaveBeenCalled();
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
