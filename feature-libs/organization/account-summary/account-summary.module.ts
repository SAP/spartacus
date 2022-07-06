import { NgModule } from "@angular/core";
import { AccountSummaryComponentsModule } from "./components/account-summary-components.module";
import { AccountSummaryOccModule } from "./occ/account-summary-occ.module";
import { AccountSummaryCoreModule } from "./core/account-summary-core.module";


@NgModule({
    imports: [
        AccountSummaryCoreModule.forRoot(),
        AccountSummaryOccModule,
        AccountSummaryComponentsModule,
    ],
    declarations: [
    ],
})
export class AccountSummaryModule { }
