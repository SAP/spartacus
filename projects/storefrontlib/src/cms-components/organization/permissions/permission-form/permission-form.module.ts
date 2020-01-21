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
import { PermissionFormComponent } from './permission-form.component';
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
  declarations: [PermissionFormComponent],
  exports: [PermissionFormComponent],
  providers: [UserService, CxDatePipe, CurrencyService, OrgUnitService],
  entryComponents: [PermissionFormComponent],
})
export class PermissionFormModule {}
