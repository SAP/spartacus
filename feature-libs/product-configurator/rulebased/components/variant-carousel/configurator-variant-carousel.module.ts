import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ProductCarouselModule } from '@spartacus/storefront';
import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    I18nModule,
    ProductCarouselModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorVariantCarousel: {
          component: ConfiguratorVariantCarouselComponent,
          data: {
            title: 'Pre-configured Versions',
            productCodes:
              'CONF_CAMERA_SL-PROF-BLACK CONF_CAMERA_SL-PROF-METALLIC CONF_CAMERA_SL-STD-BLACK CONF_CAMERA_SL-STD-METALLIC',
            scroll: 'ALLVISIBLE',
          },
        },
      },
    }),
  ],
  declarations: [ConfiguratorVariantCarouselComponent],
  exports: [ConfiguratorVariantCarouselComponent],
})
export class ConfiguratorVariantCarouselModule {}
