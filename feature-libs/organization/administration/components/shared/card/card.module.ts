import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { MessageModule } from '../message/message.module';
import { CardComponent } from './card.component';
import { PopoverModule } from '@spartacus/storefront';
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
    PopoverModule,
  ],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
