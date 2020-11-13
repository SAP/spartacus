import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { ItemActiveModule } from '../../shared/item-active.module';
import { OrganizationFormModule } from '../../shared/organization-form/organization-form.module';
import { UnitFormComponent } from './unit-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OrganizationFormModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    ItemActiveModule,
  ],
  declarations: [UnitFormComponent],
  exports: [UnitFormComponent],
})
export class UnitFormModule {}
