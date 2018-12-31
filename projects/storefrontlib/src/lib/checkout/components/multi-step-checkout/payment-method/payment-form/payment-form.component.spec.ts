import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

import { PaymentFormComponent } from './payment-form.component';
import {
  CardType,
  Address,
  CheckoutService,
  Country,
  UserService
} from '@spartacus/core';

const mockBillingCountries: Country[] = [
  {
    isocode: 'CA',
    name: 'Canada'
  }
];

const mockBillingAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Green Street',
  line2: '420',
  town: 'Montreal',
  region: { isocode: 'CA-QC' },
  postalCode: 'H3A',
  country: { isocode: 'CA' }
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
  country: { isocode: 'JP' }
};

const mockCardTypes: CardType[] = [
  {
    code: 'amex',
    name: 'American Express'
  },
  {
    code: 'maestro',
    name: 'Maestro'
  }
];

@Component({
  selector: 'cx-billing-address-form',
  template: ''
})
class MockBillingAddressFormComponent {
  @Input()
  billingAddress: Address;
  @Input()
  countries$: Observable<Country[]>;
}

@Component({
  selector: 'cx-card',
  template: ''
})
class MockCardComponent {
  @Input()
  content: any;
}

class MockCheckoutService {
  loadSupportedCardTypes = createSpy();
  getCardTypes(): Observable<CardType[]> {
    return of();
  }
  getDeliveryAddress(): Observable<Address> {
    return of(null);
  }
}

