/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card, OutletContextData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfPaymentMethodDetails } from '../../model';
import { OpfPaymentMethodDetailsComponent } from './opf-payment-method-details.component';

describe('OpfPaymentMethodDetailsComponent', () => {
  let component: OpfPaymentMethodDetailsComponent;
  let fixture: ComponentFixture<OpfPaymentMethodDetailsComponent>;

  const translationServiceMock = {
    translate: jasmine
      .createSpy('translate')
      .and.returnValue(of('Translated Text')),
  };

  const orderMock: Order = {
    code: '123',
    paymentInfo: {
      sapPaymentMethod: {
        name: 'Test',
        code: 'test',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpfPaymentMethodDetailsComponent],
      imports: [I18nTestingModule],
      providers: [
        { provide: TranslationService, useValue: translationServiceMock },
        {
          provide: OutletContextData,
          useValue: {
            context: orderMock,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfPaymentMethodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set order property when context changes', () => {
    const order = { code: '123' } as Order;
    component['orderOutlet'] = {
      context$: of({ item: order }),
    } as OutletContextData<any>;
    component.ngOnInit();
    expect(component.order).toEqual(order);
  });

  it('should return card content with translated text and payment method details', () => {
    const paymentDetailsMock: OpfPaymentMethodDetails = {
      name: 'Test',
      code: 'test',
    };

    const expectedCardContent: Card = {
      title: 'Translated Text',
      text: [paymentDetailsMock.name as string],
    };

    const result$ =
      component.getPaymentMethodDetailsCardContent(paymentDetailsMock);

    result$.subscribe((card) => {
      expect(card).toEqual(expectedCardContent);
    });
  });

  it('should `isPaymentMethodDetailsInfoPresent` return `true` if payment option details exist', () => {
    const result = component.isPaymentMethodDetailsInfoPresent(orderMock);

    expect(result).toBeTruthy();
  });

  it('should `isPaymentMethodDetailsInfoPresent` return `false` if payment option details not exist', () => {
    const order: Order = {
      code: '123',
    };

    const result = component.isPaymentMethodDetailsInfoPresent(order);

    expect(result).toBeFalsy();
  });

  it('should unsubscribe from subscription on component destruction', () => {
    spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
