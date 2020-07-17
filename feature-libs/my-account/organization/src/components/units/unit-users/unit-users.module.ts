import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitUsersComponent } from './unit-users.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {
  IconModule,
  OutletRefModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

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
  declarations: [UnitUsersComponent],
  exports: [UnitUsersComponent],
  providers: [],
  entryComponents: [UnitUsersComponent],
})
export class UnitUsersModule {}
