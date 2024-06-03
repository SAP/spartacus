/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '../../event/cx-event';
import { Address } from '../../model/address.model';

export abstract class UserAddressEvent extends CxEvent {
  userId: string;
}

export class UpdateUserAddressEvent extends UserAddressEvent {
  static readonly type = 'UpdateUserAddressEvent';
  addressId: string;
  address: Address;
}

export class DeleteUserAddressEvent extends UserAddressEvent {
  static readonly type = 'DeleteUserAddressEvent';
  addressId: string;
}

export class AddUserAddressEvent extends UserAddressEvent {
  static readonly type = 'AddUserAddressEvent';
  address: Address;
}

export class LoadUserAddressesEvent extends UserAddressEvent {
  static readonly type = 'LoadUserAddressesEvent';
}

export class LoadUserPaymentMethodsEvent extends UserAddressEvent {
  static readonly type = 'LoadUserPaymentMethodsEvent';
}
