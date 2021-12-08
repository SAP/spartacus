import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutCostCenterFacade,
  CheckoutDeliveryFacade,
  PaymentTypeFacade,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Address,
  GlobalMessageService,
  I18nTestingModule,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { ShippingAddressComponent } from './shipping-address.component';
import createSpy = jasmine.createSpy;

class MockUserAddressService {
  getAddresses(): Observable<Address[]> {
    return of(mockAddresses);
  }
  getAddressesLoading(): Observable<boolean> {
    return of(false);
  }
  loadAddresses(): void {}
}

class MockActiveCartService {
  isGuestCart(): Boolean {
    return false;
  }
}

class MockCheckoutDeliveryFacade {
  createAndSetAddress = createSpy();
  setDeliveryAddress = createSpy();
  getDeliveryAddress(): Observable<Address> {
    return of(null);
  }
}

class MockCheckoutStepService {
  next = createSpy();
  back = createSpy();
  getBackBntText(): string {
    return 'common.back';
  }
}

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

const isAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
class MockPaymentTypeService {
  isAccountPayment(): Observable<boolean> {
    return isAccount;
  }
}

class MockUserCostCenterService {
  getCostCenterAddresses() {
    return of(mockAddresses);
  }
}

class MockCheckoutCostCenterService {
  getCostCenter() {
    return of('test-cost-center');
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
    url: ['checkout', 'shipping-address'],
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
  let checkoutDeliveryFacade: CheckoutDeliveryFacade;
  let userAddressService: UserAddressService;
  let activeCartService: ActiveCartService;
  let checkoutStepService: CheckoutStepService;
  let userCostCenterService: UserCostCenterService;

  beforeEach(
    waitForAsync(() => {
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
          { provide: ActiveCartService, useClass: MockActiveCartService },
          {
            provide: CheckoutDeliveryFacade,
            useClass: MockCheckoutDeliveryFacade,
          },
          { provide: CheckoutStepService, useClass: MockCheckoutStepService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: PaymentTypeFacade, useClass: MockPaymentTypeService },
          {
            provide: UserCostCenterService,
            useClass: MockUserCostCenterService,
          },
          {
            provide: CheckoutCostCenterFacade,
            useClass: MockCheckoutCostCenterService,
          },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      })
        .overrideComponent(ShippingAddressComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      checkoutDeliveryFacade = TestBed.inject(CheckoutDeliveryFacade);
      activeCartService = TestBed.inject(ActiveCartService);
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );
      userAddressService = TestBed.inject(UserAddressService);
      userCostCenterService = TestBed.inject(UserCostCenterService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressComponent);
    component = fixture.componentInstance;

    spyOn(component, 'addAddress').and.callThrough();
    spyOn(component, 'selectAddress').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get isGuestCheckout', () => {
    expect(component.isGuestCheckout).toBeFalsy();
  });

  it('should get isAccountPayment', () => {
    isAccount.next(false);
    component.ngOnInit();
    expect(component.isAccountPayment).toBeFalsy();

    isAccount.next(true);
    component.ngOnInit();
    expect(component.isAccountPayment).toBeTruthy();
  });

  describe('should call ngOnInit', () => {
    it('for login user, should load user addresses if payment type is card', () => {
      spyOn(userAddressService, 'loadAddresses').and.stub();
      isAccount.next(false);

      component.ngOnInit();
      expect(component.isAccountPayment).toBeFalsy();
      expect(userAddressService.loadAddresses).toHaveBeenCalled();
    });

    it('for login user, should not load user addresses if payment type is account', () => {
      spyOn(userAddressService, 'loadAddresses').and.stub();
      isAccount.next(true);

      component.ngOnInit();
      expect(component.isAccountPayment).toBeTruthy();
      expect(userAddressService.loadAddresses).not.toHaveBeenCalled();
    });

    it('for guest user, should not load user addresses', () => {
      spyOn(activeCartService, 'isGuestCart').and.returnValue(true);
      spyOn(userAddressService, 'loadAddresses').and.stub();
      isAccount.next(false);

      component.ngOnInit();
      expect(userAddressService.loadAddresses).not.toHaveBeenCalled();
    });

    it('should not invoke addAddress when address is undefined/ not modified.', () => {
      component.addAddress(undefined);
      expect(checkoutDeliveryFacade.createAndSetAddress).not.toHaveBeenCalled();
    });
  });

  it('should call showNewAddressForm()', () => {
    component.showNewAddressForm();
    expect(component.addressFormOpened).toEqual(true);
  });

