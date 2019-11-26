import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  UserService,
} from '@spartacus/core';
import { BudgetEditComponent } from './budget-edit.component';
import { BudgetFormModule } from '../budget-form/budget-form.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BudgetEditComponent: {
          component: BudgetEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    BudgetFormModule,
  ],
  declarations: [BudgetEditComponent],
  exports: [BudgetEditComponent],
  providers: [UserService, CxDatePipe],
  entryComponents: [BudgetEditComponent],
})
export class BudgetEditModule {}
