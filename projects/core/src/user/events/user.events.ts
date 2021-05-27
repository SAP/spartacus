import { CxEvent } from '../../event/cx-event';
import { Address } from '../../model/address.model';

export abstract class UserAddressEvent extends CxEvent {}

export class UserAddressUpdateEvent extends UserAddressEvent {
  static readonly type = 'UserAddressUpdateEvent';
  addressId: string;
  address: Address;
}
export class UserAddressDeleteEvent extends UserAddressEvent {
  static readonly type = 'UserAddressDeleteEvent';
  addressId: string;
}

export class UserAddressSetAsDefaultEvent extends UserAddressEvent {
  static readonly type = 'UserAddressSetAsDefaultEvent';
  addressId: string;
}

export class UserAddressCreateEvent extends UserAddressEvent {
  static readonly type = 'UserAddressCreateEvent';
  address: Address;
}

export class UserCartSavedEvent extends CxEvent {
  static readonly type = 'UserSavedCartEvent';
  address: Address;
}
export class UserCartRestoredEvent extends CxEvent {
  static readonly type = 'UserRestoredCartEvent';
  address: Address;
}
