import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, UrlTranslationModule } from '@spartacus/core';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { MediaModule } from '../../../ui/components/media/media.module';
import { SharedCarouselService } from '../shared-carousel.service';
import { ProductReferencesComponent } from './product-references.component';
import { ProductReferencesService } from './product-references.component.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    UrlTranslationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductReferencesComponent: {
          selector: 'cx-product-references',
          providers: [
            {
              provide: ProductReferencesService,
              useClass: ProductReferencesService,
              deps: [CmsComponentData],
            },
            {
              provide: SharedCarouselService,
              useClass: SharedCarouselService,
              deps: [],
            },
          ],
        },
      },
    }),
  ],
  declarations: [ProductReferencesComponent],
  entryComponents: [ProductReferencesComponent],
  exports: [ProductReferencesComponent],
})
export class ProductReferencesModule {}
