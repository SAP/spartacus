/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveCartFacade, DeliveryMode } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  CmsService,
  MockTranslatePipe,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import {
  OpfBaseFacade,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  OpfCheckoutBillingAddressFormComponent,
  OpfCheckoutBillingAddressFormService,
} from '../opf-checkout-billing-address-form';
import { OpfCheckoutPaymentsComponent } from '../opf-checkout-payments';
import { OpfCheckoutReviewCartDetailsComponent } from '../opf-checkout-review-cart-details';
import { OpfCheckoutTermsAndConditionsAlertComponent } from '../opf-checkout-terms-and-conditions-alert';
import { OpfCheckoutPaymentAndReviewComponent } from './opf-checkout-payment-and-review.component';

@Pipe({ name: 'cxUrl', standalone: true })
class MockUrlPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Component({
  selector: 'cx-opf-checkout-payments',
  template: '',
})
class MockPaymentsComponent {
  @Input() elementsPerPage: number;
  @Input() explicitTermsAndConditions: boolean | undefined;
  @Input() disabled: boolean;
  @Input() isHeadingDisplayed: boolean;
  @Input() isPaymentRenderBelow: boolean;
  @Input() isPaymentInfoMessageEnabled: boolean;
  @Input() showBeforePaymentOptionsOutlet: boolean;
  @Input() forceDefaultPaymentOptionInputSelection: boolean;
}

@Component({
  selector: 'cx-opf-checkout-terms-and-conditions-alert',
  template: '',
})
class MockTermsAndConditionsAlertComponent {
  @Input() isDismissible: boolean;
  @Input() isVisible: boolean;
  @Input() isExplicit: boolean | undefined;
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
  @Input() isAddressCardVisible: boolean;
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

class MockCmsService {
  getCurrentPage(): Observable<any> {
    return of({});
  }
}
class MockOpfCheckoutBillingAddressFormService {
  paymentOptionsDisabled$ = of(false);
}
class MockOpfMetadataStoreService {
  getOpfMetadataState(): Observable<any> {
    return of({ selectedPaymentOptionId: 'test-payment-id' });
  }

  updateOpfMetadata(_metadata: any): void {}
}

class MockOpfBaseFacade {
  getActiveConfigurationsState(): Observable<any> {
    return of({ loading: false, error: false, data: [] });
  }
}

class MockCheckoutPaymentTypeFacade {
  getPaymentTypeState(): Observable<any> {
    return of({ loading: false, error: false, data: {} });
  }
}

describe('OpfCheckoutPaymentAndReviewComponent', () => {
  let component: OpfCheckoutPaymentAndReviewComponent;
  let fixture: ComponentFixture<OpfCheckoutPaymentAndReviewComponent>;
  let opfMetadataStoreService: OpfMetadataStoreService;

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

  const mockActiveCartFacade = {
    hasDeliveryItems: jasmine.createSpy('hasDeliveryItems'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpfCheckoutPaymentAndReviewComponent],
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
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: CmsService, useClass: MockCmsService },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: OpfBaseFacade, useClass: MockOpfBaseFacade },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        {
          provide: OpfCheckoutBillingAddressFormService,
          useClass: MockOpfCheckoutBillingAddressFormService,
        },
        { provide: OpfBaseFacade, useClass: MockOpfBaseFacade },
        {
          provide: CheckoutPaymentTypeFacade,
          useClass: MockCheckoutPaymentTypeFacade,
        },
      ],
    })
      .overrideComponent(OpfCheckoutPaymentAndReviewComponent, {
        remove: {
          imports: [
            TranslatePipe,
            UrlPipe,
            OpfCheckoutPaymentsComponent,
            OpfCheckoutTermsAndConditionsAlertComponent,
            OpfCheckoutBillingAddressFormComponent,
            OpfCheckoutReviewCartDetailsComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockUrlPipe,
            MockPaymentsComponent,
            MockTermsAndConditionsAlertComponent,
            MockBillingAddressFormComponent,
            MockReviewCartDetailsComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfCheckoutPaymentAndReviewComponent);
    component = fixture.componentInstance;
    opfMetadataStoreService = TestBed.inject(OpfMetadataStoreService);

    mockActiveCartFacade.hasDeliveryItems.calls.reset();
    mockCheckoutDeliveryAddressFacade.clearCheckoutDeliveryAddress.calls.reset();
    mockCheckoutDeliveryModesFacade.setDeliveryMode.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose terms and conditions form state', () => {
    expect(component.termsAndConditionInvalid).toBe(true);
    expect(component.termsAndConditionsFieldValue).toBe(false);

    component.checkoutSubmitForm.get('termsAndConditions')?.setValue(true);

    expect(component.termsAndConditionInvalid).toBe(false);
    expect(component.termsAndConditionsFieldValue).toBe(true);
  });

  it('should toggle terms and conditions by updating metadata', () => {
    const updateSpy = spyOn(opfMetadataStoreService, 'updateOpfMetadata');
    component.checkoutSubmitForm.get('termsAndConditions')?.setValue(true);

    component.toggleTermsAndConditions();

    expect(updateSpy).toHaveBeenCalledWith({
      termsAndConditionsChecked: true,
    });
  });

  it('should update selected payment provider name', () => {
    let selectedProviderName: string | null | undefined;
    (component as any).selectedPaymentProviderName$.subscribe((value: any) => {
      selectedProviderName = value;
    });

    component.onPaymentProviderSelected('Mock provider');

    expect(selectedProviderName).toBe('Mock provider');
  });

  it('should detect cms component existence in page', () => {
    const cmsComponentUid = 'OPF_EXPLICIT_TERMS_AND_CONDITIONS_COMPONENT';

    expect((component as any).isCmsComponentInPage(cmsComponentUid, {})).toBe(
      false
    );
    expect(
      (component as any).isCmsComponentInPage(cmsComponentUid, {
        slots: [cmsComponentUid],
      })
    ).toBe(true);
  });

  it('should initialize metadata state and pickup delivery mode in ngOnInit', () => {
    const updateSpy = spyOn(opfMetadataStoreService, 'updateOpfMetadata');
    mockActiveCartFacade.hasDeliveryItems.and.returnValue(of(true));

    component.ngOnInit();

    expect(updateSpy).toHaveBeenCalledWith({
      termsAndConditionsChecked: false,
    });
    expect(mockActiveCartFacade.hasDeliveryItems).toHaveBeenCalled();
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
