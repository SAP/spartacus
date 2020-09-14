import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService, I18nModule, UrlModule } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { OrganizationFormModule } from 'feature-libs/my-account/organization/components/shared/organization-form';
import { UnitAddressFormComponent } from './unit-address-form.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationFormModule,
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