  it('should call hideNewAddressForm()', () => {
    component.hideNewAddressForm();
    expect(component.addressFormOpened).toEqual(false);

    spyOn(component, 'back');
    component.hideNewAddressForm(true);
    expect(component.back).toHaveBeenCalled();
  });

  it('should be able to go to next step', () => {
    component.next();
    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  it('should be able to go to previous step', () => {
    component.back();
    expect(checkoutStepService.back).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  it('should be able to select address', () => {
    component.selectAddress({});
    expect(checkoutDeliveryFacade.setDeliveryAddress).toHaveBeenCalledWith({});
  });

  it('should be able to add address', () => {
    component.addAddress({});
    expect(component.forceLoader).toBeTruthy();
    expect(checkoutDeliveryFacade.createAndSetAddress).toHaveBeenCalledWith({});
  });

  it('should be able to get card content', () => {
    const card = component.getCardContent(
      mockAddress1,
      undefined,
      'default',
      'shipTo',
      'selected'
    );
    expect(card.title).toEqual('');
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'first line',
      'second line',
      'town, JP-27, JP',
      'zip',
      undefined,
    ]);
  });

  describe('selectDefaultAddress', () => {
    describe('Account Payment', () => {
      it('should automatically select default shipping address when there is ONLY ONE', () => {
        isAccount.next(true);
        component.ngOnInit();
        component.selectDefaultAddress([mockAddress1], undefined);
        expect(component.selectAddress).toHaveBeenCalledWith(mockAddress1);
      });
    });

    describe('Credit Card Payment', () => {
      it('should automatically select default shipping address when there is no current selection', () => {
        component.doneAutoSelect = false;
        component.selectDefaultAddress(mockAddresses, undefined);
        expect(component.selectAddress).toHaveBeenCalledWith(mockAddress2);
      });
    });
  });

  describe('should be able to get supported address', () => {
    it('for ACCOUNT payment', () => {
      spyOn(userCostCenterService, 'getCostCenterAddresses').and.returnValue(
        of([])
      );
      isAccount.next(true);
      component.ngOnInit();
      component.getSupportedAddresses().subscribe();
      expect(userCostCenterService.getCostCenterAddresses).toHaveBeenCalledWith(
        'test-cost-center'
      );
    });

    it('for CARD payment', () => {
      spyOn(userAddressService, 'getAddresses').and.stub();
      isAccount.next(false);
      component.ngOnInit();
      component.getSupportedAddresses();
      expect(userAddressService.getAddresses).toHaveBeenCalled();
    });
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));

    it('should be disabled when no address is selected', () => {
      component.selectedAddress = undefined;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should be enabled when address is selected', () => {
      component.selectedAddress = mockAddress1;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      spyOn(component, 'next');
      component.selectedAddress = mockAddress1;
      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find((el) => el.nativeElement.innerText === 'common.back');

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back').and.callThrough();
      fixture.detectChanges();
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI cards with addresses', () => {
    const getCards = () => fixture.debugElement.queryAll(By.css('cx-card'));

    it('should represent all existing addresses', () => {
      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existng addresses', () => {
      spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existng addresses are loading', () => {
      spyOn(userAddressService, 'getAddressesLoading').and.returnValue(
        of(true)
      );
      spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new address form', () => {
    const getAddNewAddressBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-action'))
        .find(
          (el) => el.nativeElement.innerText === 'checkoutAddress.addNewAddress'
        );
    const getNewAddressForm = () =>
      fixture.debugElement.query(By.css('cx-address-form'));

    it('should render only after user clicks "add new address" button if there are some existing addresses', () => {
      spyOn(userAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(userAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();

      getAddNewAddressBtn().nativeElement.click();
      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should render on init if there are no existing addresses', () => {
      spyOn(userAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing addresses', () => {
      spyOn(userAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(userAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();
    });

    it('should not render when existing addresses are loading', () => {
      spyOn(userAddressService, 'getAddressesLoading').and.returnValue(
        of(true)
      );
      spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing addresses are loading', () => {
      spyOn(userAddressService, 'getAddressesLoading').and.returnValue(
        of(true)
      );
      spyOn(userAddressService, 'getAddresses').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();
    });

    it('should NOT render when existing addresses are NOT loading', () => {
      spyOn(userAddressService, 'getAddressesLoading').and.returnValue(
        of(false)
      );
      spyOn(userAddressService, 'getAddresses').and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});
