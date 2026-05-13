import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  CardType,
  Country,
  CxDatePipe,
  FeatureDirective,
  GlobalMessageService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  PaymentDetails,
  TranslatePipe,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  CardComponent,
  FormErrorsModule,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  NgSelectA11yModule,
  SpinnerComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'core-libs/storefrontlib/shared/test/mock-feature-directive';
import { EMPTY, Observable, of } from 'rxjs';
import {
  CheckoutBillingAddressFormComponent,
  CheckoutBillingAddressFormService,
} from '../../checkout-billing-address';
import { CheckoutPaymentFormComponent } from './checkout-payment-form.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    NgSelectA11yModule,
    I18nTestingModule,
    FormErrorsModule,
  ],
})
class MockSpinnerComponent {}

const mockBillingCountries: Country[] = [
  {
    isocode: 'CA',
    name: 'Canada',
  },
];

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
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    NgSelectA11yModule,
    I18nTestingModule,
    FormErrorsModule,
  ],
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
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    NgSelectA11yModule,
    I18nTestingModule,
    FormErrorsModule,
  ],
})
class MockCardComponent {
  @Input()
  content: any;
}

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    NgSelectA11yModule,
    I18nTestingModule,
    FormErrorsModule,
  ],
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

class MockCheckoutBillingAddressFormService
  implements Partial<CheckoutBillingAddressFormService>
{
  getBillingAddress(): Address {
    return mockBillingAddress;
  }
  isBillingAddressSameAsDeliveryAddress(): boolean {
    return true;
  }
  isBillingAddressFormValid(): boolean {
    return true;
  }
}

describe('CheckoutPaymentFormComponent', () => {
  let component: CheckoutPaymentFormComponent;
  let fixture: ComponentFixture<CheckoutPaymentFormComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;
  let mockCheckoutPaymentService: MockCheckoutPaymentService;
  let mockUserPaymentService: MockUserPaymentService;
  let mockGlobalMessageService: MockGlobalMessageService;

  let controls: {
    payment: UntypedFormGroup['controls'];
  };

  beforeEach(waitForAsync(() => {
    mockCheckoutDeliveryService = new MockCheckoutDeliveryService();
    mockCheckoutPaymentService = new MockCheckoutPaymentService();
    mockUserPaymentService = new MockUserPaymentService();
    mockGlobalMessageService = new MockGlobalMessageService();

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        NgSelectA11yModule,
        FormErrorsModule,
        CheckoutPaymentFormComponent,
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
        {
          provide: CheckoutBillingAddressFormService,
          useClass: MockCheckoutBillingAddressFormService,
        },
      ],
    })
      .overrideComponent(CheckoutPaymentFormComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            CardComponent,
            CheckoutBillingAddressFormComponent,
            IconComponent,
            SpinnerComponent,
            FeatureDirective,
          ],
        },
        add: {
          changeDetection: ChangeDetectionStrategy.Default,
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockCardComponent,
            MockBillingAddressFormComponent,
            MockCxIconComponent,
            MockSpinnerComponent,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPaymentFormComponent);
    component = fixture.componentInstance;
    controls = {
      payment: component.paymentForm.controls,
    };
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

  it('should call ngOnInit to get supported card types if they exist', () => {
    mockCheckoutPaymentService.getPaymentCardTypes =
      createSpy().and.returnValue(of(mockCardTypes));

    component.ngOnInit();
    component.cardTypes$.subscribe((cardTypes: CardType[]) => {
      expect(cardTypes).toBe(mockCardTypes);
    });
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

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalledTimes(1);

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

    it('should show assitive message when form is submitted with errors', () => {
      component.paymentForm.setErrors({ required: true });
      component.next();
      expect(mockGlobalMessageService.add).toHaveBeenCalled();
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
