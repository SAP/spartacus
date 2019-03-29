import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { I18nModule } from '@spartacus/core';
import { DeliveryModeComponent } from './delivery-mode.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [DeliveryModeComponent],
  entryComponents: [DeliveryModeComponent],
  exports: [DeliveryModeComponent],
})
export class DeliveryModeModule {}
