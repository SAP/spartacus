import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { FakeTabsModule, InteractiveTableModule } from '@spartacus/storefront';
import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budgets.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
