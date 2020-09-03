import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {
  IconModule,
  OutletRefModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { UnitUserListComponent } from './unit-user-list.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    TableModule,
    NgSelectModule,
    FormsModule,
    SplitViewModule,
    RouterModule,
    OutletRefModule,
    IconModule,
  ],
  declarations: [UnitUserListComponent],
  exports: [UnitUserListComponent],
  providers: [],
  entryComponents: [UnitUserListComponent],
})
export class UnitUserListModule {}
