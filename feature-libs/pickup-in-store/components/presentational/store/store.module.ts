import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { StoreComponent, StoreScheduleComponent } from './index';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, SpinnerModule],
  exports: [StoreComponent, StoreScheduleComponent],
  declarations: [StoreComponent, StoreScheduleComponent],
})
export class StoreModule {}
