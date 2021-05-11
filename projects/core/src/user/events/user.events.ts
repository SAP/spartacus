import { CxEvent } from '../../event/cx-event';
import { Address } from '../../model/address.model';

export abstract class UserAddressChangeEvent extends CxEvent {
  addressId: string;
}

export class UserAddressUpdateEvent extends UserAddressChangeEvent {
  static readonly type = 'UserAddressUpdateEvent';
  address: Address;
}
export class UserAddressDeleteEvent extends UserAddressChangeEvent {
  static readonly type = 'UserAddressDeleteEvent';
}

export class UserAddressSetToDefaultEvent extends UserAddressChangeEvent {
  static readonly type = 'UserAddressSetToDefaultEvent';
}
