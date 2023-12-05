import { AsmCustomer360SupportTicket } from '@spartacus/asm/customer-360/root';
export interface SupportTicketEntry extends AsmCustomer360SupportTicket {
    categoryLabel?: string;
    statusLabel?: string;
}
