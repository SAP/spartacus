import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { AmendOrderActionsComponent } from './amend-order-actions.component';

/**
 * @deprecated since 4.2 - use order lib instead
 */
@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [AmendOrderActionsComponent],
  exports: [AmendOrderActionsComponent],
})
export class AmendOrderActionsModule {}
