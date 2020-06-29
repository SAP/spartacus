import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  FakeTabsModule,
  InteractiveTableModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budgets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'costCenterAssignBudgets' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CostCenterAssignBudgetsComponent: {
          component: CostCenterAssignBudgetsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    FakeTabsModule,
  ],
  declarations: [CostCenterAssignBudgetsComponent],
  exports: [CostCenterAssignBudgetsComponent],
  providers: [CxDatePipe],
  entryComponents: [CostCenterAssignBudgetsComponent],
})
export class CostCenterAssignBudgetsModule {}
