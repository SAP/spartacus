/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActiveCartFacade, DeliveryMode } from '@spartacus/cart/base/root';
import {
  CheckoutFlowOrchestratorService,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { Address, CmsService, TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { OPF_CHECKOUT_FLOW_NAME } from '../../root/model';
import { OpfCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';
import { OpfBaseFacade } from '@spartacus/opf/base/root';
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { OpfCheckoutBillingAddressFormService } from '../opf-checkout-billing-address-form';

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-opf-checkout-review-card',
  template: '',
})
class MockReviewCardComponent {
  @Input() cardContent$: Observable<Card>;
  @Input() editConfig: any;
}

@Component({
  selector: 'cx-opf-checkout-payments',
  template: '',
})
class MockPaymentsComponent {
  @Input() elementsPerPage: number;
  @Input() explicitTermsAndConditions: boolean;
  @Input() disabled: boolean;
}

@Component({
  selector: 'cx-opf-checkout-terms-and-conditions-alert',
  template: '',
})
class MockTermsAndConditionsAlertComponent {
  @Input() isDismissible: boolean;
  @Input() isVisible: boolean;
  @Input() isExplicit: boolean;
}

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  template: '',
})
class MockBillingAddressFormComponent {}

@Component({
  selector: 'cx-opf-checkout-review-cart-details',
  template: '',
})
class MockReviewCartDetailsComponent {
  @Input() cart: any;
  @Input() entries: any;
}

class MockTranslationService {
  translate(key: string): Observable<string> {
    const translations: { [key: string]: string } = {
      'paymentForm.payment': 'Payment Method',
      'addressCard.shipTo': 'Delivery Address',
      'checkoutMode.deliveryMethod': 'Delivery Mode',
      'checkoutProgress.paymentMethod': 'Payment Method',
      'checkoutProgress.deliveryAddress': 'Delivery Address',
      'checkoutProgress.deliveryMode': 'Delivery Mode',
      'checkoutReview.paymentMethod': 'Payment Method',
      'checkoutReview.deliveryAddress': 'Delivery Address',
      'checkoutReview.deliveryMode': 'Delivery Mode',
    };
    return of(translations[key] || key);
  }
}

class MockStore {
  dispatch(): void {}
  pipe(): Observable<any> {
    return of({});
  }
}

class MockCmsService {
  getCurrentPage(): Observable<any> {
    return of({});
  }
}

class MockOpfBaseFacade {
  getActiveConfigurationsState(): Observable<any> {
    return of({});
  }
}

class MockOpfMetadataStoreService {
  getOpfMetadataState(): Observable<any> {
    return of({});
  }
  updateOpfMetadata(): void {}
}

class MockOpfCheckoutBillingAddressFormService {
  paymentOptionsDisabled$ = of(false);
}

