import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService, I18nModule, UrlModule } from '@spartacus/core';
import { UnitFormComponent } from './unit-form.component';
import { FormErrorsModule } from '@spartacus/storefront';
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
  declarations: [UnitFormComponent],
  exports: [UnitFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [UnitFormComponent],
})
export class UnitFormModule {}
