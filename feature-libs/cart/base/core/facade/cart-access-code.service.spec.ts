/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { CartAccessCodeService } from './cart-access-code.service';
import { CommandService, QueryService } from '@spartacus/core';
import { CartAccessCodeConnector } from '../connectors';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('CartAccessCodeService', () => {
  let service: CartAccessCodeService;
  let commandService: CommandService;
  let cartAccessCodeConnector: CartAccessCodeConnector;

  beforeEach(() => {
    const commandServiceMock = {
      create: createSpy().and.callFake((fn: any) => ({
        execute: fn,
      })),
    };

    const cartAccessCodeConnectorMock = {
      getCartAccessCode: createSpy().and.returnValue(of('mockAccessCode')),
    };

    TestBed.configureTestingModule({
      providers: [
        CartAccessCodeService,
        { provide: CommandService, useValue: commandServiceMock },
        {
          provide: CartAccessCodeConnector,
          useValue: cartAccessCodeConnectorMock,
        },
        QueryService,
      ],
    });

    service = TestBed.inject(CartAccessCodeService);
    commandService = TestBed.inject(CommandService);
    cartAccessCodeConnector = TestBed.inject(CartAccessCodeConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call CartAccessCodeConnector.getCartAccessCode when getCartAccessCode is executed', () => {
    const userId = 'testUserId';
    const cartId = 'testCartId';

    service.getCartAccessCode(userId, cartId).subscribe((result) => {
      expect(result).toBe('mockAccessCode');
    });

    expect(cartAccessCodeConnector.getCartAccessCode).toHaveBeenCalledWith(
      userId,
      cartId
    );
    expect(commandService.create).toHaveBeenCalled();
  });
});
