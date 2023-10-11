import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  AddressValidation,
  Country,
  GlobalMessageService,
  I18nTestingModule,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { CheckoutPaymentFormComponent } from './checkout-payment-form.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

const mockBillingCountries: Country[] = [
  {
    isocode: 'CA',
    name: 'Canada',
  },
];

const mockBillingCountriesEmpty: Country[] = [];

const mockBillingAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  line1: 'Green Street',
  line2: '420',
  town: 'Montreal',
  postalCode: 'H3A',
  country: { isocode: 'CA' },
  region: { isocodeShort: 'QC' },
};

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};

const mockCardTypes: CardType[] = [
  {
    code: 'amex',
    name: 'American Express',
  },
  {
    code: 'maestro',
    name: 'Maestro',
  },
];

const mockPayment: any = {
  cardType: {
    code: mockCardTypes[0].code,
  },
  accountHolderName: 'Test Name',
  cardNumber: '1234123412341234',
  expiryMonth: '02',
  expiryYear: 2022,
  cvn: '123',
  defaultPayment: false,
};

@Component({
  selector: 'cx-billing-address-form',
  template: '',
})
class MockBillingAddressFormComponent {
  @Input()
  billingAddress: Address;
  @Input()
  countries$: Observable<Country[]>;
}

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  content: any;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  loadSupportedCardTypes = createSpy();
  getPaymentCardTypes = createSpy().and.returnValue(EMPTY);
  getSetPaymentDetailsResultProcess = createSpy().and.returnValue(
    of({ loading: false })
  );
}

class MockCheckoutDeliveryService
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
  getAddressVerificationResults = createSpy().and.returnValue(EMPTY);
  verifyAddress = createSpy();
  clearAddressVerificationResults = createSpy();
}

class MockUserPaymentService implements Partial<UserPaymentService> {
  loadBillingCountries = createSpy();
  getAllBillingCountries = createSpy().and.returnValue(
    of(mockBillingCountries)
  );
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe() {
    return EMPTY;
  }
}
class MockUserAddressService implements Partial<UserAddressService> {
  getRegions = createSpy().and.returnValue(of([]));
  verifyAddress = createSpy().and.returnValue(of({}));
}

