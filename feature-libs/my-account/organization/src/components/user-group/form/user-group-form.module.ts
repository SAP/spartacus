import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CurrencyService,
  I18nModule,
  OrgUnitService,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserGroupFormComponent } from './user-group-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [UserGroupFormComponent],
  exports: [UserGroupFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [UserGroupFormComponent],
})
export class UserGroupFormModule {}
