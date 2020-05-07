import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule, OrgUnitService } from '@spartacus/core';
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { UserGroupFormComponent } from './user-group-form.component';
import { FormErrorsModule } from '../../../../shared/components/form/form-errors/form-errors.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    DatePickerModule,
    FormErrorsModule,
  ],
  declarations: [UserGroupFormComponent],
  exports: [UserGroupFormComponent],
  providers: [OrgUnitService],
  entryComponents: [UserGroupFormComponent],
})
export class UserGroupFormModule {}
