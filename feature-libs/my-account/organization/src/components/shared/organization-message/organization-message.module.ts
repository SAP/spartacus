import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { OrganizationMessageComponent } from './organization-message.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [OrganizationMessageComponent],
  exports: [OrganizationMessageComponent],
})
export class OrganizationMessageModule {}
