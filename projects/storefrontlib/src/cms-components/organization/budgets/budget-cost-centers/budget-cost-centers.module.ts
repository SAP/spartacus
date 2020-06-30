import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { BudgetCostCentersComponent } from './budget-cost-centers.component';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { Table2Module } from '../../../../shared/components/table/table.module';
import { ConfirmModalModule } from '../../../../shared/components/modal/confirm-modal/confirm-modal.module';
import { FakeTabsModule } from '../../fake-tabs/fake-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'budgetCostCenters' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BudgetCostCentersComponent: {
          component: BudgetCostCentersComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    Table2Module,
    ConfirmModalModule,
    FakeTabsModule,
  ],
  declarations: [BudgetCostCentersComponent],
  exports: [BudgetCostCentersComponent],
  entryComponents: [BudgetCostCentersComponent],
})
export class BudgetCostCentersModule {}
