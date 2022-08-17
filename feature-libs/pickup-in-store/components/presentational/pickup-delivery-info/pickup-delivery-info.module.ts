import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { StoreModule } from '../store/store.module';
import { PickupDeliveryInfoComponent } from './pickup-delivery-info.component';

@NgModule({
  imports: [CommonModule, I18nModule, ReactiveFormsModule, StoreModule],
  declarations: [PickupDeliveryInfoComponent],
  exports: [PickupDeliveryInfoComponent],
})
export class PickupDeliveryInfoModule {}
