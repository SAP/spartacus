import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigModule, CmsConfig, CmsPageTitleModule } from '@spartacus/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BudgetsListModule } from '../../organization/budgets/budget-list/budgets-list.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: {
          component: BreadcrumbComponent,
        },
      },
    }),
    CmsPageTitleModule,
    BudgetsListModule,
  ],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent],
  entryComponents: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
