import { CxEvent } from '../../event/cx-event';
import { Address } from '../../model/address.model';
export declare abstract class UserAddressEvent extends CxEvent {
    userId: string;
}
export declare class UpdateUserAddressEvent extends UserAddressEvent {
    static readonly type = "UpdateUserAddressEvent";
    addressId: string;
    address: Address;
}
export declare class DeleteUserAddressEvent extends UserAddressEvent {
    static readonly type = "DeleteUserAddressEvent";
    addressId: string;
}
export declare class AddUserAddressEvent extends UserAddressEvent {
    static readonly type = "AddUserAddressEvent";
    address: Address;
}
export declare class LoadUserAddressesEvent extends UserAddressEvent {
    static readonly type = "LoadUserAddressesEvent";
}
export declare class LoadUserPaymentMethodsEvent extends UserAddressEvent {
    static readonly type = "LoadUserPaymentMethodsEvent";
}
