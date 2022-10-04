import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule, MediaModule } from '@spartacus/storefront';
import { SelectedProductPipe } from './pipes/selected-product.pipe';
import { BundleMainComponent } from './bundle-main.component';
import { BundleProductGridItemComponent } from './components/bundle-product-grid-item/bundle-product-grid-item.component';
import { BundleProductListComponent } from './components/bundle-product-list/bundle-product-list.component';
import { BundleProgressComponent } from './components/bundle-progress/bundle-progress.component';
import { BundleProgressService } from './components/bundle-progress/bundle-progress.service';
import { BundleSummaryComponent } from './components/bundle-summary/bundle-summary.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    MediaModule,
    UrlModule,
    RouterModule,
    IconModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CartTotalsComponent: {
          component: BundleMainComponent,
        },
      },
    }),
    BundleProgressService,
  ],
  declarations: [
    BundleMainComponent,
    BundleProductListComponent,
    BundleProductGridItemComponent,
    BundleSummaryComponent,
    BundleProgressComponent,
    SelectedProductPipe,
  ],
  exports: [BundleMainComponent],
})
export class BundleMainModule {}
