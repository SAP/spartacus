import {
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nTestingModule } from '@spartacus/core';

import { CardComponent, FocusConfig, ICON_TYPE } from '@spartacus/storefront';

import { AsmCustomer360ProfileComponent } from './asm-customer-360-profile.component';
import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import {
  AsmCustomer360CustomerProfile,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import { By } from '@angular/platform-browser';

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCustomer360ProfileComponent', () => {
  const mockCustomerProfile: AsmCustomer360CustomerProfile = {
    type: AsmCustomer360Type.CUSTOMER_PROFILE,
    profile: {
      billingAddress: {
        id: '8796098854935',
        line1: 'billing address line1',
        line2: 'billing address line2',
        town: 'Sunnyvale',
        region: {
          isocode: 'string',
          isocodeShort: 'string',
          countryIso: 'string',
          name: 'string',
        },
        country: {
          isocode: 'US',
          name: 'United States',
        },
      },
      deliveryAddress: {
        id: '8796098854935',
        line1: 'd address line1',
        line2: 'd address line2',
        town: 'Sunnyvale',
        region: {
          isocode: 'string',
          isocodeShort: 'string',
          countryIso: 'string',
          name: 'string',
        },
        country: {
          isocode: 'US',
          name: 'United States',
        },
      },
      phone1: '090 0987 432',
      phone2: '090 0987 653',
      paymentDetails: [
        {
          id: '8796125822999',
          cardType: { code: 'visa', name: 'Visa' },
          cardNumber: '************6182',
          expiryMonth: '02',
          expiryYear: '2999',
          defaultPayment: true,
        },
      ],
    },
  };
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

  let component: AsmCustomer360ProfileComponent;
  let fixture: ComponentFixture<AsmCustomer360ProfileComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomer360ProfileComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        CardComponent,
      ],
      providers: [
        AsmCustomer360SectionContextSource,
        {
          provide: AsmCustomer360SectionContext,
          useExisting: AsmCustomer360SectionContextSource,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomer360ProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    const contextSource = TestBed.inject(AsmCustomer360SectionContextSource);

    contextSource.data$.next(mockCustomerProfile);
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display billing addresses', () => {
    const billingLine1 = el.query(By.css('.billing-address .address-line1'));
    const billingLine2 = el.query(By.css('.billing-address .address-line2'));
    const billingTown = el.query(By.css('.billing-address .address-town'));
    const billingRegion = el.query(By.css('.billing-address .address-region'));
    const billingCountry = el.query(
      By.css('.billing-address .address-country')
    );

    expect(billingLine1.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.billingAddress?.line1
    );
    expect(billingLine2.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.billingAddress?.line2
    );
    expect(billingTown.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.billingAddress?.town + ', '
    );
    expect(billingRegion.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.billingAddress?.region?.isocode + ', '
    );
    expect(billingCountry.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.billingAddress?.country?.name
    );
  });

  it('should display delivery addresses', () => {
    const line1 = el.query(By.css('.delivery-address .address-line1'));
    const line2 = el.query(By.css('.delivery-address .address-line2'));
    const town = el.query(By.css('.delivery-address .address-town'));
    const region = el.query(By.css('.delivery-address .address-region'));
    const country = el.query(By.css('.delivery-address .address-country'));

    expect(line1.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.deliveryAddress?.line1
    );
    expect(line2.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.deliveryAddress?.line2
    );
    expect(town.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.deliveryAddress?.town + ', '
    );
    expect(region.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.deliveryAddress?.region?.isocode + ', '
    );
    expect(country.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.deliveryAddress?.country?.name
    );
  });

  it('should display phone number', () => {
    const phone1 = el.query(By.css('.profile-phone1'));
    const phone2 = el.query(By.css('.profile-phone2'));
    expect(phone1.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.phone1
    );
    expect(phone2.nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.phone2
    );
  });

  it('should display payment method cards', () => {
    const cards = el.queryAll(By.css('cx-card'));
    expect(cards.length).toEqual(1);

    const cardLabels = cards[0].queryAll(By.css('cx-card .cx-card-label'));
    expect(cardLabels[0].nativeElement.innerText).toBe(
      mockCustomerProfile.profile?.paymentDetails?.[0]?.cardNumber
    );
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
