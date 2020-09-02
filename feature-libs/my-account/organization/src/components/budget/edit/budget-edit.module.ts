import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { OrganizationCardModule } from '../../shared/organization-card/organization-card.module';
import { BudgetFormModule } from '../form/budget-form.module';
import { BudgetEditComponent } from './budget-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    IconModule,
    BudgetFormModule,
    ReactiveFormsModule,
    OrganizationCardModule,
  ],
  declarations: [BudgetEditComponent],
  exports: [BudgetEditComponent],
})
export class BudgetEditModule {}
