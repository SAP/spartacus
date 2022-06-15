import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreFinderModule } from '@spartacus/storefinder';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import {
  StoreComponent,
  StoreListComponent,
  StoreScheduleComponent,
} from './index';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    StoreFinderModule,
    IconModule,
    SpinnerModule,
  ],
  exports: [StoreListComponent, StoreComponent, StoreScheduleComponent],
  declarations: [StoreListComponent, StoreComponent, StoreScheduleComponent],
})
export class StoreListModule {}
