import { Actions } from '@ngrx/effects';
import { CdcJsService } from '@spartacus/cdc/root';
import { Address, Country, GlobalMessageService, UserAddressConnector, UserAddressService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CdcUserAddressesEffects {
    protected actions$: Actions;
    protected userIdService: UserIdService;
    protected userAddressConnector: UserAddressConnector;
    protected userAddressService: UserAddressService;
    protected messageService: GlobalMessageService;
    protected cdcJsService: CdcJsService;
    addressFieldKeys: string[];
    cdcAddUserAddress$: Observable<{
        status: string;
    }> & import("@ngrx/effects").CreateEffectMetadata;
    cdcUpdateUserAddress$: Observable<{
        status: string;
    }> & import("@ngrx/effects").CreateEffectMetadata;
    cdcDeleteUserAddress$: Observable<{
        status: string;
    }> & import("@ngrx/effects").CreateEffectMetadata;
    getAddresses(): Observable<Address[]>;
    getDefaultAddress(addresses: Address[]): Address | undefined;
    getCountryName(countries: Country[], countryIsocode: string): string | undefined;
    updateDefaultAddressInCDC(): Observable<{
        status: string;
    }>;
    sendAddressToCDC(address: Address): Observable<{
        status: string;
    }>;
    showErrorMessage(error: any): void;
    constructor(actions$: Actions, userIdService: UserIdService, userAddressConnector: UserAddressConnector, userAddressService: UserAddressService, messageService: GlobalMessageService, cdcJsService: CdcJsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcUserAddressesEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcUserAddressesEffects>;
}
