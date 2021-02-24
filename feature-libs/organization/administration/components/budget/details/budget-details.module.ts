import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { CardModule } from '../../shared/card/card.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { BudgetDetailsComponent } from './budget-details.component';
import { IconModule } from '@spartacus/storefront';
import { ExplainDisableInfoModule } from '../../shared/detail/explain-disable-info/explain-disable-info.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
    ItemExistsModule,
    IconModule,
    ExplainDisableInfoModule,
  ],
  declarations: [BudgetDetailsComponent],
})
export class BudgetDetailsModule {}
