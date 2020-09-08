import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitDetailsComponent } from './unit-details.component';
import { OrganizationCardModule } from '../../shared/organization-card/organization-card.module';
import { ToggleStatusModule } from '../../shared/organization-detail/toggle-status-action/toggle-status.module';

@NgModule({
  imports: [
    CommonModule,
    OrganizationCardModule,
    UrlModule,
    I18nModule,
    RouterModule,
    ToggleStatusModule,
  ],
  declarations: [UnitDetailsComponent],
  exports: [UnitDetailsComponent],
})
export class UnitDetailsModule {}
