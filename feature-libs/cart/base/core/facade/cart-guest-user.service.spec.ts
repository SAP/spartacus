/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartGuestUserConnector } from '../connectors';
import { CartGuestUserService } from './cart-guest-user.service';

import createSpy = jasmine.createSpy;

class MockCartCartGuestUserConnector
  implements Partial<CartGuestUserConnector>
{
  createCartGuestUser = createSpy().and.callFake(() => of({}));
  updateCartGuestUser = createSpy().and.callFake(() => of({}));
}

const userId = 'userId';
const cartId = 'cartId';

describe('CartGuestUserService', () => {
  let service: CartGuestUserService;
  let connector: CartGuestUserConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartGuestUserService,
        {
          provide: CartGuestUserConnector,
          useClass: MockCartCartGuestUserConnector,
        },
      ],
    });

    service = TestBed.inject(CartGuestUserService);
    connector = TestBed.inject(CartGuestUserConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute command for create cart guest user', () => {
    let result;
    service
      .createCartGuestUser(userId, cartId)
      .subscribe((data) => {
        result = data;
      })
      .unsubscribe();

    expect(result).toEqual({});
  });

  it('should call connector with passed params to create cart guest user', () => {
    service.createCartGuestUser(userId, cartId);
    expect(connector.createCartGuestUser).toHaveBeenCalledWith(
      userId,
      cartId,
      undefined
    );
  });

  it('should execute command for update cart guest user', () => {
    let result;
    service
      .updateCartGuestUser(userId, cartId, { email: 'test@sap.com' })
      .subscribe((data) => {
        result = data;
      })
      .unsubscribe();

    expect(result).toEqual({});
  });

  it('should call connector with passed params to update cart guest user', () => {
    service.updateCartGuestUser(userId, cartId, { email: 'test@sap.com' });
    expect(connector.updateCartGuestUser).toHaveBeenCalledWith(userId, cartId, {
      email: 'test@sap.com',
    });
  });
});
