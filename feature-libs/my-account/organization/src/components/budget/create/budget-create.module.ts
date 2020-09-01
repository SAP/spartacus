import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationCardModule } from '../../shared';
import { BudgetFormModule } from '../form/budget-form.module';
import { BudgetCreateComponent } from './budget-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    ReactiveFormsModule,
    BudgetFormModule,
    OrganizationCardModule,
  ],
  declarations: [BudgetCreateComponent],
})
export class BudgetCreateModule {}
