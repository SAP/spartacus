import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { UserApproverListComponent } from './user-approver-list.component';
import {
  IconModule,
  OutletRefModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';

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
  declarations: [UserApproverListComponent],
  exports: [UserApproverListComponent],
  entryComponents: [UserApproverListComponent],
})
export class UserApproverListModule {}
