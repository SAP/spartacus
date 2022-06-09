import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreFinderModule } from '@spartacus/storefinder';
import { StoreListComponent } from './store-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, StoreFinderModule],
  exports: [StoreListComponent],
  declarations: [StoreListComponent],
})
export class StoreListModule {}
