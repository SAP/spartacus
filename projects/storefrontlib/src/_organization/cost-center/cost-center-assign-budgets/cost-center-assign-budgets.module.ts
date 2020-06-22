import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CxDatePipe, I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { OutletRefModule } from '../../../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { SplitViewModule } from '../../shared/split-view/split-view.module';
import { TableModule } from '../../shared/table/table.module';
import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budgets.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    SplitViewModule,
    RouterModule,
    IconModule,
    TableModule,
    OutletRefModule,
  ],
  declarations: [CostCenterAssignBudgetsComponent],
  exports: [CostCenterAssignBudgetsComponent],
  providers: [CxDatePipe],
})
export class CostCenterAssignBudgetsModule {}
