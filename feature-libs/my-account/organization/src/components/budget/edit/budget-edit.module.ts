import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationEditModule } from '../../shared/organization-edit/organization-edit.module';
import { BudgetFormModule } from '../form/budget-form.module';
import { BudgetEditComponent } from './budget-edit.component';

@NgModule({
  imports: [CommonModule, OrganizationEditModule, BudgetFormModule],
  declarations: [BudgetEditComponent],
  exports: [BudgetEditComponent],
})
export class BudgetEditModule {}
