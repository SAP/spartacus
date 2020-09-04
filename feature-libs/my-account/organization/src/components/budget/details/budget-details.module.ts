import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { OrganizationCardModule } from '../../shared/organization-card/organization-card.module';
import { OrganizationMessageModule } from '../../shared/organization-message/organization-message.module';
import { BudgetDetailsComponent } from './budget-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    OrganizationCardModule,
    OrganizationMessageModule,
  ],
  declarations: [BudgetDetailsComponent],
  exports: [BudgetDetailsComponent],
})
export class BudgetDetailsModule {}
