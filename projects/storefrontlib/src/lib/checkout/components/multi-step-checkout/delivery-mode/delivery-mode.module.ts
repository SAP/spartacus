import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DeliveryModeComponent } from './delivery-mode.component';
import { SpinnerModule } from '../../../../ui/components/spinner/spinner.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SpinnerModule],
  declarations: [DeliveryModeComponent],
  entryComponents: [DeliveryModeComponent],
  exports: [DeliveryModeComponent],
})
export class DeliveryModeModule {}
