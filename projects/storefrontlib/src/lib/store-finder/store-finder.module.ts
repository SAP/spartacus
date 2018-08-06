import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { StoreFinderComponent } from './components/store-finder/store-finder.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [StoreFinderComponent],
  entryComponents: [StoreFinderComponent],
  exports: [StoreFinderComponent]
})
export class StoreFinderModule {}
