import {
  Component,
  DebugElement,
  Directive,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEntry } from '@spartacus/cart/base/root';
import {
  Address,
  I18nTestingModule,
  PaymentDetails,
  Price,
  Product,
  User,
  UserPaymentService,
} from '@spartacus/core';
import {
  AddressBookComponentService,
  CardComponent,
  FocusConfig,
  ICON_TYPE,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { By } from '@angular/platform-browser';
import { AsmCustomerProfileComponent } from './asm-customer-profile.component';

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCustomerProfileComponent', () => {
  @Pipe({
    name: 'cxTranslate',
  })
  class MockTranslatePipe implements PipeTransform {
    transform(): any {}
  }
  @Component({
    selector: 'cx-icon',
    template: '',
  })
  class MockCxIconComponent {
    @Input() type: ICON_TYPE;
  }

  @Component({
    template: '',
    selector: '[cx-asm-product-item], cx-asm-product-item',
  })
  class MockAsmProductItemComponent {
    @Input() item: OrderEntry;
    @Input() product: Product;
    @Input() quantity: number;
    @Input() price: Price;
    @Input() isOrderEntry = true;
    @Output() selectProduct = new EventEmitter<Product>();
  }
  const mockPayment1: PaymentDetails = {
    accountHolderName: 'hak',
    billingAddress: {
      country: {
        isocode: 'US',
      },
      defaultAddress: false,
      email: 'kimhakwo@test.com',
      firstName: 'billingFirst',
      formattedAddress:
        '53 State St Billing, Billing 2nd line, Massachusetts, Boston, 02109',
      id: '8796158951447',
      lastName: 'billingLast',
      line1: '53 State St Billing',
      line2: 'Billing 2nd line',
      phone: '14165053699',
      postalCode: '02109',
      region: {
        isocode: 'US-MA',
      },
      town: 'Boston',
    },
    cardNumber: '************1111',
    cardType: {
      code: 'visa',
      name: 'Visa',
    },
    defaultPayment: true,
    expiryMonth: '3',
    expiryYear: '2030',
    id: '8796125921322',
    saved: true,
    subscriptionId: 'f009b2cf-3ac4-4763-a7ce-80c9e0c98f25',
  };
  const mockPayment2: PaymentDetails = {
    accountHolderName: 'hakMaster',
    billingAddress: {
      country: {
        isocode: 'US',
      },
      defaultAddress: false,
      email: 'kimhakwo@test.com',
      firstName: 'US',
      formattedAddress: '53 State St, , Massachusetts, Boston, 02109',
      id: '8796159311895',
      lastName: 'Hak',
      line1: '53 State St, ',
      line2: 'Billing 2nd line',
      phone: '14165053699',
      postalCode: '02109',
      region: {
        isocode: 'US-MA',
      },
      town: 'Boston',
    },
    cardNumber: '************4444',
    cardType: {
      code: 'master',
      name: 'Mastercard',
    },
    defaultPayment: false,
    expiryMonth: '3',
    expiryYear: '2030',
    id: '8796126052394',
    saved: true,
    subscriptionId: 'd90bb4b2-0bd3-4620-986f-43e2d062afe0',
  };
  class MockUserPaymentService {
    getPaymentMethodsLoading(): Observable<boolean> {
      return of();
    }
    getPaymentMethods(): Observable<PaymentDetails[]> {
      return of([mockPayment1]);
    }
    loadPaymentMethods(): void {}
    deletePaymentMethod(_paymentMethodId: string): void {}
    setPaymentMethodAsDefault(_paymentMethodId: string): void {}
  }

  const mockAddress: Address = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    titleCode: 'mr',
    line1: 'Toyosaki 2 create on cart',
    line2: 'line2',
    town: 'town',
    region: { isocode: 'JP-27' },
    postalCode: 'zip',
    country: { isocode: 'JP' },
    phone: '14165053687',
    cellphone: '14165053699',
    defaultAddress: true,
  };

  const mockUser: User = {
    uid: '1234',
  };

  const isLoading = new BehaviorSubject<boolean>(false);
  class MockComponentService {
    loadAddresses = jasmine.createSpy();
    addUserAddress = jasmine.createSpy();
    updateUserAddress = jasmine.createSpy();
    deleteUserAddress = jasmine.createSpy();
    setAddressAsDefault = jasmine.createSpy();
    getAddressesStateLoading(): Observable<boolean> {
      return isLoading.asObservable();
    }
    getAddresses(): Observable<Address[]> {
      return of([mockAddress, mockAddress, mockAddress]);
    }
    getUserId(): Observable<string> {
      return of(mockUser.uid ?? '');
    }
  }

  let component: AsmCustomerProfileComponent;
  let fixture: ComponentFixture<AsmCustomerProfileComponent>;
  let el: DebugElement;
  let userPaymentService: UserPaymentService;
  let addressBookComponentService: AddressBookComponentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerProfileComponent,
        MockAsmProductItemComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        CardComponent,
      ],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        {
          provide: AddressBookComponentService,
          useClass: MockComponentService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userPaymentService = TestBed.inject(UserPaymentService);
    addressBookComponentService = TestBed.inject(AddressBookComponentService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display addresses and phone numbers', () => {
    spyOn(addressBookComponentService, 'getAddresses').and.returnValue(
      of([mockAddress])
    );
    spyOn(userPaymentService, 'getPaymentMethods').and.returnValue(
      of([mockPayment1, mockPayment2])
    );

    fixture.detectChanges();
    expect(addressBookComponentService.getAddresses).toHaveBeenCalled();
    expect(userPaymentService.getPaymentMethods).toHaveBeenCalled();

    const billingLine1 = el.query(By.css('.billing-address .address-line1'));
    const billingLine2 = el.query(By.css('.billing-address .address-line2'));
    const billingTown = el.query(By.css('.billing-address .address-town'));
    const billingRegion = el.query(By.css('.billing-address .address-region'));
    const billingCountry = el.query(
      By.css('.billing-address .address-country')
    );

    expect(billingLine1.nativeElement.innerText).toBe(
      mockPayment1.billingAddress?.line1
    );
    expect(billingLine2.nativeElement.innerText).toBe(
      mockPayment1.billingAddress?.line2
    );
    expect(billingTown.nativeElement.innerText).toBe(
      mockPayment1.billingAddress?.town + ', '
    );
    expect(billingRegion.nativeElement.innerText).toBe(
      mockPayment1.billingAddress?.region?.isocode + ', '
    );
    expect(billingCountry.nativeElement.innerText).toBe(
      mockPayment1.billingAddress?.country?.isocode
    );

    const deliveryLine1 = el.query(By.css('.delivery-address .address-line1'));
    const deliveryLine2 = el.query(By.css('.delivery-address .address-line2'));
    const deliveryTown = el.query(By.css('.delivery-address .address-town'));
    const deliveryRegion = el.query(
      By.css('.delivery-address .address-region')
    );
    const deliveryCountry = el.query(
      By.css('.delivery-address .address-country')
    );

    expect(deliveryLine1.nativeElement.innerText).toBe(mockAddress?.line1);
    expect(deliveryLine2.nativeElement.innerText).toBe(mockAddress?.line2);
    expect(deliveryTown.nativeElement.innerText).toBe(mockAddress?.town + ', ');
    expect(deliveryRegion.nativeElement.innerText).toBe(
      mockAddress?.region?.isocode + ', '
    );
    expect(deliveryCountry.nativeElement.innerText).toBe(
      mockAddress?.country?.isocode
    );

    const phone1 = el.query(By.css('.cx-asm-profile-container.profile-phone1'));
    const phone2 = el.query(By.css('.cx-asm-profile-container.profile-phone2'));
    expect(phone1.nativeElement.innerText).toBe(mockAddress?.phone);
    expect(phone2.nativeElement.innerText).toBe(mockAddress?.cellphone);
  });

  it('should display payment method cards', () => {
    spyOn(addressBookComponentService, 'getAddresses').and.returnValue(
      of([mockAddress])
    );
    spyOn(userPaymentService, 'getPaymentMethods').and.returnValue(
      of([mockPayment1, mockPayment2])
    );
    fixture.detectChanges();

    expect(addressBookComponentService.getAddresses).toHaveBeenCalled();
    expect(userPaymentService.getPaymentMethods).toHaveBeenCalled();

    const cards = el.queryAll(By.css('cx-card'));
    expect(cards.length).toEqual(2);

    const cardLabels = cards[0].queryAll(By.css('cx-card .cx-card-label'));
    expect(cardLabels[0].nativeElement.innerText).toBe(mockPayment1.cardNumber);
  });

  it('should return the proper card icon based on its card type', () => {
    const otherCardType = 'MockCardType';
    expect(component.getCardIcon('visa')).toBe(ICON_TYPE.VISA);
    expect(component.getCardIcon('master')).toBe(ICON_TYPE.MASTER_CARD);
    expect(component.getCardIcon('mastercard_eurocard')).toBe(
      ICON_TYPE.MASTER_CARD
    );
    expect(component.getCardIcon('diners')).toBe(ICON_TYPE.DINERS_CLUB);
    expect(component.getCardIcon('amex')).toBe(ICON_TYPE.AMEX);
    expect(component.getCardIcon(otherCardType)).toBe(ICON_TYPE.CREDIT_CARD);
  });
});
