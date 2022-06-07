import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { StoreFinderModule } from '@spartacus/storefinder';
import { IconModule } from '@spartacus/storefront';
import { StoreListComponent } from './store-list.component';
import { StoreComponent } from './store/store.component';

@NgModule({
  imports: [CommonModule, I18nModule, StoreFinderModule, IconModule],
  exports: [StoreListComponent],
  declarations: [StoreListComponent, StoreComponent],
})
export class StoreListModule {}
