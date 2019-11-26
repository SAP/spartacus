import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  CxDatePipe,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { BudgetDetailsComponent } from './budget-details.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BudgetDetailsComponent: {
          component: BudgetDetailsComponent,
          guards: [AuthGuard],
        },
      },
    }),
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
  ],
  declarations: [BudgetDetailsComponent],
  exports: [BudgetDetailsComponent],
  providers: [UserService, CxDatePipe],
  entryComponents: [BudgetDetailsComponent],
})
export class BudgetDetailsModule {}
