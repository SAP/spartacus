import { Component, OnInit } from '@angular/core';
import { AsmConfig } from '@spartacus/asm/core';

import { Address, PaymentDetails, TranslationService } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  Card,
  FocusConfig,
  ICON_TYPE,
  ModalService,
} from '@spartacus/storefront';

import { combineLatest, forkJoin, of, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerProfileData } from './asm-customer-profile.model';

@Component({
  selector: 'cx-asm-customer-profile',
  templateUrl: './asm-customer-profile.component.html',
})
export class AsmCustomerProfileComponent implements OnInit {
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'customer-list-selector',
    focusOnEscape: true,
  };

  iconTypes = ICON_TYPE;

  BREAKPOINT = BREAKPOINT;

  breakpoint$: Observable<BREAKPOINT>;

  // customerListConfig = this.asmConfig?.asm?.customerList;

  customerProfileData$: Observable<CustomerProfileData>;

  protected subscription = new Subscription();

  constructor(
    protected modalService: ModalService,
    protected breakpointService: BreakpointService,
    protected asmConfig: AsmConfig,
    protected translation: TranslationService
  ) {
    this.breakpoint$ = this.getBreakpoint();
  }

  ngOnInit(): void {
    this.getSamplePaymentMethods();

    this.customerProfileData$ = forkJoin([
      of(this.getSamplePaymentMethods()),
      of(this.getAddresses()),
    ]).pipe(
      map(([paymentDetails, addresses]) => {
        const defaultPaymentDetail = paymentDetails.find(
          (paymentDetail) => paymentDetail.defaultPayment
        );
        const deliveryAddress = addresses.find(
          (address) => address.defaultAddress
        );
        return {
          billingAddress: defaultPaymentDetail?.billingAddress,
          deliveryAddress: deliveryAddress,
          phone1: deliveryAddress?.phone,
          phone2: deliveryAddress?.cellphone,
          paymentInfoList: paymentDetails,
        };
      })
    );
  }

  getCardContent({
    defaultPayment,
    expiryMonth,
    expiryYear,
    cardNumber,
    cardType,
  }: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentCard.expires', {
        month: expiryMonth,
        year: expiryYear,
      }),
      this.translation.translate('paymentCard.defaultPaymentMethod'),
    ]).pipe(
      map(([textExpires, textDefaultPaymentMethod]) => {
        const card: Card = {
          role: 'region',
          header: defaultPayment ? textDefaultPaymentMethod : undefined,
          text: [cardNumber ?? '', textExpires],
          img: this.getCardIcon(cardType?.code ?? ''),
          label: defaultPayment
            ? 'paymentCard.defaultPaymentLabel'
            : 'paymentCard.additionalPaymentLabel',
        };

        return card;
      })
    );
  }

  getCardIcon(code: string): string {
    let ccIcon: string;
    if (code === 'visa') {
      ccIcon = this.iconTypes.VISA;
    } else if (code === 'master' || code === 'mastercard_eurocard') {
      ccIcon = this.iconTypes.MASTER_CARD;
    } else if (code === 'diners') {
      ccIcon = this.iconTypes.DINERS_CLUB;
    } else if (code === 'amex') {
      ccIcon = this.iconTypes.AMEX;
    } else {
      ccIcon = this.iconTypes.CREDIT_CARD;
    }
    return ccIcon;
  }

  private getBreakpoint(): Observable<BREAKPOINT> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        if (breakpoint === BREAKPOINT.lg || breakpoint === BREAKPOINT.xl) {
          breakpoint = BREAKPOINT.md;
        }
        return breakpoint;
      })
    );
  }

  private getSamplePaymentMethods(): PaymentDetails[] {
    const paymentMethods: PaymentDetails[] = [
      {
        accountHolderName: 'hak',
        billingAddress: {
          country: {
            isocode: 'US',
          },
          defaultAddress: false,
          email: 'kimhakwo@hotmail.com',
          firstName: 'billingFirst',
          formattedAddress:
            '53 State St Billing, Billing 2nd line, Massachusetts, Boston, 02109',
          id: '8796158951447',
          lastName: 'billingLast',
          line1: '53 State St Billing, Billing 2nd line',
          phone: '14165053687',
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
      },
      {
        accountHolderName: 'hakMaster',
        billingAddress: {
          country: {
            isocode: 'US',
          },
          defaultAddress: false,
          email: 'kimhakwo@hotmail.com',
          firstName: 'US',
          formattedAddress: '53 State St, , Massachusetts, Boston, 02109',
          id: '8796159311895',
          lastName: 'Hak',
          line1: '53 State St, ',
          phone: '14165053687',
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
      },
      {
        accountHolderName: 'hakMaster',
        billingAddress: {
          country: {
            isocode: 'US',
          },
          defaultAddress: false,
          email: 'kimhakwo@hotmail.com',
          firstName: 'US',
          formattedAddress: '27 Corvus Starway, , Massachusetts, Boston, 02109',
          id: '8796159311895',
          lastName: 'Hak',
          line1: '27 Corvus Starway, ',
          phone: '14165053687',
          postalCode: '02109',
          region: {
            isocode: 'US-MA',
          },
          town: 'Boston',
        },
        cardNumber: '************1234',
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
      },
    ];

    return paymentMethods;
  }

  private getAddresses(): Address[] {
    const addresses = [
      {
        country: {
          isocode: 'US',
        },
        defaultAddress: true,
        firstName: 'US',
        formattedAddress: '53 State St,, , Massachusetts, Boston, 02109',
        id: '8796158918679',
        lastName: 'Hak',
        line1: '53 State St,',
        line2: '',
        phone: '14165053687',
        postalCode: '02109',
        region: {
          isocode: 'US-MA',
        },
        titleCode: 'mr',
        town: 'Boston',
      },
      {
        country: {
          isocode: 'US',
        },
        defaultAddress: false,
        firstName: 'FirstName1',
        formattedAddress:
          '53 State St Address line2,, Address line2, Massachusetts, Boston, 02109',
        id: '8796159344663',
        lastName: 'LastName1',
        line1: '53 State St Address line2,',
        line2: 'Address line2',
        phone: '14165053687',
        postalCode: '02109',
        region: {
          isocode: 'US-MA',
        },
        titleCode: 'mr',
        town: 'Boston',
      },
    ];

    return addresses;
  }
}
