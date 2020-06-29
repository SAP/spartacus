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
import { CostCenterBudgetsComponent } from './cost-center-budgets.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'costCenterBudgets' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CostCenterBudgetsComponent: {
          component: CostCenterBudgetsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    FakeTabsModule,
  ],
  declarations: [CostCenterBudgetsComponent],
  exports: [CostCenterBudgetsComponent],
  providers: [CxDatePipe],
  entryComponents: [CostCenterBudgetsComponent],
})
export class CostCenterBudgetsModule {}
