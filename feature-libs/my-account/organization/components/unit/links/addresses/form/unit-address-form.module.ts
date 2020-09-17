import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { OrganizationFormModule } from '../../../../shared/organization-form/organization-form.module';
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
})
export class UnitAddressFormModule {}
