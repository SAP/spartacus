import { OnInit } from '@angular/core';
import { AsmCustomer360SupportTicketList } from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';
import { CustomerTableColumn } from '../../asm-customer-360-table/asm-customer-360-table.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { SupportTicketEntry } from './asm-customer-360-support-tickets.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360SupportTicketsComponent implements OnInit {
    protected context: AsmCustomer360SectionContext<AsmCustomer360SupportTicketList>;
    supportTicketsColumns: Array<CustomerTableColumn>;
    supportTicketsEntries$: Observable<Array<SupportTicketEntry>>;
    constructor(context: AsmCustomer360SectionContext<AsmCustomer360SupportTicketList>);
    ngOnInit(): void;
    navigateTo(entry: SupportTicketEntry): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360SupportTicketsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360SupportTicketsComponent, "cx-asm-customer-360-support-tickets", never, {}, {}, never, never, false, never>;
}
