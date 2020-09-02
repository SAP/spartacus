import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService, I18nModule, UrlModule } from '@spartacus/core';
import { UnitAddressFormComponent } from './unit-address-form.component';
import { FormErrorsModule } from '@spartacus/storefront';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [UnitAddressFormComponent],
  exports: [UnitAddressFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [UnitAddressFormComponent],
})
export class UnitAddressFormModule {}
