import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitLevelOrderHistoryFilterComponent } from './unit-level-order-history-filter.component';
import {ReactiveFormsModule} from "@angular/forms";
import { I18nModule } from '@spartacus/core';
import {IconModule} from '@spartacus/storefront';
import { UnitLevelOrderHistoryFilterNavModule} from "../filter-nav/unit-level-order-history-filter-nav.module";

@NgModule({
  declarations: [
    UnitLevelOrderHistoryFilterComponent
  ],
  exports: [
    UnitLevelOrderHistoryFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    IconModule,
    UnitLevelOrderHistoryFilterNavModule
  ]
})
export class UnitLevelOrderHistoryFilterModule { }
