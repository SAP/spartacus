import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Address, AddressValidation, Country, Region } from '../../model/address.model';
import { Command, CommandService } from '../../util/command-query/command.service';
import { UserAddressConnector } from '../connectors/address/user-address.connector';
import { StateWithUser } from '../store/user-state';
import * as i0 from "@angular/core";
export declare class UserAddressService {
    protected store: Store<StateWithUser>;
    protected userIdService: UserIdService;
    protected userAddressConnector: UserAddressConnector;
    protected command: CommandService;
    constructor(store: Store<StateWithUser>, userIdService: UserIdService, userAddressConnector: UserAddressConnector, command: CommandService);
    /**
     * Retrieves user's addresses
     */
    loadAddresses(): void;
    /**
     * Adds user address
     * @param address a user address
     */
    addUserAddress(address: Address): void;
    /**
     * Sets user address as default
     * @param addressId a user address ID
     */
    setAddressAsDefault(addressId: string): void;
    /**
     * Updates existing user address
     * @param addressId a user address ID
     * @param address a user address
     */
    updateUserAddress(addressId: string, address: Address): void;
    /**
     * Deletes existing user address
     * @param addressId a user address ID
     */
    deleteUserAddress(addressId: string): void;
    /**
     * Returns addresses
     */
    getAddresses(): Observable<Address[]>;
    /**
     * Returns a loading flag for addresses
     */
    getAddressesLoading(): Observable<boolean>;
    getAddressesLoadedSuccess(): Observable<boolean>;
    /**
     * Retrieves delivery countries
     */
    loadDeliveryCountries(): void;
    /**
     * Returns all delivery countries
     */
    getDeliveryCountries(): Observable<Country[]>;
    /**
     * Returns a country based on the provided `isocode`
     * @param isocode an isocode for a country
     */
    getCountry(isocode: string): Observable<Country | null>;
    /**
     * Retrieves regions for specified country by `countryIsoCode`
     * @param countryIsoCode
     */
    loadRegions(countryIsoCode: string): void;
    /**
     * Clear regions in store - useful when changing country
     */
    clearRegions(): void;
    /**
     * Returns all regions
     */
    getRegions(countryIsoCode: string): Observable<Region[]>;
    /**
     * Verifies the address
     * @param address : the address to be verified
     */
    verifyAddress(address: Address): Observable<AddressValidation>;
    protected userAddressVerificationCommand: Command<{
        address: Address;
    }, AddressValidation>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAddressService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserAddressService>;
}
