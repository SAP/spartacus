import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CurrencyService,
  CxDatePipe,
  I18nModule,
  UrlModule,
  UserService,
  OrgUnitService,
} from '@spartacus/core';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { CostCenterFormComponent } from './cost-center-form.component';
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
  declarations: [CostCenterFormComponent],
  exports: [CostCenterFormComponent],
  providers: [UserService, CxDatePipe, CurrencyService, OrgUnitService],
  entryComponents: [CostCenterFormComponent],
})
export class CostCenterFormModule {}
