import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CxDatePipe,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { BudgetFormComponent } from './budget-form.component';
import { OrgUnitService } from '../../../../../../core/src/organization/facade/org-unit.service';
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    DatePickerModule,
  ],
  declarations: [BudgetFormComponent],
  exports: [BudgetFormComponent],
  providers: [UserService, CxDatePipe, OrgUnitService],
  entryComponents: [BudgetFormComponent],
})
export class BudgetFormModule {}
