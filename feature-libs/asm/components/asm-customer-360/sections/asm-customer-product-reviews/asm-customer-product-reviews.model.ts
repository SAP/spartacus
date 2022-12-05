import { AsmCustomer360Review } from '@spartacus/asm/root';

export interface ReviewEntry extends AsmCustomer360Review {
  item?: string;
  dateAndStatus?: string;
}
