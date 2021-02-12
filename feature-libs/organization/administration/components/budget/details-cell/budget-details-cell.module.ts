import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverModule } from '@spartacus/storefront';
import { BudgetDetailsModule } from '../details/budget-details.module';
import { BudgetDetailsCellComponent } from './budget-details-cell.component';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    BudgetDetailsModule,
    PopoverModule,
    RouterModule,
    I18nModule,
    UrlModule,
  ],
  declarations: [BudgetDetailsCellComponent],
  exports: [BudgetDetailsCellComponent],
})
export class BudgetDetailsCellModule {}
