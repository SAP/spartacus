import { Address, Country, Region, Title, UserAddressService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { FormService } from '../../../../shared/form/form.service';
import * as i0 from "@angular/core";
export declare class UnitAddressFormService extends FormService<Address> {
    protected userAddressService: UserAddressService;
    protected userProfileFacade: UserProfileFacade;
    constructor(userAddressService: UserAddressService, userProfileFacade: UserProfileFacade);
    protected build(): void;
    getCountries(): Observable<Country[]>;
    getTitles(): Observable<Title[]>;
    getRegions(): Observable<Region[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitAddressFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitAddressFormService>;
}
