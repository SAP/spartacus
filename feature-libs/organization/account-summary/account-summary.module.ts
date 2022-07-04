import { NgModule } from "@angular/core";
import { AccountSummaryComponentsModule } from "./components/account-summary-components.module";
import { AccountSummaryOccModule } from "./occ/account-summary-occ.module";
import { AccountSummaryRootModule } from "./root/account-summary-root.module";


@NgModule({
    imports: [
        AccountSummaryRootModule,
        AccountSummaryOccModule,
        AccountSummaryComponentsModule,
    ],
    declarations: [
    ],
})
export class AccountSummaryModule { }
