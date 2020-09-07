import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService, I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserFormComponent } from './user-form.component';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

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
  declarations: [UserFormComponent],
  exports: [UserFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [UserFormComponent],
})
export class UserFormModule {}
