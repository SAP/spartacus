import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import {
  Address,
  AddressValidation,
  CardType,
  Country,
  GlobalMessageService,
  I18nTestingModule,
  Region,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  ICON_TYPE,
  ModalService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PaymentFormComponent } from './payment-form.component';
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

class MockCheckoutPaymentService {
  loadSupportedCardTypes = createSpy();
  getCardTypes(): Observable<CardType[]> {
    return of();
  }

  getSetPaymentDetailsResultProcess() {
    return of({ loading: false });
  }
}

class MockCheckoutDeliveryService {
  getDeliveryAddress(): Observable<Address> {
    return of(null);
  }
  getAddressVerificationResults(): Observable<AddressValidation> {
    return of();
  }

  verifyAddress(_address: Address): void {}

  clearAddressVerificationResults(): void {}
}

class MockUserPaymentService {
  loadBillingCountries = createSpy();
  getAllBillingCountries(): Observable<Country[]> {
    return new BehaviorSubject(mockBillingCountries);
  }
}

class MockGlobalMessageService {
  add = createSpy();
}

const mockSuggestedAddressModalRef: any = {
  componentInstance: {
    enteredAddress: '',
    suggestedAddresses: '',
  },
  result: new Promise((resolve) => {
    return resolve(true);
  }),
};

class MockModalService {
  open(): any {
    return mockSuggestedAddressModalRef;
  }
}

class MockUserAddressService {
  getRegions(): Observable<Region[]> {
    return of([]);
  }
  verifyAddress(): Observable<AddressValidation> {
    return of({});
  }
}

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;
  let mockCheckoutPaymentService: MockCheckoutPaymentService;
  let mockUserPaymentService: MockUserPaymentService;
  let mockGlobalMessageService: MockGlobalMessageService;
  let userAddressService: UserAddressService;

  let controls: {
    payment: FormGroup['controls'];
    billingAddress: FormGroup['controls'];
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
          PaymentFormComponent,
          MockCardComponent,
          MockBillingAddressFormComponent,
          MockCxIconComponent,
          MockSpinnerComponent,
        ],
        providers: [
          { provide: ModalService, useClass: MockModalService },
          {
            provide: CheckoutPaymentFacade,
            useValue: mockCheckoutPaymentService,
          },
          {
            provide: CheckoutDeliveryFacade,
            useValue: mockCheckoutDeliveryService,
          },
          { provide: UserPaymentService, useValue: mockUserPaymentService },
          { provide: GlobalMessageService, useValue: mockGlobalMessageService },
          { provide: UserAddressService, useClass: MockUserAddressService },
        ],
      })
        .overrideComponent(PaymentFormComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
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

  it('should call ngOnInit to get billing countries', () => {
    spyOn(mockUserPaymentService, 'getAllBillingCountries').and.returnValue(
      of(mockBillingCountries)
    );
    component.ngOnInit();
    component.countries$.subscribe((countries: Country[]) => {
      expect(countries).toBe(mockBillingCountries);
    });
  });

  it('should call ngOnInit to get supported card types if they do not exist', (done) => {
    spyOn(mockCheckoutPaymentService, 'getCardTypes').and.returnValue(of([]));
    component.ngOnInit();
    component.cardTypes$.subscribe(() => {
      expect(
        mockCheckoutPaymentService.loadSupportedCardTypes
      ).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get supported card types if they exist', () => {
    spyOn(mockCheckoutPaymentService, 'getCardTypes').and.returnValue(
      of(mockCardTypes)
    );
    component.ngOnInit();
    component.cardTypes$.subscribe((cardTypes: CardType[]) => {
      expect(cardTypes).toBe(mockCardTypes);
    });
  });

  it('should call ngOnInit to get shipping address set in cart', () => {
    spyOn(mockCheckoutPaymentService, 'getCardTypes').and.returnValue(
      of(mockCardTypes)
    );
    spyOn(mockCheckoutDeliveryService, 'getDeliveryAddress').and.returnValue(
      of(mockAddress)
    );
    component.ngOnInit();
    component.cardTypes$.subscribe((cardTypes: CardType[]) => {
      expect(cardTypes).toBe(mockCardTypes);
    });
    component.shippingAddress$.subscribe((address: Address) => {
      expect(address).toBe(mockAddress);
    });
  });

  it('should call ngOnInit to load billing countries', () => {
    spyOn(mockUserPaymentService, 'getAllBillingCountries').and.returnValue(
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

  it('should call getAddressCardContent(address)', () => {
    const card = component.getAddressCardContent(mockAddress);
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, JP',
      'zip',
      undefined,
    ]);
  });

  it('should call toggleSameAsShippingAddress()', () => {
    spyOn(component, 'toggleSameAsShippingAddress').and.callThrough();
    component.sameAsShippingAddress = true;

    component.toggleSameAsShippingAddress();

    expect(component.toggleSameAsShippingAddress).toHaveBeenCalled();
    expect(component.sameAsShippingAddress).toBeFalsy();
  });

  it('should call verifyAddress() when billing address not same as shipping', () => {
    spyOn(component, 'next');
    spyOn(userAddressService, 'verifyAddress').and.returnValue(
      of({
        decision: 'ACCEPT',
      })
    );

    component.sameAsShippingAddress = true;

    component.verifyAddress();

    expect(component.next).toHaveBeenCalled();

    component.sameAsShippingAddress = false;
    component.verifyAddress();
    expect(userAddressService.verifyAddress).toHaveBeenCalled();
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.btn-primary'));

    it('should call "next" function when being clicked and when form is valid - with billing address', () => {
      spyOn(mockCheckoutPaymentService, 'getCardTypes').and.returnValue(
        of(mockCardTypes)
      );
      spyOn(mockCheckoutDeliveryService, 'getDeliveryAddress').and.returnValue(
        of(mockAddress)
      );
      spyOn(mockUserPaymentService, 'getAllBillingCountries').and.returnValue(
        of(mockBillingCountries)
      );
      spyOn(component, 'next');

      component.showSameAsShippingAddressCheckbox$ = of(false);
      component.sameAsShippingAddress = false;

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
      spyOn(mockCheckoutPaymentService, 'getCardTypes').and.returnValue(
        of(mockCardTypes)
      );
      spyOn(mockCheckoutDeliveryService, 'getDeliveryAddress').and.returnValue(
        of(mockAddress)
      );
      spyOn(mockUserPaymentService, 'getAllBillingCountries').and.returnValue(
        of(mockBillingCountries)
      );
      spyOn(component, 'next');

      // hide billing address
      component.sameAsShippingAddress = true;

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
    const getBackBtn = () => fixture.debugElement.query(By.css('.btn-action'));

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
