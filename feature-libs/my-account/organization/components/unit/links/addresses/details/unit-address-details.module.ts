import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { OrganizationCardModule } from '../../../../shared/organization-card/organization-card.module';
import { UnitAddressDetailsComponent } from './unit-address-details.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationCardModule,
    RouterModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [UnitAddressDetailsComponent],
})
export class UnitAddressDetailsModule {}
