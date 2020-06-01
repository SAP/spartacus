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
import { BudgetListComponent } from './budget-list.component';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'budgets' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ManageBudgetsListComponent: {
          component: BudgetListComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
  ],
  declarations: [BudgetListComponent],
  exports: [BudgetListComponent],
  providers: [CxDatePipe],
  entryComponents: [BudgetListComponent],
})
export class BudgetListModule {}
