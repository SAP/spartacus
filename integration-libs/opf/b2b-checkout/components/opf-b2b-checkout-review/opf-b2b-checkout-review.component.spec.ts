/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { Cart, PaymentType } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  BaseSite,
  BaseSiteService,
  CmsService,
  CostCenter,
  I18nTestingModule,
  MockTranslatePipe,
  Page,
  QueryState,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  OpfActiveConfigurationsResponse,
  OpfBaseFacade,
  OpfMetadataModel,
  OpfMetadataStoreService,
} from '@spartacus/opf/base/root';
import { OpfCheckoutPaymentsComponent } from '@spartacus/opf/checkout/components';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { of } from 'rxjs';
import { OpfB2bCheckoutReviewComponent } from './opf-b2b-checkout-review.component';

@Component({
  selector: 'cx-opf-checkout-payments',
  template: '',
})
class MockOpfCheckoutPaymentsComponent {
  @Input() onlyPaymentWrapperMode: boolean;
  @Input() isHeadingDisplayed: boolean;
  @Input() isPaymentRenderBelow: boolean;
  @Input() isPaymentInfoMessageEnabled: boolean;
}

class MockCheckoutPaymentTypeFacade
  implements Partial<CheckoutPaymentTypeFacade>
{
  setPaymentType = () => of({});
  getPurchaseOrderNumberState = () =>
    of({
      data: 'PO123',
      loading: false,
      error: false,
    } as QueryState<string>);
}

class MockCheckoutCostCenterFacade
  implements Partial<CheckoutCostCenterFacade>
{
  getCostCenterState = () =>
    of({
      data: { code: 'CC123', name: 'Test Cost Center' },
      loading: false,
      error: false,
    } as QueryState<CostCenter>);
}

class MockOpfMetadataStoreService implements Partial<OpfMetadataStoreService> {
  getOpfMetadataState = () =>
    of({
      selectedPaymentOptionId: 1,
      termsAndConditionsChecked: false,
      isPaymentInProgress: false,
      opfPaymentSessionId: '',
      isTermsAndConditionsAlertClosed: false,
    } as OpfMetadataModel);
  updateOpfMetadata = () => of({});
}

class MockOpfBaseFacade implements Partial<OpfBaseFacade> {
  getActiveConfigurationsState = () =>
    of({
      data: {
        value: [],
        page: {
          number: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0,
        },
      },
      loading: false,
      error: false,
    } as QueryState<OpfActiveConfigurationsResponse>);
}

class MockCmsService implements Partial<CmsService> {
  getCurrentPage = () => of({} as Page);
}

class MockBaseSiteService implements Partial<BaseSiteService> {
  getActive = () => of('test-site');
  getAll = () =>
    of([
      {
        uid: 'test-site',
        name: 'Test Site',
        defaultLanguage: { isocode: 'en' },
        defaultCurrency: { isocode: 'USD' },
      } as BaseSite,
    ]);
  get = () =>
    of({
      uid: 'test-site',
      name: 'Test Site',
      defaultLanguage: { isocode: 'en' },
      defaultCurrency: { isocode: 'USD' },
    } as BaseSite);
  isInitialized = () => true;
}

describe('OpfB2bCheckoutReviewComponent', () => {
  let component: OpfB2bCheckoutReviewComponent;
  let fixture: ComponentFixture<OpfB2bCheckoutReviewComponent>;
  let opfMetadataStoreService: OpfMetadataStoreService;
  let cmsService: CmsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        OpfB2bCheckoutReviewComponent,
        I18nTestingModule,
      ],
      providers: [
        {
          provide: CheckoutPaymentTypeFacade,
          useClass: MockCheckoutPaymentTypeFacade,
        },
        {
          provide: CheckoutCostCenterFacade,
          useClass: MockCheckoutCostCenterFacade,
        },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
        { provide: OpfBaseFacade, useClass: MockOpfBaseFacade },
        { provide: CmsService, useClass: MockCmsService },
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: ActivatedRoute, useValue: {} },
      ],
    })
      .overrideComponent(OpfB2bCheckoutReviewComponent, {
        remove: {
          imports: [TranslatePipe, UrlPipe, OpfCheckoutPaymentsComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockUrlPipe,
            MockOpfCheckoutPaymentsComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OpfB2bCheckoutReviewComponent);
    component = fixture.componentInstance;
    opfMetadataStoreService = TestBed.inject(OpfMetadataStoreService);
    cmsService = TestBed.inject(CmsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default terms and conditions value', () => {
    expect(component.termsAndConditionsFieldValue).toBeFalsy();
  });

  it('should update terms and conditions state when toggled', () => {
    const updateSpy = spyOn(opfMetadataStoreService, 'updateOpfMetadata');
    component.toggleTermsAndConditions();
    expect(updateSpy).toHaveBeenCalledWith({
      termsAndConditionsChecked: false,
    });
  });

  it('should get payment type from cart', () => {
    const mockCart: Cart = {
      paymentType: { code: 'ACCOUNT' } as PaymentType,
    } as Cart;
    spyOn(component['activeCartFacade'], 'getActive').and.returnValue(
      of(mockCart)
    );
    component.paymentType$.subscribe((type) => {
      expect(type?.code).toBe('ACCOUNT');
    });
  });

  it('should get PO number from facade', () => {
    component.poNumber$.subscribe((poNumber) => {
      expect(poNumber).toBe('PO123');
    });
  });

  it('should get cost center from facade', () => {
    component.costCenter$.subscribe((costCenter) => {
      expect(costCenter?.code).toBe('CC123');
      expect(costCenter?.name).toBe('Test Cost Center');
    });
  });

  it('should get cost center card with cost center', () => {
    const costCenter: CostCenter = {
      code: 'CC123',
      name: 'Test Cost Center',
    };
    component.getCostCenterCard(costCenter).subscribe((card) => {
      expect(card.textBold).toBe('Test Cost Center');
    });
  });

  it('should get cost center card without cost center', () => {
    component.getCostCenterCard(null).subscribe((card) => {
      expect(card.textBold).toBe('opfCheckout.noCostCenter');
    });
  });

  it('should get PO number card with PO number', () => {
    component.getPoNumberCard('PO123').subscribe((card) => {
      expect(card.textBold).toBe('PO123');
    });
  });

  it('should get PO number card without PO number', () => {
    component.getPoNumberCard(null).subscribe((card) => {
      expect(card.textBold).toBe('opfCheckout.noPoNumber');
    });
  });

  it('should return false when page is null', () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(of(null));
    component.explicitTermsAndConditions$.subscribe((result) => {
      expect(result).toBeFalsy();
    });
  });
});
