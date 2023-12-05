import { OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Address, B2BUnit, Country, Region, Title } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitAddressFormService } from './unit-address-form.service';
import * as i0 from "@angular/core";
export declare class UnitAddressFormComponent implements OnInit {
    protected itemService: ItemService<Address>;
    protected formService: UnitAddressFormService;
    protected currentUnitService: CurrentUnitService;
    form: UntypedFormGroup | null;
    key$: Observable<string>;
    countries$: Observable<Country[]>;
    titles$: Observable<Title[]>;
    regions$: Observable<Region[]>;
    unit$: Observable<B2BUnit | undefined>;
    constructor(itemService: ItemService<Address>, formService: UnitAddressFormService, currentUnitService: CurrentUnitService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitAddressFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitAddressFormComponent, "cx-org-unit-address-form", never, {}, {}, never, never, false, never>;
}
