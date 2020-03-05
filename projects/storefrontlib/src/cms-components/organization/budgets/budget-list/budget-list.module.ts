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

@NgModule({
  imports: [
    CommonModule,
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
