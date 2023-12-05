import { Budget } from '@spartacus/organization/administration/core';
import { DatePickerService } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export declare class BudgetFormService extends FormService<Budget> {
    protected datePickerService: DatePickerService;
    constructor(datePickerService: DatePickerService);
    protected build(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BudgetFormService>;
}
