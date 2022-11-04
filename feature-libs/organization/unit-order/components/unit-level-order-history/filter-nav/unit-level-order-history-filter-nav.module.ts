import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitLevelOrderHistoryFilterNavComponent } from './unit-level-order-history-filter-nav.component';
import {ReactiveFormsModule} from "@angular/forms";
import { I18nModule } from '@spartacus/core';
import {IconModule} from '@spartacus/storefront';

@NgModule({
  declarations: [
    UnitLevelOrderHistoryFilterNavComponent
  ],
  exports:[
    UnitLevelOrderHistoryFilterNavComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    IconModule
  ]
})
export class UnitLevelOrderHistoryFilterNavModule { }
