import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {BranchOrderHistoryModule} from "./unit-level-order-history.module";

@NgModule({
  imports: [RouterModule, BranchOrderHistoryModule],
})
export class OrderComponentsModule {
}
