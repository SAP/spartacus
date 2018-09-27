import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreFinderModule } from '../../../store-finder/store-finder.module';
import { StoreListPageLayoutComponent } from './store-list-page-layout.component';

@NgModule({
  imports: [CommonModule, StoreFinderModule],
  declarations: [StoreListPageLayoutComponent],
  exports: [StoreListPageLayoutComponent]
})
export class StoreListPageLayoutModule {}
