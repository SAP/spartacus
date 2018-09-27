import { NgModule } from '@angular/core';

import { StoreFinderModule } from '../../../store-finder/store-finder.module';
import { StoreListPageLayoutComponent } from './store-list-page-layout.component';

@NgModule({
  imports: [StoreFinderModule],
  declarations: [StoreListPageLayoutComponent],
  exports: [StoreListPageLayoutComponent]
})
export class StoreListPageLayoutModule {}
