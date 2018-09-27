import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreFinderComponent } from './components/store-finder/store-finder.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StoreFinderComponent],
  entryComponents: [StoreFinderComponent],
  exports: [StoreFinderComponent]
})
export class StoreFinderModule {}
