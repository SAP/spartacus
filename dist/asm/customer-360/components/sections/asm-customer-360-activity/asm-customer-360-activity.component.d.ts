import { OnInit } from '@angular/core';
import { AsmCustomer360ActivityList } from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';
import { CustomerTableColumn } from '../../asm-customer-360-table/asm-customer-360-table.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { ActivityEntry } from './asm-customer-360-activity.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360ActivityComponent implements OnInit {
    protected context: AsmCustomer360SectionContext<AsmCustomer360ActivityList>;
    entries$: Observable<Array<ActivityEntry>>;
    columns: Array<CustomerTableColumn>;
    constructor(context: AsmCustomer360SectionContext<AsmCustomer360ActivityList>);
    ngOnInit(): void;
    itemSelected(entry: ActivityEntry | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360ActivityComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360ActivityComponent, "cx-asm-customer-360-activity", never, {}, {}, never, never, false, never>;
}
