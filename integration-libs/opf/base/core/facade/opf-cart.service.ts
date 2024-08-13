/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  Address,
  Command,
  CommandService,
  Query,
  QueryService,
  QueryState,
} from '@spartacus/core';
import { OpfCartFacade } from '@spartacus/opf/base/root';
import { map, Observable } from 'rxjs';
import { OpfCartConnector } from '../connectors/opf-cart.connector';

@Injectable()
export class OpfCartService implements OpfCartFacade {
  protected generateOtpKeyCommand: Command<
    {
      userId: string;
      cartId: string;
    },
    string | undefined
  > = this.commandService.create(({ userId, cartId }) =>
    this.opfCartConnector.generateOtpKey(userId, cartId)
  );

  protected setCartBillingAddressCommand: Command<
    {
      userId: string;
      cartId: string;
      billingAddress: Address;
    },
    Address
  > = this.commandService.create(({ userId, cartId, billingAddress }) =>
    this.opfCartConnector.setCartBillingAddress(userId, cartId, billingAddress)
  );

  protected setCartDeliveryAddressCommand: Command<
    {
      userId: string;
      cartId: string;
      addressId: string;
    },
    Address
  > = this.commandService.create(({ userId, cartId, addressId }) =>
    this.opfCartConnector.setCartDeliveryAddress(userId, cartId, addressId)
  );

  protected createCartDeliveryAddressCommand: Command<
    {
      userId: string;
      cartId: string;
      deliveryAddress: Address;
    },
    Address
  > = this.commandService.create(({ userId, cartId, deliveryAddress }) =>
    this.opfCartConnector.createCartDeliveryAddress(
      userId,
      cartId,
      deliveryAddress
    )
  );

  protected deleteCartDeliveryAddressCommand: Command<
    {
      userId: string;
      cartId: string;
    },
    Address
  > = this.commandService.create(({ userId, cartId }) =>
    this.opfCartConnector.deleteCartDeliveryAddress(userId, cartId)
  );

  protected setCartDeliveryModeCommand: Command<
    {
      userId: string;
      cartId: string;
      deliveryModeId: string;
    },
    DeliveryMode
  > = this.commandService.create(({ userId, cartId, deliveryModeId }) =>
    this.opfCartConnector.setCartDeliveryMode(userId, cartId, deliveryModeId)
  );

  protected deleteCartDeliveryModeCommand: Command<
    {
      userId: string;
      cartId: string;
    },
    DeliveryMode
  > = this.commandService.create(({ userId, cartId }) =>
    this.opfCartConnector.deleteCartDeliveryMode(userId, cartId)
  );

  protected cartDeliveryModeQuery$(
    userId: string,
    cartId: string
  ): Query<DeliveryMode> {
    return this.queryService.create<DeliveryMode>(() =>
      this.opfCartConnector.getCartDeliveryMode(userId, cartId)
    );
  }

  protected possibleCartDeliveryModeOptions$(
    userId: string,
    cartId: string
  ): Query<DeliveryMode[]> {
    return this.queryService.create<DeliveryMode[]>(() =>
      this.opfCartConnector.getPossibleCartDeliveryModeOptions(userId, cartId)
    );
  }

  constructor(
    protected queryService: QueryService,
    protected commandService: CommandService,
    protected opfCartConnector: OpfCartConnector
  ) {}

  generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.generateOtpKeyCommand.execute({ userId, cartId });
  }

  setCartBillingAddress(
    userId: string,
    cartId: string,
    billingAddress: Address
  ): Observable<Address> {
    return this.setCartBillingAddressCommand.execute({
      userId,
      cartId,
      billingAddress,
    });
  }

  setCartDeliveryAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<Address> {
    return this.setCartDeliveryAddressCommand.execute({
      userId,
      cartId,
      addressId,
    });
  }

  createCartDeliveryAddress(
    userId: string,
    cartId: string,
    deliveryAddress: Address
  ): Observable<Address> {
    return this.createCartDeliveryAddressCommand.execute({
      userId,
      cartId,
      deliveryAddress,
    });
  }

  deleteCartDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<Address> {
    return this.deleteCartDeliveryAddressCommand.execute({
      userId,
      cartId,
    });
  }

  getPossibleCartDeliveryModeOptionsState(
    userId: string,
    cartId: string
  ): Observable<QueryState<DeliveryMode[]>> {
    return this.possibleCartDeliveryModeOptions$(userId, cartId).getState();
  }

  getPossibleCartDeliveryModeOptions(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[] | undefined> {
    return this.getPossibleCartDeliveryModeOptionsState(userId, cartId).pipe(
      map((state) => state.data)
    );
  }

  getCartDeliveryModeState(
    userId: string,
    cartId: string
  ): Observable<QueryState<DeliveryMode>> {
    return this.cartDeliveryModeQuery$(userId, cartId).getState();
  }

  getCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode | undefined> {
    return this.getCartDeliveryModeState(userId, cartId).pipe(
      map((state) => state.data)
    );
  }

  setCartDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<DeliveryMode> {
    return this.setCartDeliveryModeCommand.execute({
      userId,
      cartId,
      deliveryModeId,
    });
  }

  deleteCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode> {
    return this.deleteCartDeliveryModeCommand.execute({
      userId,
      cartId,
    });
  }
}
