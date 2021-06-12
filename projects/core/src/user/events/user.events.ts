import { CxEvent } from '../../event/cx-event';
import { Address } from '../../model/address.model';

export abstract class UserAddressEvent extends CxEvent {}

export class UpdateUserAddressSuccessEvent extends UserAddressEvent {
  static readonly type = 'UpdateUserAddressSuccessEvent';
  addressId: string;
  address: Address;
}
export class DeleteUserAddressSuccessEvent extends UserAddressEvent {
  static readonly type = 'DeleteUserAddressSuccessEvent';
  addressId: string;
}

export class SetDefaultUserAddressSuccessEvent extends UserAddressEvent {
  static readonly type = 'SetDefaultUserAddressSuccessEvent';
  addressId: string;
}

export class AddUserAddressSuccessEvent extends UserAddressEvent {
  static readonly type = 'AddUserAddressSuccessEvent';
}
