import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { MessageModule } from '../organization-message/message.module';
import { OrganizationCardComponent } from './organization-card.component';

/**
 * Provides a reusable card UI component for the organization split views.
 *
 * The component does not intend to provide a complete set of card features, it's just
 * a reusable component inside the organization UI.
 */
@NgModule({
  imports: [
    CommonModule,
    SplitViewModule,
    RouterModule,
    I18nModule,
    IconModule,
    UrlModule,
    MessageModule,
  ],
  declarations: [OrganizationCardComponent],
  exports: [OrganizationCardComponent],
})
export class OrganizationCardModule {}