class MockUserService {
  loadBillingCountries = createSpy();
  getAllBillingCountries(): Observable<Country[]> {
    return new BehaviorSubject(mockBillingCountries);
  }
}

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let mockCheckoutService: MockCheckoutService;
  let mockUserService: MockUserService;
  let showSameAsShippingAddressCheckboxSpy: jasmine.Spy;

  let controls: {
    payment: FormGroup['controls'];
    billingAddress: FormGroup['controls'];
  };

  beforeEach(async(() => {
    mockCheckoutService = new MockCheckoutService();
    mockUserService = new MockUserService();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgSelectModule],
      declarations: [
        PaymentFormComponent,
        MockCardComponent,
        MockBillingAddressFormComponent
      ],
      providers: [
        { provide: CheckoutService, useValue: mockCheckoutService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
      .overrideComponent(PaymentFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    mockCheckoutService = TestBed.get(CheckoutService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    controls = {
      payment: component.payment.controls,
      billingAddress: component.billingAddress.controls
    };

    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backToPayment, 'emit').and.callThrough();

    showSameAsShippingAddressCheckboxSpy = spyOn(
      component,
      'showSameAsShippingAddressCheckbox'
    ).and.returnValue(of(true));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get billing countries', () => {
    spyOn(mockUserService, 'getAllBillingCountries').and.returnValue(
      of(mockBillingCountries)
    );
    component.ngOnInit();
    component.countries$.subscribe((countries: Country[]) => {
      expect(countries).toBe(mockBillingCountries);
    });
  });

  it('should call ngOnInit to get supported card types if they do not exist', done => {
    spyOn(mockCheckoutService, 'getCardTypes').and.returnValue(of([]));
    component.ngOnInit();
    component.cardTypes$.subscribe(() => {
      expect(mockCheckoutService.loadSupportedCardTypes).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get supported card types if they exist', () => {
    spyOn(mockCheckoutService, 'getCardTypes').and.returnValue(
      of(mockCardTypes)
    );
    component.ngOnInit();
    component.cardTypes$.subscribe((cardTypes: CardType[]) => {
      expect(cardTypes).toBe(mockCardTypes);
    });
  });

  it('should call ngOnInit to get shipping address set in cart', () => {
    spyOn(mockCheckoutService, 'getCardTypes').and.returnValue(
      of(mockCardTypes)
    );
    spyOn(mockCheckoutService, 'getDeliveryAddress').and.returnValue(
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

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.payment.value.defaultPayment = false;
    component.toggleDefaultPaymentMethod();
    expect(component.payment.value.defaultPayment).toBeTruthy();
  });

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.payment.value.defaultPayment = true;
    component.toggleDefaultPaymentMethod();
    expect(component.payment.value.defaultPayment).toBeFalsy();
  });

  it('should call next()', () => {
    component.next();
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith(
      component.payment.value
    );
  });

  it('should call back()', () => {
    component.back();
    expect(component.backToPayment.emit).toHaveBeenCalled();
  });

  it('should call paymentSelected(card)', () => {
    component.paymentSelected({ code: 'test select payment' });
    expect(
      component.payment['controls'].cardType['controls'].code.value
    ).toEqual('test select payment');
  });

  it('should call monthSelected(month)', () => {
    component.monthSelected({ id: '05', name: '05' });
    expect(component.payment['controls'].expiryMonth.value).toEqual('05');
  });

  it('should call yearSelected(year)', () => {
    component.yearSelected({ name: '2022' });
    expect(component.payment['controls'].expiryYear.value).toEqual('2022');
  });

  it('should call getAddressCardContent(address)', () => {
    const card = component.getAddressCardContent(mockAddress);
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, JP',
      'zip',
      undefined
    ]);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.btn-primary'));

    it('should call "next" function when being clicked and when form is valid', () => {
      spyOn(mockCheckoutService, 'getCardTypes').and.returnValue(
        of(mockCardTypes)
      );
      spyOn(mockCheckoutService, 'getDeliveryAddress').and.returnValue(
        of(mockAddress)
      );
      spyOn(mockUserService, 'getAllBillingCountries').and.returnValue(
        of(mockBillingCountries)
      );
      spyOn(component, 'next');

      // show billing address
      showSameAsShippingAddressCheckboxSpy.calls.reset();
      showSameAsShippingAddressCheckboxSpy.and.returnValue(of(false));
      component.sameAsShippingAddress = false;

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).not.toHaveBeenCalled();

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
      controls.billingAddress['titleCode'].setValue(
        mockBillingAddress.titleCode
      );
      controls.billingAddress['firstName'].setValue(
        mockBillingAddress.firstName
      );
      controls.billingAddress['lastName'].setValue(mockBillingAddress.lastName);
      controls.billingAddress['line1'].setValue(mockBillingAddress.line1);
      controls.billingAddress['line2'].setValue(mockBillingAddress.line2);
      controls.billingAddress['town'].setValue(mockBillingAddress.town);
      controls.billingAddress.region['controls'].isocode.setValue(
        mockBillingAddress.region
      );
      controls.billingAddress.country['controls'].isocode.setValue(
        mockBillingAddress.country
      );
      controls.billingAddress['postalCode'].setValue(
        mockBillingAddress.postalCode
      );

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).toHaveBeenCalled();
    });

    it('should call "next" function when being clicked and when form is valid - without billing address', () => {
      spyOn(mockCheckoutService, 'getCardTypes').and.returnValue(
        of(mockCardTypes)
      );
      spyOn(mockCheckoutService, 'getDeliveryAddress').and.returnValue(
        of(mockAddress)
      );
      spyOn(mockUserService, 'getAllBillingCountries').and.returnValue(
        of(mockBillingCountries)
      );
      spyOn(component, 'next');

      // hide billing address
      component.sameAsShippingAddress = true;

      fixture.detectChanges();
      getContinueBtn().nativeElement.click();
      expect(component.next).not.toHaveBeenCalled();

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
      expect(component.next).toHaveBeenCalled();
    });

    it('should be enabled only when form has all mandatory fields filled - with billing address', () => {
      const isContinueBtnDisabled = () => {
        fixture.detectChanges();
        return getContinueBtn().nativeElement.disabled;
      };

      // show billing address
      showSameAsShippingAddressCheckboxSpy.calls.reset();
      showSameAsShippingAddressCheckboxSpy.and.returnValue(of(false));
      component.sameAsShippingAddress = false;
      fixture.detectChanges();

      // set values for payment form
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['accountHolderName'].setValue('test accountHolderName');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['cardNumber'].setValue('test cardNumber');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment.cardType['controls'].code.setValue(
        'test card type code'
      );
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['expiryMonth'].setValue('test expiryMonth');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['expiryYear'].setValue('test expiryYear');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['cvn'].setValue('test cvn');

      // set values for billing address form
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress['titleCode'].setValue(
        mockBillingAddress.titleCode
      );
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress['firstName'].setValue(
        mockBillingAddress.firstName
      );
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress['lastName'].setValue(mockBillingAddress.lastName);
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress['line1'].setValue(mockBillingAddress.line1);
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress['line2'].setValue(mockBillingAddress.line2);
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress['town'].setValue(mockBillingAddress.town);
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress.region['controls'].isocode.setValue(
        mockBillingAddress.region
      );
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress.country['controls'].isocode.setValue(
        mockBillingAddress.country
      );
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.billingAddress['postalCode'].setValue(
        mockBillingAddress.postalCode
      );

      expect(isContinueBtnDisabled()).toBeFalsy();
    });

    it('should be enabled only when form has all mandatory fields filled - without billing address', () => {
      const isContinueBtnDisabled = () => {
        fixture.detectChanges();
        return getContinueBtn().nativeElement.disabled;
      };

      // hide billing address
      component.sameAsShippingAddress = true;
      fixture.detectChanges();

      // set values for payment form

      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['accountHolderName'].setValue('test accountHolderName');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['cardNumber'].setValue('test cardNumber');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment.cardType['controls'].code.setValue(
        'test card type code'
      );
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['expiryMonth'].setValue('test expiryMonth');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['expiryYear'].setValue('test expiryYear');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.payment['cvn'].setValue('test cvn');

      fixture.detectChanges();

      expect(isContinueBtnDisabled()).toBeFalsy();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () => fixture.debugElement.query(By.css('.btn-action'));

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      fixture.detectChanges();
      expect(component.back).toHaveBeenCalled();
    });
  });
});
