import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { CostCenterFormModule } from '../form/cost-center-form.module';
import { CostCenterCreateComponent } from './cost-center-create.component';
import { OrganizationCardModule } from '../../shared/organization-card/organization-card.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    OrganizationCardModule,
    ReactiveFormsModule,
    CostCenterFormModule,
  ],
  declarations: [CostCenterCreateComponent],
})
export class CostCenterCreateModule {}
