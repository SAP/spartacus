import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutFlowOrchestratorService,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  FeatureDirective,
  FeatureToggles,
  GlobalMessageService,
  I18nTestingModule,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { provideMockFeatureToggles } from '../../../../../core-libs/core/src/features-config/feature-toggles/testing';
import { Card, CardComponent, SpinnerComponent } from '@spartacus/storefront';
import { AddressFormComponent } from '@spartacus/user/profile/components';
import { MockFeatureDirective } from '../../../../../core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, EMPTY, firstValueFrom, of } from 'rxjs';
import { B2BCheckoutDeliveryAddressComponent } from './checkout-delivery-address.component';

class MockUserAddressService implements Partial<UserAddressService> {
  getAddresses = vi.fn().mockReturnValue(of(mockAddresses));
  getAddressesLoading = vi.fn().mockReturnValue(of(false));
  loadAddresses = vi.fn();
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  isGuestCart = vi.fn().mockReturnValue(of(false));
}

class MockCheckoutDeliveryAddressFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  createAndSetAddress = vi.fn().mockReturnValue(of({}));
  setDeliveryAddress = vi.fn().mockReturnValue(EMPTY);
  getDeliveryAddressState = vi.fn().mockReturnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

class MockCheckoutFlowOrchestratorService
  implements Partial<CheckoutFlowOrchestratorService>
{
  getCheckoutFlow = vi.fn();
}

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next = vi.fn();
  back = vi.fn();
  getBackBntText = vi.fn().mockReturnValue('common.back');
}

const accountPayment$ = new BehaviorSubject<boolean>(true);
class MockPaymentTypeService implements Partial<CheckoutPaymentTypeFacade> {
  isAccountPayment = vi.fn().mockReturnValue(
    accountPayment$.asObservable()
  );
}

class MockUserCostCenterService implements Partial<UserCostCenterService> {
  getCostCenterAddresses = vi.fn().mockReturnValue(of(mockAddresses));
}

class MockCheckoutCostCenterService
  implements Partial<CheckoutCostCenterFacade>
{
  getCostCenterState = vi.fn().mockReturnValue(
    of({
      loading: false,
      error: false,
      data: { code: 'test-cost-center' },
    })
  );
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
}

