import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ExistGuardModule } from '../../shared/exist-guard.module';
import { OrganizationCardModule } from '../../shared/organization-card/organization-card.module';
import { ToggleStatusModule } from '../../shared/organization-detail/toggle-status-action/toggle-status.module';
import { PermissionDetailsComponent } from './permission-details.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationCardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
    ExistGuardModule,
  ],
  declarations: [PermissionDetailsComponent],
  exports: [PermissionDetailsComponent],
})
export class PermissionDetailsModule {}
