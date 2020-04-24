import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { BudgetCreateComponent } from './budget-create.component';
import { BudgetFormModule } from '../budget-form/budget-form.module';
import { RouterModule } from '@angular/router';
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
        data: { cxRoute: 'budgetCreate' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BudgetCreateComponent: {
          component: BudgetCreateComponent,
          guards: [AuthGuard],
        },
      },
    }),
    BudgetFormModule,
    I18nModule,
  ],
  declarations: [BudgetCreateComponent],
  exports: [BudgetCreateComponent],
  entryComponents: [BudgetCreateComponent],
})
export class BudgetCreateModule {}
