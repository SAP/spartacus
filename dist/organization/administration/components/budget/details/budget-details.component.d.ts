import { OnInit } from '@angular/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class BudgetDetailsComponent implements OnInit {
    protected itemService: ItemService<Budget>;
    model$: Observable<Budget>;
    isInEditMode$: Observable<boolean>;
    ngOnInit(): void;
    constructor(itemService: ItemService<Budget>);
    static ɵfac: i0.ɵɵFactoryDeclaration<BudgetDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BudgetDetailsComponent, "cx-org-budget-details", never, {}, {}, never, never, false, never>;
}
