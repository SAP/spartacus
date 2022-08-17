import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { StoreScheduleComponent } from './store-schedule/index';
import { StoreAddressComponent } from './store-address/index';
import { StoreComponent } from './store.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, SpinnerModule],
  exports: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
  declarations: [StoreComponent, StoreScheduleComponent, StoreAddressComponent],
})
export class StoreModule {}
