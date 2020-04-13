import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule, OrgUnitService } from '@spartacus/core';
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { B2BUserFormComponent } from './b2b-user-form.component';

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
  ],
  declarations: [B2BUserFormComponent],
  exports: [B2BUserFormComponent],
  providers: [OrgUnitService],
  entryComponents: [B2BUserFormComponent],
})
export class B2BUserFormModule {}
