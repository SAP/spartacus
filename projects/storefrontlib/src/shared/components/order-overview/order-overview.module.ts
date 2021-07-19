import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '../card/card.module';
import { OrderOverviewComponent } from './order-overview.component';

/**
 * @deprecated since 4.1 - use order lib instead
 */
@NgModule({
  imports: [CommonModule, I18nModule, CardModule],
  declarations: [OrderOverviewComponent],
  exports: [OrderOverviewComponent],
})
export class OrderOverviewModule {}
