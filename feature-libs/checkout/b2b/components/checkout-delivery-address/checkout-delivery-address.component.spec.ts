import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  GlobalMessageService,
  I18nTestingModule,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { B2BCheckoutDeliveryAddressComponent } from './checkout-delivery-address.component';
import createSpy = jasmine.createSpy;

class MockUserAddressService implements Partial<UserAddressService> {
  getAddresses = createSpy().and.returnValue(of(mockAddresses));
  getAddressesLoading = createSpy().and.returnValue(of(false));
  loadAddresses = createSpy();
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  isGuestCart = createSpy().and.returnValue(of(false));
}

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  createAndSetAddress = createSpy().and.returnValue(of({}));
  setDeliveryAddress = createSpy().and.returnValue(EMPTY);
  getDeliveryAddressState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = createSpy();
  back = createSpy();
  getBackBntText = createSpy().and.returnValue('common.back');
}

const accountPayment$ = new BehaviorSubject<boolean>(true);
class MockPaymentTypeService implements Partial<CheckoutPaymentTypeFacade> {
  isAccountPayment = createSpy().and.returnValue(
    accountPayment$.asObservable()
  );
}

class MockUserCostCenterService implements Partial<UserCostCenterService> {
  getCostCenterAddresses = createSpy().and.returnValue(of(mockAddresses));
}

