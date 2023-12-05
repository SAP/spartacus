import { OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { Currency, CurrencyService } from '@spartacus/core';
import { B2BUnitNode, Budget, OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class BudgetFormComponent implements OnInit {
    protected itemService: ItemService<Budget>;
    protected unitService: OrgUnitService;
    protected currencyService: CurrencyService;
    form: UntypedFormGroup | null;
    units$: Observable<B2BUnitNode[] | undefined>;
    currencies$: Observable<Currency[]>;
    constructor(itemService: ItemService<Budget>, unitService: OrgUnitService, currencyService: CurrencyService);
    ngOnInit(): void;
    createCodeWithName(name: AbstractControl | null, code: AbstractControl | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BudgetFormComponent, "cx-org-budget-form", never, {}, {}, never, never, false, never>;
}
