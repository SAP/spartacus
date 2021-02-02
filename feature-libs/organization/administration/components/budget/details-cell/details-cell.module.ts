import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverModule } from 'projects/storefrontlib/src/shared/components/popover/popover.module';
import { BudgetDetailsModule } from '../details/budget-details.module';
import { BudgetDetailsCellComponent } from './details-cell.component';

@NgModule({
  imports: [CommonModule, BudgetDetailsModule, PopoverModule],
  declarations: [BudgetDetailsCellComponent],
  exports: [BudgetDetailsCellComponent],
})
export class BudgetDetailsCellModule {}
