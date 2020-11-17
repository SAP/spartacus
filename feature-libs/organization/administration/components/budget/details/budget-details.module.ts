import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { OrganizationCardModule } from '../../shared/organization-card/organization-card.module';
import { ToggleStatusModule } from '../../shared/organization-detail/toggle-status-action/toggle-status.module';
import { BudgetDetailsComponent } from './budget-details.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationCardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
    ItemExistsModule,
  ],
  declarations: [BudgetDetailsComponent],
})
export class BudgetDetailsModule {}
