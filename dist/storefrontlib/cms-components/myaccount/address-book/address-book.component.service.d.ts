import { Address, UserAddressService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AddressBookComponentService {
    protected userAddressService: UserAddressService;
    constructor(userAddressService: UserAddressService);
    getAddresses(): Observable<Address[]>;
    getAddressesStateLoading(): Observable<boolean>;
    loadAddresses(): void;
    addUserAddress(address: Address): void;
    updateUserAddress(addressId: string, address: Address): void;
    setAddressAsDefault(addressId: string): void;
    deleteUserAddress(addressId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressBookComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddressBookComponentService>;
}
