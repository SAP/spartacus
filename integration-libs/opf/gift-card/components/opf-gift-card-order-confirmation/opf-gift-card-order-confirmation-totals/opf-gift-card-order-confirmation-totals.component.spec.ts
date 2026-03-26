/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseSiteService, TranslationService } from '@spartacus/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { OpfGiftCardOrderConfirmationTotalsComponent } from './opf-gift-card-order-confirmation-totals.component';
import { OrderFacade } from '@spartacus/order/root';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

class MockTranslationService {
  translate(): any {
    return of('');
  }
}
describe('OpfGiftCardOrderConfirmationTotalsComponent', () => {
  let component: OpfGiftCardOrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<OpfGiftCardOrderConfirmationTotalsComponent>;
  let mockOrderFacade: jasmine.SpyObj<OrderFacade>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockOrderFacade = jasmine.createSpyObj('OrderFacade', [
      'getOrderDetails',
      'clearPlacedOrder',
    ]);

    mockStore = jasmine.createSpyObj('Store', ['pipe', 'select', 'dispatch']);
    mockStore.pipe.and.returnValue(of({}));

    mockOrderFacade.getOrderDetails.and.returnValue(
      of({
        code: 'test-order-123',
        status: 'COMPLETE',
      })
    );

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderConfirmationTotalsComponent],
      providers: [
        { provide: OrderFacade, useValue: mockOrderFacade },
        { provide: Store, useValue: mockStore },
        { provide: CheckoutStepService, useValue: {} },
        { provide: BaseSiteService, useValue: {} },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      OpfGiftCardOrderConfirmationTotalsComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject OrderFacade', () => {
    expect(component['orderFacade']).toBe(mockOrderFacade);
  });

  it('should initialize order$ observable with order details', (done) => {
    fixture.detectChanges();

    component.order$.subscribe((order) => {
      expect(order).toEqual({
        code: 'test-order-123',
        status: 'COMPLETE',
      });
      done();
    });
  });

  it('should call getOrderDetails on orderFacade during initialization', () => {
    fixture.detectChanges();
    expect(mockOrderFacade.getOrderDetails).toHaveBeenCalled();
  });

  it('should call clearPlacedOrder on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(mockOrderFacade.clearPlacedOrder).toHaveBeenCalled();
  });

  it('should have cartOutlets property defined', () => {
    expect(component.cartOutlets).toBeDefined();
  });
});
