import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { VisualPickingProductListModule } from '../visual-picking-product-list/visual-picking-product-list.module';
import { VisualViewerModule } from '../../visual-viewer/visual-viewer.module';
import { VisualPickingProductFilterModule } from '../visual-picking-product-filter/visual-picking-product-filter.module';
import { VisualPickingTabComponent } from './visual-picking-tab.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VisualViewerModule,
    VisualPickingProductListModule,
    VisualPickingProductFilterModule,
  ],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        VisualPickingTabComponent: {
          component: VisualPickingTabComponent,
        },
      },
    } as CmsConfig),
  ],
  declarations: [VisualPickingTabComponent],
  exports: [VisualPickingTabComponent],
  entryComponents: [VisualPickingTabComponent],
})
export class VisualPickingTabModule {}
