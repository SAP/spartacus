import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  CmsModule,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/index';
import { StarRatingModule } from '../../../shared/components/star-rating/star-rating.module';
import { ProductIntroComponent } from './product-intro.component';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    OutletModule,
    I18nModule,
    StarRatingModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductIntroComponent: {
          component: ProductIntroComponent,
        },
      },
    }),
  ],
  declarations: [ProductIntroComponent],
  entryComponents: [ProductIntroComponent],
})
export class ProductIntroModule {}
