import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { FormModule } from '../../../../shared/form/form.module';
import { UnitAddressFormComponent } from './unit-address-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [UnitAddressFormComponent],
})
export class UnitAddressFormModule {}