class MockCheckoutDeliveryModesFacade
  implements Partial<CheckoutDeliveryModesFacade>
{
  clearCheckoutDeliveryMode = vi.fn().mockReturnValue(EMPTY);
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
  shippingAddress: true,
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
  @Input()
  index: number;
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
  let featureToggles: FeatureToggles;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, B2BCheckoutDeliveryAddressComponent],
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
        {
          provide: CheckoutFlowOrchestratorService,
          useClass: MockCheckoutFlowOrchestratorService,
        },
        provideMockFeatureToggles({ b2bCheckoutShippingAddressFilter: false }),
      ],
    })
      .overrideComponent(B2BCheckoutDeliveryAddressComponent, {
        add: {
          changeDetection: ChangeDetectionStrategy.Default,
          imports: [
            MockAddressFormComponent,
            MockCardComponent,
            MockSpinnerComponent,
            MockFeatureDirective,
          ],
        },
        remove: {
          imports: [
            AddressFormComponent,
            CardComponent,
            SpinnerComponent,
            FeatureDirective,
          ],
        },
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
    featureToggles = TestBed.inject(FeatureToggles);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(B2BCheckoutDeliveryAddressComponent);
    component = fixture.componentInstance;

    vi.spyOn(component, 'addAddress');
    vi.spyOn(component, 'selectAddress');
    vi.spyOn(component, 'setAddress');
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
      activeCartFacade.isGuestCart = vi.fn().mockReturnValue(of(true));

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
        vi.fn().mockReturnValue(
          of({ loading: false, error: false, data: mockAddress1 })
        );

      accountPayment$.next(false);
      component.isUpdating$ = of(false);

      component.ngOnInit();
      expect(component.isAccountPayment).toBeFalsy();
    });

    it('should return true when checkout flow is ACCOUNT', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState =
        vi.fn().mockReturnValue(
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

    vi.spyOn(component, 'back');
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
    fixture.detectChanges();

    component.selectAddress(mockAddress1);

    expect(
      checkoutDeliveryAddressFacade.setDeliveryAddress
    ).toHaveBeenCalledWith(mockAddress1);
    expect(component['setAddress']).toHaveBeenCalledWith(mockAddress1);
    expect(globalMessageService.add).toHaveBeenCalled();
  });

  it('should NOT be able to select address if the selection is the same as the currently set delivery address', () => {
    checkoutDeliveryAddressFacade.getDeliveryAddressState =
      vi.fn().mockReturnValue(
        of({ loading: false, error: false, data: mockAddress2 })
      );

    fixture.detectChanges();

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
    it('for ACCOUNT payment', async () => {
      accountPayment$.next(true);
      userCostCenterService.getCostCenterAddresses =
        vi.fn().mockReturnValue(of([]));

      component.ngOnInit();
      fixture.detectChanges();
      await firstValueFrom(component['getSupportedAddresses']());
      expect(
        userCostCenterService.getCostCenterAddresses
      ).toHaveBeenCalledWith('test-cost-center');
    });

    it('for CARD payment', async () => {
      userAddressService.getAddresses = vi.fn().mockReturnValue(of([]));
      accountPayment$.next(false);

      component.ngOnInit();
      await firstValueFrom(component['getSupportedAddresses']());
      expect(userAddressService.getAddresses).toHaveBeenCalled();
    });

    it('for ACCOUNT payment, should filter to shipping addresses when b2bCheckoutShippingAddressFilter is enabled', async () => {
      accountPayment$.next(true);
      featureToggles.b2bCheckoutShippingAddressFilter = true;
      userCostCenterService.getCostCenterAddresses =
        vi.fn().mockReturnValue(of(mockAddresses));

      component.ngOnInit();
      fixture.detectChanges();
      const addresses = await firstValueFrom(component['getSupportedAddresses']());
      expect(addresses).toEqual([mockAddress1]);
    });

    it('for ACCOUNT payment, should return all addresses when b2bCheckoutShippingAddressFilter is disabled', async () => {
      accountPayment$.next(true);
      featureToggles.b2bCheckoutShippingAddressFilter = false;
      userCostCenterService.getCostCenterAddresses =
        vi.fn().mockReturnValue(of(mockAddresses));

      component.ngOnInit();
      fixture.detectChanges();
      const addresses = await firstValueFrom(component['getSupportedAddresses']());
      expect(addresses).toEqual(mockAddresses);
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
        vi.fn().mockReturnValue(
          of({ loading: false, error: false, data: mockAddress1 })
        );

      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });

    it('should call "next" function after being clicked', () => {
      checkoutDeliveryAddressFacade.getDeliveryAddressState =
        vi.fn().mockReturnValue(
          of({ loading: false, error: false, data: mockAddress1 })
        );
      vi.spyOn(component, 'next');

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-secondary'))
        .find((el) => el.nativeElement.textContent?.trim() === 'common.back');

    it('should call "back" function after being clicked', () => {
      vi.spyOn(component, 'back');
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
      vi.spyOn(component, 'getSupportedAddresses').mockReturnValue(of([]));
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existing addresses are loading', () => {
      accountPayment$.next(false);

      component.isUpdating$ = of(true);
      userAddressService.getAddresses = vi.fn().mockReturnValue(of([]));
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new address form', () => {
    const getAddNewAddressBtn = () =>
      fixture.debugElement
        .queryAll(By.css('.btn-secondary'))
        .find(
          (el) => el.nativeElement.textContent?.trim() === 'checkoutAddress.addNewAddress'
        );
    const getNewAddressForm = () =>
      fixture.debugElement.query(By.css('cx-address-form'));

    it('should render only after user clicks "add new address" button if there are some existing addresses', () => {
      accountPayment$.next(false);
      userAddressService.getAddressesLoading = vi.fn().mockReturnValue(
        of(false)
      );
      userAddressService.getAddresses = vi.fn().mockReturnValue(
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
      userAddressService.getAddressesLoading = vi.fn().mockReturnValue(
        of(false)
      );
      vi.spyOn(component, 'getSupportedAddresses').mockReturnValue(of([]));

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should not render on init if there are some existing addresses', () => {
      userAddressService.getAddressesLoading = vi.fn().mockReturnValue(
        of(false)
      );
      userAddressService.getAddresses = vi.fn().mockReturnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();
    });

    it('should not render when existing addresses are loading', () => {
      component.isUpdating$ = of(true);
      userAddressService.getAddresses = vi.fn().mockReturnValue(of([]));

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));

    it('should render only when existing addresses are loading', () => {
      vi.spyOn(component, 'createIsUpdating').mockReturnValue(of(true));
      vi.spyOn(component, 'getSupportedAddresses').mockReturnValue(of([]));
      userAddressService.getAddresses = vi.fn().mockReturnValue(of([]));
      component.ngOnInit();

      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();
    });

    it('should NOT render when existing addresses are NOT loading', () => {
      userAddressService.getAddressesLoading = vi.fn().mockReturnValue(
        of(false)
      );
      userAddressService.getAddresses = vi.fn().mockReturnValue(
        of(mockAddresses)
      );

      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});
