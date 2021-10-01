import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { PageSlotModule } from '@spartacus/storefront';
import { SparePartsListModule } from '../spare-parts-list/spare-parts-list.module';
import { VisualViewerModule } from '../../viewer/visual-viewer/visual-viewer.module';
import { SparePartsFilterModule } from '../spare-parts-filter/spare-parts-filter.module';
import { SparePartsTabComponent } from './spare-parts-tab.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PageSlotModule,
    VisualViewerModule,
    SparePartsListModule,
    SparePartsFilterModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        SparePartsTabComponent: {
          component: SparePartsTabComponent,
        },
      },
    } as CmsConfig),
  ],
  declarations: [SparePartsTabComponent],
  exports: [SparePartsTabComponent],
  entryComponents: [SparePartsTabComponent],
})
export class SparePartsTabModule {}
