import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { BudgetFormModule } from '../form/budget-form.module';
import { BudgetCreateComponent } from './budget-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,

    I18nModule,
    SplitViewModule,
    IconModule,

    ReactiveFormsModule,
    BudgetFormModule,
  ],
  declarations: [BudgetCreateComponent],
})
export class BudgetCreateModule {}
