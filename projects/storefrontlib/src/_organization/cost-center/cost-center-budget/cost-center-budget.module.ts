import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CxDatePipe, I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { OutletRefModule } from '../../../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { SplitViewModule } from '../../../_organization/shared/split-view/split-view.module';
import { TableModule } from '../../../_organization/shared/table/table.module';
import { CostCenterBudgetComponent } from './cost-center-budget.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,

    RouterModule,
    OutletRefModule,
    IconModule,
    TableModule,

    SplitViewModule,
  ],
  declarations: [CostCenterBudgetComponent],
  exports: [CostCenterBudgetComponent],
  providers: [CxDatePipe],
})
export class CostCenterBudgetModule {}
