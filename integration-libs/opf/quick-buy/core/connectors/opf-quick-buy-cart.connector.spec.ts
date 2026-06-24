/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { of } from 'rxjs';
import { OpfQuickBuyCartAdapter } from './opf-quick-buy-cart.adapter';
import { OpfQuickBuyCartConnector } from './opf-quick-buy-cart.connector';
import createSpy = jasmine.createSpy;

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  id: 'address-1',
};

const mockDeliveryModes: DeliveryMode[] = [
  { code: 'standard', name: 'Standard Delivery' },
];

class MockOpfQuickBuyCartAdapter implements OpfQuickBuyCartAdapter {
  createDeliveryAddress = createSpy('createDeliveryAddress').and.returnValue(
    of(mockAddress)
  );
  setBillingAddress = createSpy('setBillingAddress').and.returnValue(of({}));
  getSupportedDeliveryModes = createSpy(
    'getSupportedDeliveryModes'
  ).and.returnValue(of(mockDeliveryModes));
  setDeliveryMode = createSpy('setDeliveryMode').and.returnValue(of({}));
  getSelectedDeliveryMode = createSpy('getSelectedDeliveryMode').and.returnValue(
    of(mockDeliveryModes[0])
  );
}

describe('OpfQuickBuyCartConnector', () => {
  let connector: OpfQuickBuyCartConnector;
  let adapter: OpfQuickBuyCartAdapter;

  const userId = 'current';
  const cartId = 'cart-1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfQuickBuyCartConnector,
        {
          provide: OpfQuickBuyCartAdapter,
          useClass: MockOpfQuickBuyCartAdapter,
        },
      ],
    });

    connector = TestBed.inject(OpfQuickBuyCartConnector);
    adapter = TestBed.inject(OpfQuickBuyCartAdapter);
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  it('should delegate createDeliveryAddress to adapter', () => {
    connector
      .createDeliveryAddress(userId, cartId, mockAddress)
      .subscribe((result) => {
        expect(result).toEqual(mockAddress);
      });

    expect(adapter.createDeliveryAddress).toHaveBeenCalledWith(
      userId,
      cartId,
      mockAddress
    );
  });

  it('should delegate setBillingAddress to adapter', () => {
    connector.setBillingAddress(userId, cartId, mockAddress).subscribe();

    expect(adapter.setBillingAddress).toHaveBeenCalledWith(
      userId,
      cartId,
      mockAddress
    );
  });

  it('should delegate getSupportedDeliveryModes to adapter', () => {
    connector.getSupportedDeliveryModes(userId, cartId).subscribe((result) => {
      expect(result).toEqual(mockDeliveryModes);
    });

    expect(adapter.getSupportedDeliveryModes).toHaveBeenCalledWith(
      userId,
      cartId
    );
  });

  it('should delegate setDeliveryMode to adapter', () => {
    connector.setDeliveryMode(userId, cartId, 'standard').subscribe();

    expect(adapter.setDeliveryMode).toHaveBeenCalledWith(
      userId,
      cartId,
      'standard'
    );
  });

  it('should delegate getSelectedDeliveryMode to adapter', () => {
    connector.getSelectedDeliveryMode(userId, cartId).subscribe((result) => {
      expect(result).toEqual(mockDeliveryModes[0]);
    });

    expect(adapter.getSelectedDeliveryMode).toHaveBeenCalledWith(
      userId,
      cartId
    );
  });
});
