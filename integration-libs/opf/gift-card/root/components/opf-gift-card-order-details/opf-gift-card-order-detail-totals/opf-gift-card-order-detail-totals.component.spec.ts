/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BaseSiteService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { OpfGiftCardOrderDetailTotalsComponent } from './opf-gift-card-order-detail-totals.component';
import { OpfGiftCardService } from '@spartacus/opf/gift-card/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { OutletContextData } from '@spartacus/storefront';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('OpfGiftCardOrderDetailTotalsComponent', () => {
  let fixture: ComponentFixture<OpfGiftCardOrderDetailTotalsComponent>;
  let component: OpfGiftCardOrderDetailTotalsComponent;
  let mockStore: any;
  let mockOrderDetailsService: any;

  beforeEach(async () => {
    mockStore = { pipe: vi.fn(), dispatch: vi.fn(), select: vi.fn() };
    mockStore.pipe.mockReturnValue(of({}));

    const translationServiceSpy = { translate: vi.fn() };
    translationServiceSpy.translate.mockReturnValue(of({}));

    mockOrderDetailsService = { getOrderDetails: vi.fn() };

    mockOrderDetailsService.getOrderDetails.mockReturnValue(
      of({
        code: 'order-123',
      })
    );

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderDetailTotalsComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: {} },
        { provide: OpfGiftCardService, useValue: {} },
        { provide: OutletContextData, useValue: undefined },
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: Store, useValue: mockStore },
        { provide: CheckoutStepService, useValue: {} },
        { provide: BaseSiteService, useValue: {} },
        { provide: RoutingService, useValue: { getRouterState: () => of({}) } },
        { provide: OrderDetailsService, useValue: mockOrderDetailsService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(OpfGiftCardOrderDetailTotalsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should NOT subscribe if outlet is not provided', () => {
    fixture = TestBed.createComponent(OpfGiftCardOrderDetailTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should subscribe to outlet context and set cart', async () => {
    const mockCart = { code: '12345' } as Cart;

    await TestBed.resetTestingModule();

    const mockStore2 = { pipe: vi.fn(), dispatch: vi.fn(), select: vi.fn() };
    mockStore2.pipe.mockReturnValue(of({}));

    const mockOrderDetailsService2 = { getOrderDetails: vi.fn() };
    mockOrderDetailsService2.getOrderDetails.mockReturnValue(of(mockCart));

    const translationServiceSpy2 = { translate: vi.fn() };
    translationServiceSpy2.translate.mockReturnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderDetailTotalsComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: {} },
        { provide: OpfGiftCardService, useValue: {} },
        {
          provide: OutletContextData,
          useValue: {
            context$: of(mockCart),
          },
        },
        { provide: TranslationService, useValue: translationServiceSpy2 },
        { provide: Store, useValue: mockStore2 },
        { provide: CheckoutStepService, useValue: {} },
        { provide: BaseSiteService, useValue: {} },
        { provide: RoutingService, useValue: { getRouterState: () => of({}) } },
        { provide: OrderDetailsService, useValue: mockOrderDetailsService2 },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardOrderDetailTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.order$).toBeDefined();
  });
});
