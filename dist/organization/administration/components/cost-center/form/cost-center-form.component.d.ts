import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { CostCenter, Currency, CurrencyService } from '@spartacus/core';
import { B2BUnitNode, OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class CostCenterFormComponent {
    protected itemService: ItemService<CostCenter>;
    protected unitService: OrgUnitService;
    protected currencyService: CurrencyService;
    form: UntypedFormGroup | null;
    /**
     * Initialize the business unit for the cost center.
     *
     * If there's a unit provided, we disable the form control.
     */
    set unitKey(value: string | null);
    units$: Observable<B2BUnitNode[] | undefined>;
    currencies$: Observable<Currency[]>;
    constructor(itemService: ItemService<CostCenter>, unitService: OrgUnitService, currencyService: CurrencyService);
    createCodeWithName(name: AbstractControl | null, code: AbstractControl | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CostCenterFormComponent, "cx-org-cost-center-form", never, { "unitKey": "unitKey"; }, {}, never, never, false, never>;
}
