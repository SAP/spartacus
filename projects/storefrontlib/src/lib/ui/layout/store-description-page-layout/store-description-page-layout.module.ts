import { StoreFinderModule } from '../../../store-finder/store-finder.module';
import { NgModule } from '@angular/core';
import { StoreDescriptionPageLayoutComponent } from './store-description-page-layout.component';

@NgModule({
  imports: [StoreFinderModule],
  declarations: [StoreDescriptionPageLayoutComponent],
  exports: [StoreDescriptionPageLayoutComponent]
})
export class StoreDescriptionPageLayoutModule {}