describe('OpfCheckoutPaymentAndReviewComponent', () => {
  let component: OpfCheckoutPaymentAndReviewComponent;
  let fixture: ComponentFixture<OpfCheckoutPaymentAndReviewComponent>;
  let checkoutFlowOrchestratorService: CheckoutFlowOrchestratorService;

  const mockCheckoutStepService = {
    getCheckoutStepUrl: jasmine
      .createSpy('getCheckoutStepUrl')
      .and.returnValue('/checkout/payment-type'),
  };

  const mockCheckoutDeliveryAddressFacade = {
    getDeliveryAddressState: jasmine
      .createSpy('getDeliveryAddressState')
      .and.returnValue(of({})),
    clearCheckoutDeliveryAddress: jasmine.createSpy(
      'clearCheckoutDeliveryAddress'
    ),
  };

  const mockCheckoutPaymentFacade = {
    getPaymentDetailsState: jasmine
      .createSpy('getPaymentDetailsState')
      .and.returnValue(of({})),
  };

  const mockCheckoutDeliveryModesFacade = {
    getSelectedDeliveryModeState: jasmine
      .createSpy('getSelectedDeliveryModeState')
      .and.returnValue(of({})),
    setDeliveryMode: jasmine.createSpy('setDeliveryMode'),
  };

  const mockCheckoutFlowOrchestratorService = {
    getPaymentProvider: jasmine
      .createSpy('getPaymentProvider')
      .and.returnValue(of(OPF_CHECKOUT_FLOW_NAME)),
  };

  const mockActiveCartFacade = {
    hasDeliveryItems: jasmine.createSpy('hasDeliveryItems'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OpfCheckoutPaymentAndReviewComponent,
        MockReviewCardComponent,
        MockPaymentsComponent,
        MockTermsAndConditionsAlertComponent,
        MockBillingAddressFormComponent,
        MockReviewCartDetailsComponent,
        MockTranslatePipe,
      ],
      providers: [
        { provide: CheckoutStepService, useValue: mockCheckoutStepService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useValue: mockCheckoutDeliveryAddressFacade,
        },
        { provide: CheckoutPaymentFacade, useValue: mockCheckoutPaymentFacade },
        {
          provide: CheckoutDeliveryModesFacade,
          useValue: mockCheckoutDeliveryModesFacade,
        },
        {
          provide: CheckoutFlowOrchestratorService,
          useValue: mockCheckoutFlowOrchestratorService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: Store, useClass: MockStore },
        { provide: CmsService, useClass: MockCmsService },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: OpfBaseFacade, useClass: MockOpfBaseFacade },
        { provide: OpfMetadataStoreService, useClass: MockOpfMetadataStoreService },
        { provide: OpfCheckoutBillingAddressFormService, useClass: MockOpfCheckoutBillingAddressFormService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfCheckoutPaymentAndReviewComponent);
    component = fixture.componentInstance;
    checkoutFlowOrchestratorService = TestBed.inject(
      CheckoutFlowOrchestratorService
    );

    (
      checkoutFlowOrchestratorService.getPaymentProvider as jasmine.Spy
    ).calls.reset();
    mockActiveCartFacade.hasDeliveryItems.calls.reset();
    mockCheckoutDeliveryAddressFacade.clearCheckoutDeliveryAddress.calls.reset();
    mockCheckoutDeliveryModesFacade.setDeliveryMode.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get delivery address card', () => {
    const mockAddress: Address = {
      firstName: 'John',
      lastName: 'Doe',
      line1: '123 Main St',
      town: 'Anytown',
      postalCode: '12345',
      country: { isocode: 'US' },
    };
    const mockCountryName = 'United States';

    component
      .getDeliveryAddressCard(mockAddress, mockCountryName)
      .subscribe((card) => {
        expect(card.title).toBe('Delivery Address');
        expect(card.textBold).toBe('John Doe');
        expect(card.text).toContain('123 Main St');
        expect(card.text).toContain('Anytown, United States');
        expect(card.text).toContain('12345');
      });
  });

  it('should get delivery mode card', () => {
    const mockDeliveryMode: DeliveryMode = {
      code: 'standard',
      name: 'Standard Delivery',
    };

    component.getDeliveryModeCard(mockDeliveryMode).subscribe((card) => {
      expect(card.title).toBe('Delivery Mode');
      expect(card.textBold).toBe('Standard Delivery');
      expect(card.text).toBeDefined();
    });
  });

  it('should clear delivery address and set pickup mode when cart has no delivery items', () => {
    mockActiveCartFacade.hasDeliveryItems.and.returnValue(of(false));

    component.setPickupDeliveryMode();

    expect(mockActiveCartFacade.hasDeliveryItems).toHaveBeenCalled();
    expect(
      mockCheckoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
    ).toHaveBeenCalled();
    expect(
      mockCheckoutDeliveryModesFacade.setDeliveryMode
    ).toHaveBeenCalledWith('pickup');
  });
  it('should not modify delivery settings when cart has delivery items', () => {
    mockActiveCartFacade.hasDeliveryItems.and.returnValue(of(true));

    component.setPickupDeliveryMode();

    expect(mockActiveCartFacade.hasDeliveryItems).toHaveBeenCalled();
    expect(
      mockCheckoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
    ).not.toHaveBeenCalled();
    expect(
      mockCheckoutDeliveryModesFacade.setDeliveryMode
    ).not.toHaveBeenCalled();
  });

  it('should handle Observable completion correctly', () => {
    const completionSpy = jasmine.createSpy('completion');

    mockActiveCartFacade.hasDeliveryItems.and.returnValue(
      of(false).pipe(
        finalize(() => {
          completionSpy();
        })
      )
    );

    component.setPickupDeliveryMode();

    expect(completionSpy).toHaveBeenCalled();
    expect(
      mockCheckoutDeliveryAddressFacade.clearCheckoutDeliveryAddress
    ).toHaveBeenCalled();
    expect(
      mockCheckoutDeliveryModesFacade.setDeliveryMode
    ).toHaveBeenCalledWith('pickup');
  });
});
