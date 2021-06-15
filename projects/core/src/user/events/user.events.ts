import { CxEvent } from '../../event/cx-event';
import { Address } from '../../model/address.model';

export abstract class UserAddressEvent extends CxEvent {}

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
}
