import { AsmCustomer360Review } from '@spartacus/asm/customer-360/root';
export interface ReviewEntry extends AsmCustomer360Review {
    item?: string;
    dateAndStatus?: string;
}
