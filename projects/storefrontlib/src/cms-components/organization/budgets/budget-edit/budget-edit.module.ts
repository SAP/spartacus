import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UserService,
} from '@spartacus/core';
import { BudgetEditComponent } from './budget-edit.component';
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
        data: { cxRoute: 'budgetEdit' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BudgetEditComponent: {
          component: BudgetEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    BudgetFormModule,
    I18nModule,
  ],
  declarations: [BudgetEditComponent],
  exports: [BudgetEditComponent],
  providers: [UserService, CxDatePipe],
  entryComponents: [BudgetEditComponent],
})
export class BudgetEditModule {}
