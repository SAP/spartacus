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

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { OpfGiftCardFacade } from '@spartacus/opf/gift-card/root';
import { OpfGiftCardOrderDetailTotalsComponent } from './opf-gift-card-order-detail-totals.component';
import { OrderDetailsService } from '@spartacus/order/components';
import { OutletContextData } from '@spartacus/storefront';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('OpfGiftCardOrderDetailTotalsComponent', () => {
  let fixture: ComponentFixture<OpfGiftCardOrderDetailTotalsComponent>;
  let component: OpfGiftCardOrderDetailTotalsComponent;
  let mockStore: jasmine.SpyObj<Store>;
  let mockOrderDetailsService: jasmine.SpyObj<any>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch', 'select']);
    mockStore.pipe.and.returnValue(of({}));

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);
    translationServiceSpy.translate.and.returnValue(of({}));

    mockOrderDetailsService = jasmine.createSpyObj('OrderDetailsService', [
      'getOrderDetails',
    ]);

    mockOrderDetailsService.getOrderDetails.and.returnValue(
      of({
        code: 'order-123',
      })
    );

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderDetailTotalsComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: {} },
        { provide: OpfGiftCardFacade, useValue: {} },
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

    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should subscribe to outlet context and set cart', async () => {
    const mockCart = { code: '12345' } as Cart;

    await TestBed.resetTestingModule();

    const mockStore2 = jasmine.createSpyObj('Store', [
      'pipe',
      'dispatch',
      'select',
    ]);
    mockStore2.pipe.and.returnValue(of({}));

    const mockOrderDetailsService2 = jasmine.createSpyObj(
      'OrderDetailsService',
      ['getOrderDetails']
    );
    mockOrderDetailsService2.getOrderDetails.and.returnValue(of(mockCart));

    const translationServiceSpy2 = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);
    translationServiceSpy2.translate.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderDetailTotalsComponent],
      providers: [
        { provide: ActiveCartFacade, useValue: {} },
        { provide: OpfGiftCardFacade, useValue: {} },
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
