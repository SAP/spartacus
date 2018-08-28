import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DeliveryModeComponent } from './delivery-mode.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [DeliveryModeComponent],
  entryComponents: [DeliveryModeComponent],
  exports: [DeliveryModeComponent]
})
export class DeliveryModeModule {}
