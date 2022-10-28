import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitLevelOrderHistoryFilterComponent } from './unit-level-order-history-filter.component';
import {ReactiveFormsModule} from "@angular/forms";
import { I18nModule } from '@spartacus/core';



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
  ]
})
export class UnitLevelOrderHistoryFilterModule { }
