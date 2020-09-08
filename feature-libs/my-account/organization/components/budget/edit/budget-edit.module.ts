import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { BudgetFormModule } from '../form/budget-form.module';
import { BudgetEditComponent } from './budget-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,

    I18nModule,
    SplitViewModule,
    IconModule,

    BudgetFormModule,
    ReactiveFormsModule,
  ],
  declarations: [BudgetEditComponent],
  exports: [BudgetEditComponent],
})
export class BudgetEditModule {}
