import { NgModule } from '@angular/core';
import { StoreFinderCoreModule } from '@spartacus/misc/storefinder/core';
import { StoreFinderOccModule } from '@spartacus/misc/storefinder/occ';
import { StoreFinderComponentsModule } from '@spartacus/misc/storefinder/components';

@NgModule({
  imports: [
    StoreFinderCoreModule,
    StoreFinderOccModule,
    StoreFinderComponentsModule,
  ],
})
export class StoreFinderModule {}
