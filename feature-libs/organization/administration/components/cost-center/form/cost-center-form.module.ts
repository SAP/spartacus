import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService, I18nModule, UrlModule } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { OrganizationFormModule } from '../../shared/organization-form/organization-form.module';
import { CostCenterFormComponent } from './cost-center-form.component';

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
  ],
  declarations: [CostCenterFormComponent],
  exports: [CostCenterFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [CostCenterFormComponent],
})
export class CostCenterFormModule {}