class MockCheckoutCostCenterService
  implements Partial<CheckoutCostCenterFacade>
{
  getCostCenterState = createSpy().and.returnValue(
    of({
      loading: false,
      error: false,
      data: { code: 'test-cost-center' },
    })
  );
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  clearCheckoutDeliveryMode = createSpy().and.returnValue(EMPTY);
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

describe('B2BCheckoutDeliveryAddressComponent', () => {
  let component: B2BCheckoutDeliveryAddressComponent;
  let fixture: ComponentFixture<B2BCheckoutDeliveryAddressComponent>;
  let checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
  let userAddressService: UserAddressService;
  let activeCartFacade: ActiveCartFacade;
  let checkoutStepService: CheckoutStepService;
  let userCostCenterService: UserCostCenterService;
  let globalMessageService: GlobalMessageService;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          B2BCheckoutDeliveryAddressComponent,
          MockAddressFormComponent,
          MockCardComponent,
          MockSpinnerComponent,
        ],
        providers: [
          { provide: UserAddressService, useClass: MockUserAddressService },
          { provide: ActiveCartFacade, useClass: MockActiveCartService },
          {
            provide: CheckoutDeliveryAddressFacade,
            useClass: MockCheckoutDeliveryAddressFacade,
          },
          { provide: CheckoutStepService, useClass: MockCheckoutStepService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          {
            provide: CheckoutPaymentTypeFacade,
            useClass: MockPaymentTypeService,
          },
          {
            provide: UserCostCenterService,
            useClass: MockUserCostCenterService,
          },
          {
            provide: CheckoutCostCenterFacade,
            useClass: MockCheckoutCostCenterService,
          },
          {
            provide: CheckoutDeliveryModesFacade,
            useClass: MockCheckoutDeliveryModesFacade,
          },
        ],
      })
        .overrideComponent(B2BCheckoutDeliveryAddressComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();

      checkoutDeliveryAddressFacade = TestBed.inject(
        CheckoutDeliveryAddressFacade
      );
      activeCartFacade = TestBed.inject(ActiveCartFacade);
      checkoutStepService = TestBed.inject(
        CheckoutStepService as Type<CheckoutStepService>
      );
      userAddressService = TestBed.inject(UserAddressService);
      userCostCenterService = TestBed.inject(UserCostCenterService);
      globalMessageService = TestBed.inject(GlobalMessageService);
      checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(B2BCheckoutDeliveryAddressComponent);
    component = fixture.componentInstance;

    spyOn(component, 'addAddress').and.callThrough();
    spyOn(component, 'selectAddress').and.callThrough();
    spyOn<any>(component, 'setAddress').and.callThrough();
    accountPayment$.next(true);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get isGuestCheckout', () => {
    expect(component.isGuestCheckout).toBeFalsy();
  });

  describe('should call ngOnInit', () => {
    it('for login user, should load user addresses if payment type is card', () => {
      accountPayment$.next(false);

      component.ngOnInit();
      expect(component.isAccountPayment).toBeFalsy();
      expect(userAddressService.loadAddresses).toHaveBeenCalled();
    });

    it('for login user, should not load user addresses if payment type is account', () => {
      component.ngOnInit();
      expect(component.isAccountPayment).toBeTruthy();
      expect(userAddressService.loadAddresses).not.toHaveBeenCalled();
    });

    it('for guest user, should not load user addresses', () => {
      activeCartFacade.isGuestCart = createSpy().and.returnValue(of(true));

      accountPayment$.next(false);

      component.ngOnInit();
      expect(userAddressService.loadAddresses).not.toHaveBeenCalled();
    });

    it('should not invoke addAddress when address is undefined/ not modified.', () => {
      component.addAddress(undefined);
      expect(
        checkoutDeliveryAddressFacade.createAndSetAddress
      ).not.toHaveBeenCalled();
    });

    it('should return false when checkout flow is NOT ACCOUNT', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState =
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockAddress1 })
        );

      accountPayment$.next(false);
      component.isUpdating$ = of(false);

      component.ngOnInit();
      expect(component.isAccountPayment).toBeFalsy();
    });

    it('should return true when checkout flow is ACCOUNT', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState =
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockAddress1 })
        );
      accountPayment$.next(true);
      component.isUpdating$ = of(false);

      component.ngOnInit();
      expect(component.isAccountPayment).toBeTruthy();
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
    component.selectAddress(mockAddress1);

    expect(
      checkoutDeliveryAddressFacade.setDeliveryAddress
    ).toHaveBeenCalledWith(mockAddress1);
    expect(component['setAddress']).toHaveBeenCalledWith(mockAddress1);
    expect(globalMessageService.add).toHaveBeenCalled();
  });

  it('should NOT be able to select address if the selection is the same as the currently set delivery address', () => {
    checkoutDeliveryAddressFacade.getDeliveryAddressState =
      createSpy().and.returnValue(
        of({ loading: false, error: false, data: mockAddress2 })
      );

    component.selectAddress(mockAddress2);

    expect(
      checkoutDeliveryAddressFacade.setDeliveryAddress
    ).not.toHaveBeenCalledWith(mockAddress2);
    expect(component['setAddress']).not.toHaveBeenCalledWith(mockAddress2);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should be able to add address', () => {
    component.addAddress({});
    expect(
      checkoutDeliveryAddressFacade.createAndSetAddress
    ).toHaveBeenCalledWith({});
    expect(
      checkoutDeliveryModesFacade.clearCheckoutDeliveryMode
    ).toHaveBeenCalled();
  });

  it('should be able to get card content', () => {
    const card = component.getCardContent(
      mockAddress1,
      undefined,
      'default',
      'shipTo',
      'selected',
      'P',
      'M'
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
      it('should automatically select default delivery address when there is ONLY ONE', () => {
        component.ngOnInit();
        component['selectDefaultAddress']([mockAddress1], undefined);
        expect(component['setAddress']).toHaveBeenCalledWith(mockAddress1);
      });
    });

    describe('Credit Card Payment', () => {
      it('should automatically select default delivery address when there is no current selection', () => {
        component.doneAutoSelect = false;
        component['selectDefaultAddress'](mockAddresses, undefined);
        expect(component['setAddress']).toHaveBeenCalledWith(mockAddress2);
      });
    });
  });

  describe('should be able to get supported address', () => {
    it('for ACCOUNT payment', (done) => {
      accountPayment$.next(true);
      userCostCenterService.getCostCenterAddresses =
        createSpy().and.returnValue(of([]));

      component.ngOnInit();
      fixture.detectChanges();
      component['getSupportedAddresses']()
        .subscribe(() => {
          expect(
            userCostCenterService.getCostCenterAddresses
          ).toHaveBeenCalledWith('test-cost-center');
          done();
        })
        .unsubscribe();
    });

    it('for CARD payment', (done) => {
      userAddressService.getAddresses = createSpy().and.returnValue(of([]));
      accountPayment$.next(false);

      component.ngOnInit();
      component['getSupportedAddresses']()
        .subscribe(() => {
          expect(userAddressService.getAddresses).toHaveBeenCalled();
          done();
        })
        .unsubscribe();
    });
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));

    it('should be disabled when no address is selected', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should be enabled when address is selected', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState =
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockAddress1 })
        );

      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState =
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockAddress1 })
        );
      spyOn(component, 'next');

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-secondary'))
        .find((el) => el.nativeElement.innerText === 'common.back');

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back').and.callThrough();
      fixture.detectChanges();
      getBackBtn()?.nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI cards with addresses', () => {
    const getCards = () => fixture.debugElement.queryAll(By.css('cx-card'));

    it('should represent all existing addresses', () => {
      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existing addresses', () => {
      spyOn<any>(component, 'getSupportedAddresses').and.returnValue(of([]));
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existing addresses are loading', () => {
      accountPayment$.next(false);

      component.isUpdating$ = of(true);
      userAddressService.getAddresses = createSpy().and.returnValue(of([]));
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new address form', () => {
    const getAddNewAddressBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-secondary'))
        .find(
          (el) => el.nativeElement.innerText === 'checkoutAddress.addNewAddress'
        );
    const getNewAddressForm = () =>
      fixture.debugElement.query(By.css('cx-address-form'));

    it('should render only after user clicks "add new address" button if there are some existing addresses', () => {
      accountPayment$.next(false);
      userAddressService.getAddressesLoading = createSpy().and.returnValue(
        of(false)
      );
      userAddressService.getAddresses = createSpy().and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();

      getAddNewAddressBtn()?.nativeElement.click();
      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should render on init if there are no existing addresses', () => {
      accountPayment$.next(false);
      userAddressService.getAddressesLoading = createSpy().and.returnValue(
        of(false)
      );
      spyOn<any>(component, 'getSupportedAddresses').and.returnValue(of([]));

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing addresses', () => {
      userAddressService.getAddressesLoading = createSpy().and.returnValue(
        of(false)
      );
      userAddressService.getAddresses = createSpy().and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();
    });

    it('should not render when existing addresses are loading', () => {
      component.isUpdating$ = of(true);
      userAddressService.getAddresses = createSpy().and.returnValue(of([]));

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing addresses are loading', () => {
      spyOn<any>(component, 'createIsUpdating').and.returnValue(of(true));
      spyOn<any>(component, 'getSupportedAddresses').and.returnValue(of([]));
      userAddressService.getAddresses = createSpy().and.returnValue(of([]));
      component.ngOnInit();

      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();
    });

    it('should NOT render when existing addresses are NOT loading', () => {
      userAddressService.getAddressesLoading = createSpy().and.returnValue(
        of(false)
      );
      userAddressService.getAddresses = createSpy().and.returnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});