describe('CheckoutPaymentFormComponent', () => {
  let component: CheckoutPaymentFormComponent;
  let fixture: ComponentFixture<CheckoutPaymentFormComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;
  let mockCheckoutPaymentService: MockCheckoutPaymentService;
  let mockUserPaymentService: MockUserPaymentService;
  let mockGlobalMessageService: MockGlobalMessageService;
  let userAddressService: UserAddressService;

  let controls: {
    payment: UntypedFormGroup['controls'];
    billingAddress: UntypedFormGroup['controls'];
  };

  beforeEach(
    waitForAsync(() => {
      mockCheckoutDeliveryService = new MockCheckoutDeliveryService();
      mockCheckoutPaymentService = new MockCheckoutPaymentService();
      mockUserPaymentService = new MockUserPaymentService();
      mockGlobalMessageService = new MockGlobalMessageService();

      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          NgSelectModule,
          I18nTestingModule,
          FormErrorsModule,
        ],
        declarations: [
          CheckoutPaymentFormComponent,
          MockCardComponent,
          MockBillingAddressFormComponent,
          MockCxIconComponent,
          MockSpinnerComponent,
        ],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: CheckoutPaymentFacade,
            useValue: mockCheckoutPaymentService,
          },
          {
            provide: CheckoutDeliveryAddressFacade,
            useValue: mockCheckoutDeliveryService,
          },
          { provide: UserPaymentService, useValue: mockUserPaymentService },
          { provide: GlobalMessageService, useValue: mockGlobalMessageService },
          { provide: UserAddressService, useClass: MockUserAddressService },
        ],
      })
        .overrideComponent(CheckoutPaymentFormComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentFormComponent);
    component = fixture.componentInstance;
    controls = {
      payment: component.paymentForm.controls,
      billingAddress: component.billingAddressForm.controls,
    };
    userAddressService = TestBed.inject(UserAddressService);
    spyOn(component.setPaymentDetails, 'emit').and.callThrough();
    spyOn(component.closeForm, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('it should patch the form if the payment details is provided', () => {
    const mockPaymentDetails: PaymentDetails = {
      id: 'test',
    };
    component.paymentDetails = mockPaymentDetails;
    spyOn(component.paymentForm, 'patchValue').and.callThrough();

    component.ngOnInit();

    expect(component.paymentForm.patchValue).toHaveBeenCalledWith(
      mockPaymentDetails
    );
  });

  it('it should NOT patch the form if the payment details is NOT provided', () => {
    spyOn(component.paymentForm, 'patchValue').and.callThrough();

    component.ngOnInit();

    expect(component.paymentForm.patchValue).not.toHaveBeenCalled();
  });

  it('should call ngOnInit to get billing countries', () => {
    mockUserPaymentService.getAllBillingCountries = createSpy().and.returnValue(
      of(mockBillingCountries)
    );

    component.ngOnInit();
    component.countries$.subscribe((countries: Country[]) => {
      expect(countries).toBe(mockBillingCountries);
    });
  });

  it('should call ngOnInit to get supported card types if they exist', () => {
    mockCheckoutPaymentService.getPaymentCardTypes =
      createSpy().and.returnValue(of(mockCardTypes));

    component.ngOnInit();
    component.cardTypes$.subscribe((cardTypes: CardType[]) => {
      expect(cardTypes).toBe(mockCardTypes);
    });
  });

  it('should call ngOnInit to get shipping address set in cart', () => {
    mockCheckoutPaymentService.getPaymentCardTypes =
      createSpy().and.returnValue(of(mockCardTypes));
    mockCheckoutDeliveryService.getDeliveryAddressState =
      createSpy().and.returnValue(
        of({ loading: false, error: false, data: mockAddress })
      );

    component.ngOnInit();
    component.cardTypes$.subscribe((cardTypes: CardType[]) => {
      expect(cardTypes).toBe(mockCardTypes);
    });
    component.deliveryAddress$.subscribe((address) => {
      expect(address).toBe(mockAddress);
    });
  });

  it('should call ngOnInit to load billing countries', () => {
    mockUserPaymentService.getAllBillingCountries = createSpy().and.returnValue(
      of(mockBillingCountriesEmpty)
    );

    component.ngOnInit();
    component.countries$.subscribe((countries: Country[]) => {
      expect(countries).toBe(mockBillingCountriesEmpty);
      expect(mockUserPaymentService.loadBillingCountries).toHaveBeenCalled();
    });
  });

  it('should add address with address verification result "accept"', () => {
    const mockAddressVerificationResult = { decision: 'ACCEPT' };
    component.ngOnInit();
    spyOn(component, 'next');
    component['handleAddressVerificationResults'](
      mockAddressVerificationResult
    );
    expect(component.next).toHaveBeenCalled();
  });

  it('should display error message with address verification result "reject"', () => {
    const mockAddressVerificationResult: AddressValidation = {
      decision: 'REJECT',
    };
    component.ngOnInit();
    component['handleAddressVerificationResults'](
      mockAddressVerificationResult
    );
    expect(mockGlobalMessageService.add).toHaveBeenCalled();
  });

  it('should open suggested address with address verification result "review"', () => {
    const mockAddressVerificationResult: AddressValidation = {
      decision: 'REVIEW',
    };
    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    component['handleAddressVerificationResults'](
      mockAddressVerificationResult
    );
    expect(component.openSuggestedAddress).toHaveBeenCalled();
  });

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.paymentForm.value.defaultPayment = false;
    component.toggleDefaultPaymentMethod();
    expect(component.paymentForm.value.defaultPayment).toBeTruthy();
  });

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.paymentForm.value.defaultPayment = true;
    component.toggleDefaultPaymentMethod();
    expect(component.paymentForm.value.defaultPayment).toBeFalsy();
  });

  it('should call next()', () => {
    component.paymentForm.setValue(mockPayment);
    component.next();
    expect(component.setPaymentDetails.emit).toHaveBeenCalledWith({
      paymentDetails: component.paymentForm.value,
      billingAddress: null,
    });
  });

  it('should call close()', () => {
    component.close();
    expect(component.closeForm.emit).toHaveBeenCalled();
  });

  it('should call getAddressCardContent(address)', (done) => {
    component.getAddressCardContent(mockAddress).subscribe((card) => {
      expect(card?.textBold).toEqual('John Doe');
      expect(card?.text).toEqual([
        'Toyosaki 2 create on cart',
        'line2',
        'town, JP-27, JP',
        'zip',
        undefined,
      ]);
      done();
    });
  });

  it('should call toggleSameAsDeliveryAddress()', () => {
    spyOn(component, 'toggleSameAsDeliveryAddress').and.callThrough();
    component.sameAsDeliveryAddress = true;

    component.toggleSameAsDeliveryAddress();

    expect(component.toggleSameAsDeliveryAddress).toHaveBeenCalled();
    expect(component.sameAsDeliveryAddress).toBeFalsy();
  });

  it('should call verifyAddress() when billing address not same as shipping', () => {
    spyOn(component, 'next');
    userAddressService.verifyAddress = createSpy().and.returnValue(
      of({
        decision: 'ACCEPT',
      })
    );

    component.sameAsDeliveryAddress = true;

    component.verifyAddress();

    expect(component.next).toHaveBeenCalled();

    component.sameAsDeliveryAddress = false;
    component.verifyAddress();
    expect(userAddressService.verifyAddress).toHaveBeenCalled();
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.btn-primary'));

    it('should call "next" function when being clicked and when form is valid - with billing address', () => {
      mockCheckoutPaymentService.getPaymentCardTypes =
        createSpy().and.returnValue(of(mockCardTypes));
      mockCheckoutDeliveryService.getDeliveryAddressState =
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockAddress })
        );
      mockUserPaymentService.getAllBillingCountries =
        createSpy().and.returnValue(of(mockBillingCountries));
      spyOn(component, 'next');

      component.showSameAsDeliveryAddressCheckbox$ = of(false);
      component.sameAsDeliveryAddress = false;

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalledTimes(1);

      // set values for payment form
      controls.payment['accountHolderName'].setValue('test accountHolderName');
      controls.payment['cardNumber'].setValue('test cardNumber');
      controls.payment.cardType['controls'].code.setValue(
        'test card type code'
      );
      controls.payment['expiryMonth'].setValue('test expiryMonth');
      controls.payment['expiryYear'].setValue('test expiryYear');
      controls.payment['cvn'].setValue('test cvn');

      // set values for billing address form
      controls.billingAddress['firstName'].setValue(
        mockBillingAddress.firstName
      );
      controls.billingAddress['lastName'].setValue(mockBillingAddress.lastName);
      controls.billingAddress['line1'].setValue(mockBillingAddress.line1);
      controls.billingAddress['line2'].setValue(mockBillingAddress.line2);
      controls.billingAddress['town'].setValue(mockBillingAddress.town);
      controls.billingAddress.country['controls'].isocode.setValue(
        mockBillingAddress.country
      );
      controls.billingAddress.region['controls'].isocodeShort.setValue(
        mockBillingAddress.region
      );
      controls.billingAddress['postalCode'].setValue(
        mockBillingAddress.postalCode
      );

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalledTimes(2);
    });

    it('should call "next" function when being clicked and when form is valid - without billing address', () => {
      mockCheckoutPaymentService.getPaymentCardTypes =
        createSpy().and.returnValue(of(mockCardTypes));
      mockCheckoutDeliveryService.getDeliveryAddressState =
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockAddress })
        );
      mockUserPaymentService.getAllBillingCountries =
        createSpy().and.returnValue(of(mockBillingCountries));
      spyOn(component, 'next');

      // hide billing address
      component.sameAsDeliveryAddress = true;

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalledTimes(1);

      // set values for payment form
      controls.payment['accountHolderName'].setValue('test accountHolderName');
      controls.payment['cardNumber'].setValue('test cardNumber');
      controls.payment.cardType['controls'].code.setValue(
        'test card type code'
      );
      controls.payment['expiryMonth'].setValue('test expiryMonth');
      controls.payment['expiryYear'].setValue('test expiryYear');
      controls.payment['cvn'].setValue('test cvn');

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalledTimes(2);
    });

    it('should check setAsDefaultField to determine whether setAsDefault checkbox displayed or not', () => {
      component.setAsDefaultField = false;
      fixture.detectChanges();
      expect(
        fixture.debugElement.queryAll(By.css('.form-check-input')).length
      ).toEqual(0);

      component.setAsDefaultField = true;
      fixture.detectChanges();
      expect(
        fixture.debugElement.queryAll(By.css('.form-check-input')).length
      ).toEqual(1);
    });
  });

  describe('UI close/back button', () => {
    const getBackBtn = () =>
      fixture.debugElement.query(By.css('.btn-secondary'));

    it('should call "back" function after being clicked', () => {
      component.paymentMethodsCount = 0;
      fixture.detectChanges();
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.back).toHaveBeenCalled();
    });

    it('should call back()', () => {
      spyOn(component.goBack, 'emit').and.callThrough();
      component.back();

      expect(component.goBack.emit).toHaveBeenCalledWith();
    });

    it('should call "close" function after being clicked', () => {
      component.paymentMethodsCount = 1;
      fixture.detectChanges();
      spyOn(component, 'close');
      getBackBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.close).toHaveBeenCalled();
    });
  });
});
