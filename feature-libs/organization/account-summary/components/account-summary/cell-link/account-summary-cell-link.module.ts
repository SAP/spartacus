import { NgModule } from '@angular/core';
import { UnitListModule } from '@spartacus/organization/administration/components';
import { AccountSummaryCellLinkComponent } from './account-summary-cell-link.component';

@NgModule({
    imports: [UnitListModule],
    declarations: [AccountSummaryCellLinkComponent],
})
export class AccountSummaryCellLinkModule { }
